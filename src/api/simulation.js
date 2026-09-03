import { runMatching } from '../services/matchingEngine.js'
import { readSensor, accumulateEnergy } from '../services/sensorSimulation.js'
import { calculateSettlement } from '../services/settlementEngine.js'
import { addEvent, updateEvent, updateFlcs, pushNotification, getSnapshot, getPlant } from '../services/eventStore.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export const STATES = [
  'DETECTED', 'MATCHING', 'MATCHED', 'DISPATCHING', 'ACTIVE', 'VERIFYING', 'COMPLETED', 'SETTLED',
]

let counter = 108

// Drives one full simulated curtailment event through the state machine,
// writing progress into the shared eventStore as it goes so every dashboard
// subscribed to the store re-renders at each step. onLog receives a running
// text log for the live console shown on the simulation screen.
export async function runSimulation({ plantId, requiredKw, durationMin }, onLog = () => {}) {
  const plant = getPlant(plantId)
  const eventId = `EVT-${counter++}`
  const startedAt = new Date()
  const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const log = (msg) => onLog(`${fmtTime(new Date())}  ${msg}`)

  const baseEvent = {
    id: eventId,
    plantId,
    plant: plant?.name ?? plantId,
    time: fmtTime(startedAt),
    requiredKw,
    matchedKw: 0,
    durationMin,
    status: 'DETECTED',
    flcCount: 0,
    selected: [],
    recoveredMwh: 0,
    settlement: null,
    timeline: [{ label: 'Curtailment detected', at: fmtTime(startedAt) }],
  }
  addEvent(baseEvent)
  pushNotification('discom', { text: `New curtailment event at ${plant?.name}`, time: fmtTime(startedAt) })
  pushNotification('plant', { text: `Curtailment detected — ${requiredKw} kW required`, time: fmtTime(startedAt) })
  log(`CDU event received from ${plant?.name}`)
  await wait(500)

  log(`Requirement calculated: ${requiredKw} kW`)
  updateEvent(eventId, { status: 'MATCHING' })
  await wait(700)

  const available = getSnapshot().flcs.filter((f) => f.status === 'available')
  log(`${available.length} FLCs available`)
  await wait(500)

  const { selected, matchedKw } = runMatching(requiredKw, available)
  updateEvent(eventId, {
    status: 'MATCHED',
    matchedKw,
    flcCount: selected.length,
    selected,
    timeline: [...baseEvent.timeline, { label: 'Matching engine completed', at: fmtTime(new Date()) }],
  })
  log(`Matching engine completed`)
  for (const f of selected) {
    log(`${f.id} selected (score ${f.score})`)
  }
  await wait(600)

  updateEvent(eventId, { status: 'DISPATCHING' })
  log('Activation commands dispatched')
  await wait(700)

  updateFlcs((flcs) =>
    flcs.map((f) => {
      const match = selected.find((s) => s.id === f.id)
      return match ? { ...f, status: 'active', currentPowerKw: match.allocatedKw } : f
    })
  )
  for (const f of selected) {
    pushNotification('farmer', {
      text: `Your ${f.type.toLowerCase()} was activated — free power in progress`,
      time: fmtTime(new Date()),
    }, f.id)
  }
  log('FLCs acknowledged')
  updateEvent(eventId, {
    status: 'ACTIVE',
    timeline: [...baseEvent.timeline,
      { label: 'Matching engine completed', at: fmtTime(new Date()) },
      { label: 'Activation commands sent', at: fmtTime(new Date()) },
      { label: 'FLCs acknowledged', at: fmtTime(new Date()) },
    ],
  })
  await wait(900)

  log('Sensor data received')
  const readings = selected.map((f) => readSensor(f.allocatedKw))
  updateEvent(eventId, { status: 'VERIFYING' })
  await wait(800)

  log('Energy verification started')
  const compressedMinutes = Math.min(durationMin, 2) // compress real duration for the live demo
  const energyKwh = accumulateEnergy(readings, compressedMinutes) * (durationMin / compressedMinutes)
  await wait(900)

  const settlement = calculateSettlement(energyKwh)
  updateEvent(eventId, {
    status: 'COMPLETED',
    recoveredMwh: +(energyKwh / 1000).toFixed(3),
    settlement,
    readings: selected.map((f, i) => ({ id: f.id, allocatedKw: f.allocatedKw, ...readings[i] })),
    timeline: [...baseEvent.timeline,
      { label: 'Matching engine completed', at: fmtTime(new Date()) },
      { label: 'Activation commands sent', at: fmtTime(new Date()) },
      { label: 'FLCs acknowledged', at: fmtTime(new Date()) },
      { label: 'Sensor data received', at: fmtTime(new Date()) },
      { label: 'Event completed', at: fmtTime(new Date()) },
      { label: 'Settlement generated', at: fmtTime(new Date()) },
    ],
  })
  updateFlcs((flcs) => flcs.map((f) => (selected.find((s) => s.id === f.id) ? { ...f, status: 'available', currentPowerKw: 0 } : f)))
  for (const f of selected) {
    const share = +(energyKwh / selected.length).toFixed(2)
    const amt = calculateSettlement(share).amount
    pushNotification('farmer', {
      text: `Event completed — ${share} kWh verified, ₹${amt} added to your earnings`,
      time: fmtTime(new Date()),
    }, f.id)
  }
  pushNotification('plant', { text: `${matchedKw} kW matched, ${(energyKwh / 1000).toFixed(2)} MWh recovered`, time: fmtTime(new Date()) })
  log(`Settlement generated — ₹${settlement.amount}`)
  updateEvent(eventId, { status: 'SETTLED' })

  return eventId
}
