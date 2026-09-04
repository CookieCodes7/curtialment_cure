import { runMatching } from '../services/matchingEngine.js'
import {
  readSensor,
  accumulateEnergy,
} from '../services/sensorSimulation.js'
import {
  calculateSettlement,
} from '../services/settlementEngine.js'

import {
  addEvent,
  updateEvent,
  updateFlcs,
  pushNotification,
  getSnapshot,
  getPlant,
} from '../services/eventStore.js'

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  )

export const STATES = [
  'DETECTED',
  'MATCHING',
  'MATCHED',
  'DISPATCHING',
  'ACTIVE',
  'VERIFYING',
  'COMPLETED',
  'SETTLED',
]

let counter = 108

export async function runSimulation(
  { plantId, requiredKw, durationMin },
  onLog = () => {},
  onStart = () => {},
) {
  const plant = getPlant(plantId)

  if (!plant) {
    throw new Error(
      'Selected solar plant could not be found.'
    )
  }

  if (
    !Number.isFinite(requiredKw) ||
    requiredKw <= 0
  ) {
    throw new Error(
      'Required flexibility must be greater than 0 kW.'
    )
  }

  if (
    !Number.isFinite(durationMin) ||
    durationMin <= 0
  ) {
    throw new Error(
      'Duration must be greater than 0 minutes.'
    )
  }

  const eventId = `EVT-${counter++}`

  const startedAt = new Date()

  const fmtTime = (date) =>
    date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

  const log = (message) => {
    onLog(
      `${fmtTime(new Date())}  ${message}`
    )
  }

  const baseEvent = {
    id: eventId,
    plantId,
    plant: plant.name,
    time: fmtTime(startedAt),

    requiredKw,
    matchedKw: 0,
    durationMin,

    status: 'DETECTED',

    flcCount: 0,
    selected: [],

    recoveredMwh: 0,
    settlement: null,
    readings: [],

    timeline: [
      {
        label: 'Curtailment detected',
        at: fmtTime(startedAt),
      },
    ],
  }

  addEvent(baseEvent)

  // IMPORTANT:
  // Send the event ID immediately so the UI can
  // follow the simulation while it is running.
  onStart(eventId)

  pushNotification('discom', {
    text: `New curtailment event at ${plant.name}`,
    time: fmtTime(startedAt),
  })

  pushNotification('plant', {
    text: `Curtailment detected — ${requiredKw} kW required`,
    time: fmtTime(startedAt),
  })

  log(
    `CDU event received from ${plant.name}`
  )

  log(`Event ID: ${eventId}`)

  log(
    `Curtailment requirement: ${requiredKw} kW`
  )

  log(
    `Requested duration: ${durationMin} minutes`
  )

  await wait(650)

  updateEvent(eventId, {
    status: 'MATCHING',

    timeline: [
      ...baseEvent.timeline,

      {
        label: 'FLC scanning started',
        at: fmtTime(new Date()),
      },
    ],
  })

  log('Scanning connected FLC network')

  const snapshot = getSnapshot()

  const available = snapshot.flcs.filter(
    (flc) => flc.status === 'available'
  )

  const offline = snapshot.flcs.filter(
    (flc) => flc.status === 'offline'
  )

  log(`${available.length} FLCs available`)

  log(
    `${offline.length} FLCs currently offline`
  )

  await wait(700)

  const {
    selected,
    matchedKw,
  } = runMatching(
    requiredKw,
    available
  )

  updateEvent(eventId, {
    status: 'MATCHED',

    matchedKw,

    flcCount: selected.length,

    selected,

    timeline: [
      ...baseEvent.timeline,

      {
        label: 'FLC scanning completed',
        at: fmtTime(new Date()),
      },

      {
        label: 'Matching engine completed',
        at: fmtTime(new Date()),
      },
    ],
  })

  log('Matching engine completed')

  log(
    `Matched capacity: ${matchedKw} kW`
  )

  log(
    `Unserved requirement: ${Math.max(
      requiredKw - matchedKw,
      0
    )} kW`
  )

  for (const flc of selected) {
    log(
      `${flc.id} selected — ${flc.allocatedKw} kW, ${flc.distanceKm} km, score ${flc.score}`
    )
  }

  await wait(750)

  updateEvent(eventId, {
    status: 'DISPATCHING',

    timeline: [
      ...baseEvent.timeline,

      {
        label: 'Matching engine completed',
        at: fmtTime(new Date()),
      },

      {
        label:
          'Activation commands dispatched',
        at: fmtTime(new Date()),
      },
    ],
  })

  log(
    'Activation commands dispatched'
  )

  log(
    `Sending commands to ${selected.length} FLC devices`
  )

  await wait(750)

  updateFlcs((flcs) =>
    flcs.map((flc) => {
      const match = selected.find(
        (item) => item.id === flc.id
      )

      return match
        ? {
            ...flc,

            status: 'active',

            currentPowerKw:
              match.allocatedKw,
          }
        : flc
    })
  )

  for (const flc of selected) {
    pushNotification(
      'farmer',
      {
        text:
          `Your ${flc.type.toLowerCase()} was activated — flexibility event in progress`,

        time: fmtTime(new Date()),
      },
      flc.id
    )
  }

  updateEvent(eventId, {
    status: 'ACTIVE',

    timeline: [
      ...baseEvent.timeline,

      {
        label:
          'Matching engine completed',

        at: fmtTime(new Date()),
      },

      {
        label:
          'Activation commands sent',

        at: fmtTime(new Date()),
      },

      {
        label:
          'FLCs acknowledged',

        at: fmtTime(new Date()),
      },
    ],
  })

  log('FLCs acknowledged')

  log(
    `${selected.length} FLC devices are now ACTIVE`
  )

  await wait(900)

  updateEvent(eventId, {
    status: 'VERIFYING',
  })

  log(
    'Sensor data received from active FLCs'
  )

  const readings = selected.map(
    (flc) => {
      const reading =
        readSensor(flc.allocatedKw)

      log(
        `${flc.id} sensor — ${reading.voltage} V, ${reading.current} A, ${reading.powerKw} kW`
      )

      return reading
    }
  )

  await wait(800)

  log(
    'Energy verification started'
  )

  /*
   * Compress the sampling interval for the
   * live demonstration.
   *
   * Example:
   * 30-minute event
   * becomes a ~2-minute simulated sample
   * and is then scaled to 30 minutes.
   */

  const compressedMinutes =
    Math.min(durationMin, 2)

  const energyKwh =
    accumulateEnergy(
      readings,
      compressedMinutes
    ) *
    (durationMin /
      compressedMinutes)

  log(
    `Verified energy calculated: ${energyKwh.toFixed(2)} kWh`
  )

  await wait(900)

  const settlement =
    calculateSettlement(
      energyKwh
    )

  updateEvent(eventId, {
    status: 'COMPLETED',

    recoveredMwh:
      +(energyKwh / 1000).toFixed(3),

    settlement,

    readings:
      selected.map(
        (flc, index) => ({
          id: flc.id,

          allocatedKw:
            flc.allocatedKw,

          ...readings[index],
        })
      ),

    timeline: [
      ...baseEvent.timeline,

      {
        label:
          'Matching engine completed',

        at: fmtTime(new Date()),
      },

      {
        label:
          'Activation commands sent',

        at: fmtTime(new Date()),
      },

      {
        label:
          'FLCs acknowledged',

        at: fmtTime(new Date()),
      },

      {
        label:
          'Sensor data received',

        at: fmtTime(new Date()),
      },

      {
        label:
          'Event completed',

        at: fmtTime(new Date()),
      },

      {
        label:
          'Settlement generated',

        at: fmtTime(new Date()),
      },
    ],
  })

  log('Event completed')

  log(
    `Settlement rate: ₹${settlement.rate}/kWh`
  )

  log(
    `Settlement amount: ₹${settlement.amount}`
  )

  updateFlcs((flcs) =>
    flcs.map((flc) =>
      selected.find(
        (item) => item.id === flc.id
      )
        ? {
            ...flc,

            status: 'available',

            currentPowerKw: 0,
          }
        : flc
    )
  )

  for (const flc of selected) {
    const share = +(
      energyKwh /
      selected.length
    ).toFixed(2)

    const amount =
      calculateSettlement(
        share
      ).amount

    pushNotification(
      'farmer',
      {
        text:
          `Event completed — ${share} kWh verified, ₹${amount} added to your earnings`,

        time: fmtTime(new Date()),
      },
      flc.id
    )
  }

  pushNotification('plant', {
    text:
      `${matchedKw} kW matched, ${(energyKwh / 1000).toFixed(2)} MWh recovered`,

    time: fmtTime(new Date()),
  })

  await wait(450)

  updateEvent(eventId, {
    status: 'SETTLED',
  })

  log(
    'Settlement generated successfully'
  )

  log(
    'Event status: SETTLED'
  )

  return eventId
}