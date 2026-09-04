import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Gauge,
  IndianRupee,
  Loader2,
  Radio,
  Server,
  Signal,
  Timer,
  Zap,
} from 'lucide-react'

import { PLANTS } from '../../data/mockData.js'
import { runSimulation, STATES } from '../../api/simulation.js'
import { useEventStore } from '../../lib/useEventStore.js'


const STEP_DETAILS = [
  [
    'Curtailment detected',
    'CDU alert received from the selected solar plant.',
  ],
  [
    'Scanning available FLCs',
    'Checking connected flexible loads and their current availability.',
  ],
  [
    'FLCs matched',
    'Matching engine ranks loads using capacity, distance and availability.',
  ],
  [
    'Activation dispatched',
    'Commands are sent to the selected FLC devices.',
  ],
  [
    'FLCs active',
    'Selected pumps/loads acknowledge activation and begin responding.',
  ],
  [
    'Verifying sensor data',
    'Voltage, current and power readings are checked from the FLCs.',
  ],
  [
    'Event completed',
    'Verified energy recovery is calculated for the event duration.',
  ],
  [
    'Settlement generated',
    'Payment is calculated from hardware-verified energy.',
  ],
]


function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone = 'sun',
}) {
  const tones = {
    sun: 'bg-sun-50 text-sun-700 border-sun-100',
    teal: 'bg-teal-50 text-teal-700 border-teal-100',
    moss: 'bg-moss-50 text-moss-700 border-moss-100',
    clay: 'bg-clay-50 text-clay-700 border-clay-100',
  }

  return (
    <div
      className={`rounded-xl border p-4 ${tones[tone]}`}
    >
      <div className="flex items-center justify-between gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/80">
          <Icon
            className="h-4 w-4"
            strokeWidth={1.9}
          />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">
          {label}
        </span>

      </div>

      <p className="mt-3 font-mono text-xl font-semibold text-ink">
        {value}
      </p>

      {sub && (
        <p className="mt-1 text-[11px] opacity-80">
          {sub}
        </p>
      )}

    </div>
  )
}


export default function DiscomSimulation() {

  const [plantId, setPlantId] = useState(
    PLANTS[0].id
  )

  const [requiredKw, setRequiredKw] = useState(50)

  const [durationMin, setDurationMin] = useState(30)

  const [error, setError] = useState('')

  const [running, setRunning] = useState(false)

  const [eventId, setEventId] = useState(null)

  const [log, setLog] = useState([])

  /*
   * IMPORTANT:
   *
   * This ref points ONLY to the internal log box.
   * We no longer use scrollIntoView().
   *
   * Therefore the browser page itself will NOT
   * jump downward while the simulation is running.
   */
  const logContainerRef = useRef(null)


  const { liveEvents } = useEventStore()


  const event = liveEvents.find(
    (e) => e.id === eventId
  )


  const stepIndex = event
    ? STATES.indexOf(event.status)
    : -1


  const selectedPlant = PLANTS.find(
    (p) => p.id === plantId
  )


  const matchedPercent = useMemo(() => {

    if (!event?.requiredKw) {
      return 0
    }

    return Math.min(
      100,
      Math.round(
        (event.matchedKw / event.requiredKw) * 100
      )
    )

  }, [event])


  /*
   * Keep the LOG itself at the bottom.
   *
   * This is intentionally NOT scrollIntoView().
   *
   * Only the log container scrolls.
   */
  useEffect(() => {

    const container =
      logContainerRef.current

    if (!container) {
      return
    }

    container.scrollTop =
      container.scrollHeight

  }, [log])


  async function start() {

    const required =
      Number(requiredKw)

    const duration =
      Number(durationMin)


    if (
      !Number.isFinite(required) ||
      required <= 0
    ) {

      setError(
        'Enter a required flexibility greater than 0 kW.'
      )

      return
    }


    if (
      !Number.isFinite(duration) ||
      duration <= 0
    ) {

      setError(
        'Enter a duration greater than 0 minutes.'
      )

      return
    }


    setError('')

    setRunning(true)

    setLog([])

    setEventId(null)


    try {

      await runSimulation(
        {
          plantId,
          requiredKw: required,
          durationMin: duration,
        },

        (line) => {
          setLog((current) => [
            ...current,
            line,
          ])
        },

        (id) => {
          setEventId(id)
        }
      )

    } catch (err) {

      setError(
        err?.message ||
          'Simulation failed. Please try again.'
      )

    } finally {

      setRunning(false)

    }
  }


  return (
    <div className="space-y-6">

      {/* =====================================================
          SIMULATION CONTROLS
          ===================================================== */}

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sun-50 text-sun-600">

                <Zap
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />

              </div>

              <div>

                <h2 className="text-base font-semibold text-ink">
                  Simulate curtailment event
                </h2>

                <p className="text-xs text-ink-faint">
                  Run the complete CDU → matching → FLC → sensor → settlement flow.
                </p>

              </div>

            </div>

          </div>


          <div className="inline-flex items-center gap-2 self-start rounded-full border border-moss-200 bg-moss-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-moss-700">

            <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />

            Demo simulation

          </div>

        </div>


        <div className="mt-5 grid gap-3 lg:grid-cols-3">

          {/* SOLAR PLANT */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Solar plant
            </label>

            <select
              value={plantId}
              onChange={(e) =>
                setPlantId(e.target.value)
              }
              disabled={running}
              className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-sun-500 focus:ring-2 focus:ring-sun-100 disabled:opacity-50"
            >

              {PLANTS.map((plant) => (

                <option
                  key={plant.id}
                  value={plant.id}
                >
                  {plant.name}
                </option>

              ))}

            </select>

            <p className="mt-1.5 text-[11px] text-ink-faint">

              {selectedPlant?.location}
              {' · '}
              {selectedPlant?.capacityMw} MW

            </p>

          </div>


          {/* REQUIREMENT */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Required flexibility (kW)
            </label>

            <input
              type="number"
              min="1"
              value={requiredKw}
              onChange={(e) =>
                setRequiredKw(e.target.value)
              }
              disabled={running}
              className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-sun-500 focus:ring-2 focus:ring-sun-100 disabled:opacity-50"
            />

            <p className="mt-1.5 text-[11px] text-ink-faint">
              Flexible demand requested by the event.
            </p>

          </div>


          {/* DURATION */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Event duration (minutes)
            </label>

            <input
              type="number"
              min="1"
              value={durationMin}
              onChange={(e) =>
                setDurationMin(e.target.value)
              }
              disabled={running}
              className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition focus:border-sun-500 focus:ring-2 focus:ring-sun-100 disabled:opacity-50"
            />

            <p className="mt-1.5 text-[11px] text-ink-faint">
              Demo timing is compressed so the full flow finishes quickly.
            </p>

          </div>

        </div>


        {error && (

          <div className="mt-4 rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-xs text-clay-700">
            {error}
          </div>

        )}


        <button
          type="button"
          onClick={start}
          disabled={running}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {running ? (

            <Loader2
              className="h-4 w-4 animate-spin"
              strokeWidth={2}
            />

          ) : (

            <Radio
              className="h-4 w-4"
              strokeWidth={2}
            />

          )}

          {running
            ? 'Simulation running…'
            : 'Start simulation'}

        </button>

      </section>


      {/* =====================================================
          LIVE EVENT OVERVIEW
          ===================================================== */}

      {(running || event) && (

        <>

          <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sun-600">
                  Live event
                </p>

                <h2 className="mt-1 text-xl font-semibold text-ink">
                  {event?.plant ||
                    selectedPlant?.name ||
                    'Curtailment event'}
                </h2>

              </div>


              <div className="flex flex-wrap items-center gap-2">

                {eventId && (

                  <span className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[11px] text-ink-soft">
                    {eventId}
                  </span>

                )}


                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                    event?.status === 'SETTLED'
                      ? 'bg-moss-50 text-moss-700'
                      : 'bg-sun-50 text-sun-700'
                  }`}
                >
                  {event?.status || 'STARTING'}
                </span>

              </div>

            </div>


            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">

              <StatCard
                icon={Zap}
                label="Required"
                value={`${event?.requiredKw ?? requiredKw} kW`}
                sub="Curtailment requirement"
                tone="clay"
              />

              <StatCard
                icon={Gauge}
                label="Matched"
                value={`${event?.matchedKw ?? 0} kW`}
                sub={`${matchedPercent}% of requirement`}
                tone="teal"
              />

              <StatCard
                icon={Timer}
                label="Duration"
                value={`${event?.durationMin ?? durationMin} min`}
                sub="Requested event window"
                tone="sun"
              />

              <StatCard
                icon={Activity}
                label="FLCs"
                value={event?.flcCount ?? 0}
                sub="Loads selected"
                tone="moss"
              />

            </div>

          </section>


          {/* =====================================================
              PROGRESS + LIVE LOG
              ===================================================== */}

          <div className="grid items-start gap-6 xl:grid-cols-[0.95fr_1.35fr]">

            {/* =================================================
                EVENT PROGRESS
                ================================================= */}

            <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-sm font-semibold text-ink">
                    Event progress
                  </p>

                  <p className="mt-1 text-xs text-ink-faint">
                    Detection to verified settlement
                  </p>

                </div>

                <span className="font-mono text-xs text-ink-faint">
                  {event
                    ? `${Math.min(stepIndex + 1, 8)}/8`
                    : '1/8'}
                </span>

              </div>


              <ol className="mt-5 space-y-1">

                {STEP_DETAILS.map(
                  ([label, description], i) => {

                    const completed =
                      event?.status === 'SETTLED' ||
                      i < stepIndex

                    const current =
                      i === stepIndex &&
                      event?.status !== 'SETTLED'


                    return (

                      <li
                        key={label}
                        className={`flex gap-3 rounded-xl px-3 py-3 transition ${
                          current
                            ? 'bg-sun-50'
                            : ''
                        }`}
                      >

                        <div className="pt-0.5">

                          {completed ? (

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-moss-500">

                              <Check
                                className="h-3.5 w-3.5 text-white"
                                strokeWidth={3}
                              />

                            </span>

                          ) : current ? (

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sun-100 text-sun-700">

                              <Loader2
                                className="h-3.5 w-3.5 animate-spin"
                                strokeWidth={2}
                              />

                            </span>

                          ) : (

                            <Circle
                              className="h-6 w-6 text-line"
                              strokeWidth={1.6}
                            />

                          )}

                        </div>


                        <div className="min-w-0">

                          <p
                            className={`text-sm font-medium ${
                              completed || current
                                ? 'text-ink'
                                : 'text-ink-faint'
                            }`}
                          >
                            {label}
                          </p>

                          <p className="mt-0.5 text-[11px] leading-4 text-ink-faint">
                            {description}
                          </p>

                        </div>

                      </li>

                    )
                  }
                )}

              </ol>

            </section>


            {/* =================================================
                LIVE EVENT LOG
                ================================================= */}

            <section className="overflow-hidden rounded-2xl border border-[#d8dfd9] bg-[#f7faf7] shadow-sm">

              {/* LOG HEADER */}

              <div className="flex items-center justify-between border-b border-[#d8dfd9] bg-white px-5 py-4">

                <div>

                  <p className="text-sm font-semibold text-ink">
                    Live event log
                  </p>

                  <p className="mt-1 text-xs text-ink-faint">
                    Real-time simulation trace
                  </p>

                </div>


                <div className="flex items-center gap-2 rounded-full bg-moss-50 px-2.5 py-1 text-[10px] font-bold text-moss-700">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss-500" />

                  LIVE

                </div>

              </div>


              {/* =================================================
                  IMPORTANT FIX:
                  No fixed h-[430px].
                  
                  The log naturally grows with its content.
                  max-h prevents it from becoming enormous.
                  
                  Only THIS box scrolls.
                  ================================================= */}

              <div
                ref={logContainerRef}
                className="max-h-[520px] overflow-y-auto p-4 sm:p-5"
              >

                {log.length === 0 ? (

                  <div className="flex min-h-[180px] items-center justify-center text-center">

                    <div>

                      <Server
                        className="mx-auto h-8 w-8 text-ink-faint"
                        strokeWidth={1.5}
                      />

                      <p className="mt-3 text-sm text-ink-soft">
                        Waiting for simulation events…
                      </p>

                      <p className="mt-1 text-xs text-ink-faint">
                        Start the simulation to see the complete event trace.
                      </p>

                    </div>

                  </div>

                ) : (

                  <div className="space-y-2">

                    {log.map((line, i) => {

                      /*
                       * Split timestamp from message.
                       *
                       * Example:
                       *
                       * 07:59:58 pm  Matched capacity: 50 kW
                       */

                      const match =
                        String(line).match(
                          /^(\S+(?:\s+\S+)?)\s{2,}(.*)$/
                        )


                      const time =
                        match?.[1] || ''


                      const message =
                        match?.[2] || line


                      return (

                        <div
                          key={`${i}-${line}`}
                          className="flex gap-3 rounded-lg border border-[#e0e6e0] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(20,40,20,0.03)]"
                        >

                          <span className="shrink-0 font-mono text-[10px] font-semibold text-sun-700">
                            {time}
                          </span>


                          <span className="min-w-0 break-words font-mono text-[11px] leading-5 text-[#26352b]">
                            {message}
                          </span>

                        </div>

                      )
                    })}

                  </div>

                )}

              </div>

            </section>

          </div>


          {/* =====================================================
              MATCHING DETAILS
              ===================================================== */}

          {event?.selected?.length > 0 && (

            <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
                    Matching engine output
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-ink">
                    Selected flexible loads
                  </h2>

                  <p className="mt-1 text-xs text-ink-faint">
                    Loads are ranked and allocated to meet the curtailment requirement.
                  </p>

                </div>


                <div className="flex gap-4 text-right">

                  <div>

                    <p className="font-mono text-sm font-semibold text-ink">
                      {event.requiredKw} kW
                    </p>

                    <p className="text-[10px] text-ink-faint">
                      Required
                    </p>

                  </div>


                  <div>

                    <p className="font-mono text-sm font-semibold text-teal-700">
                      {event.matchedKw} kW
                    </p>

                    <p className="text-[10px] text-ink-faint">
                      Matched
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-5 overflow-x-auto rounded-xl border border-line">

                <table className="w-full min-w-[720px] text-left">

                  <thead className="bg-paper">

                    <tr className="border-b border-line text-[10px] uppercase tracking-wide text-ink-faint">

                      <th className="px-4 py-3 font-semibold">
                        FLC
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Owner
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Allocated
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Distance
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Match score
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {event.selected.map((f) => (

                      <tr
                        key={f.id}
                        className="border-b border-line last:border-0"
                      >

                        <td className="px-4 py-3 font-mono text-xs font-semibold text-ink">
                          {f.id}
                        </td>

                        <td className="px-4 py-3 text-xs text-ink-soft">
                          {f.owner}
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink">
                          {f.allocatedKw} kW
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink-soft">
                          {f.distanceKm} km
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink-soft">
                          {f.score}
                        </td>

                        <td className="px-4 py-3">

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-moss-50 px-2 py-1 text-[10px] font-semibold text-moss-700">

                            <CheckCircle2
                              className="h-3 w-3"
                              strokeWidth={2}
                            />

                            Selected

                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          )}


          {/* =====================================================
              SENSOR VERIFICATION
              ===================================================== */}

          {event?.readings?.length > 0 && (

            <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-moss-600">
                    Hardware verification
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-ink">
                    FLC sensor readings
                  </h2>

                  <p className="mt-1 text-xs text-ink-faint">
                    Voltage, current and measured power used to verify delivered flexibility.
                  </p>

                </div>


                <Signal
                  className="hidden h-5 w-5 text-moss-600 sm:block"
                  strokeWidth={1.8}
                />

              </div>


              <div className="mt-5 overflow-x-auto rounded-xl border border-line">

                <table className="w-full min-w-[650px] text-left">

                  <thead className="bg-paper">

                    <tr className="border-b border-line text-[10px] uppercase tracking-wide text-ink-faint">

                      <th className="px-4 py-3 font-semibold">
                        FLC
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Allocated
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Voltage
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Current
                      </th>

                      <th className="px-4 py-3 font-semibold">
                        Measured power
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {event.readings.map((r) => (

                      <tr
                        key={r.id}
                        className="border-b border-line last:border-0"
                      >

                        <td className="px-4 py-3 font-mono text-xs font-semibold text-ink">
                          {r.id}
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink-soft">
                          {r.allocatedKw} kW
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink-soft">
                          {r.voltage} V
                        </td>

                        <td className="px-4 py-3 font-mono text-xs text-ink-soft">
                          {r.current} A
                        </td>

                        <td className="px-4 py-3 font-mono text-xs font-semibold text-moss-700">
                          {r.powerKw} kW
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          )}


          {/* =====================================================
              SETTLEMENT
              ===================================================== */}

          {event?.status === 'SETTLED' &&
            event.settlement && (

              <section className="overflow-hidden rounded-2xl border border-moss-200 bg-moss-50 shadow-sm">

                <div className="border-b border-moss-200 bg-white/70 px-5 py-4 sm:px-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-100 text-moss-700">

                      <CheckCircle2
                        className="h-5 w-5"
                        strokeWidth={2}
                      />

                    </div>


                    <div>

                      <p className="text-sm font-semibold text-ink">
                        Simulation complete
                      </p>

                      <p className="mt-0.5 text-xs text-ink-soft">
                        Event verified and settlement generated successfully.
                      </p>

                    </div>

                  </div>

                </div>


                <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5 sm:p-6">

                  <StatCard
                    icon={Zap}
                    label="Required"
                    value={`${event.requiredKw} kW`}
                    sub="Requested"
                    tone="clay"
                  />

                  <StatCard
                    icon={Gauge}
                    label="Matched"
                    value={`${event.matchedKw} kW`}
                    sub="Activated capacity"
                    tone="teal"
                  />

                  <StatCard
                    icon={Activity}
                    label="Recovered"
                    value={`${(
                      event.recoveredMwh * 1000
                    ).toFixed(2)} kWh`}
                    sub={`${event.recoveredMwh.toFixed(3)} MWh`}
                    tone="moss"
                  />

                  <StatCard
                    icon={Clock3}
                    label="Duration"
                    value={`${event.durationMin} min`}
                    sub="Event window"
                    tone="sun"
                  />

                  <StatCard
                    icon={IndianRupee}
                    label="Settlement"
                    value={`₹${event.settlement.amount}`}
                    sub={`₹${event.settlement.rate}/kWh demo rate`}
                    tone="sun"
                  />

                </div>


                <div className="mx-5 mb-5 rounded-xl border border-moss-200 bg-white px-4 py-4 sm:mx-6 sm:mb-6">

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-sm font-semibold text-ink">
                        Settlement calculation
                      </p>

                      <p className="mt-1 font-mono text-xs text-ink-soft">

                        {event.settlement.energyKwh.toFixed(2)}
                        {' kWh × ₹'}
                        {event.settlement.rate}
                        {'/kWh'}

                      </p>

                    </div>


                    <p className="font-mono text-2xl font-semibold text-moss-700">
                      ₹{event.settlement.amount}
                    </p>

                  </div>

                </div>

              </section>

            )}

        </>

      )}

    </div>
  )
}