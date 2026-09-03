import { useState, useRef, useEffect } from 'react'
import { Zap, Check, Loader2, Circle } from 'lucide-react'
import { PLANTS } from '../../data/mockData.js'
import { runSimulation, STATES } from '../../api/simulation.js'
import { useEventStore } from '../../lib/useEventStore.js'
import MatchingPanel from '../../components/MatchingPanel.jsx'

const STEP_LABELS = [
  'Curtailment detected',
  'Scanning available FLCs',
  'FLCs matched',
  'Activation dispatched',
  'FLCs active',
  'Verifying sensor data',
  'Event completed',
  'Settlement generated',
]

export default function DiscomSimulation() {
  const [plantId, setPlantId] = useState(PLANTS[0].id)
  const [requiredKw, setRequiredKw] = useState(50)
  const [durationMin, setDurationMin] = useState(30)
  const [error, setError] = useState('')
  const [running, setRunning] = useState(false)
  const [eventId, setEventId] = useState(null)
  const [log, setLog] = useState([])
  const logEndRef = useRef(null)

  const { liveEvents } = useEventStore()
  const event = liveEvents.find((e) => e.id === eventId)
  const stepIndex = event ? STATES.indexOf(event.status) : -1

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log])

  async function start() {
    if (!requiredKw || requiredKw <= 0) {
      setError('Enter a required flexibility greater than 0 kW.')
      return
    }
    if (!durationMin || durationMin <= 0) {
      setError('Enter a duration greater than 0 minutes.')
      return
    }
    setError('')
    setRunning(true)
    setLog([])
    setEventId(null)
    const id = await runSimulation(
      { plantId, requiredKw: Number(requiredKw), durationMin: Number(durationMin) },
      (line) => setLog((l) => [...l, line])
    )
    setEventId(id)
    setRunning(false)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-white p-5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-sun-600" strokeWidth={1.75} />
          <h2 className="text-sm font-medium text-ink">Simulate curtailment event</h2>
        </div>
        <p className="mt-1 text-xs text-ink-faint">
          Runs the full detection-to-settlement flow with simulated data — useful when a live curtailment event isn't occurring right now.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs text-ink-soft">Solar plant</label>
            <select
              value={plantId}
              onChange={(e) => setPlantId(e.target.value)}
              disabled={running}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 disabled:opacity-50"
            >
              {PLANTS.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-ink-soft">Required flexibility (kW)</label>
            <input
              type="number"
              value={requiredKw}
              onChange={(e) => setRequiredKw(e.target.value)}
              disabled={running}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-ink-soft">Duration (minutes)</label>
            <input
              type="number"
              value={durationMin}
              onChange={(e) => setDurationMin(e.target.value)}
              disabled={running}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 disabled:opacity-50"
            />
          </div>
        </div>

        {error && <p className="mt-2 text-xs text-clay-600">{error}</p>}

        <button
          onClick={start}
          disabled={running}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {running && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} />}
          {running ? 'Simulation running…' : 'Start simulation'}
        </button>
      </div>

      {(running || event) && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-5">
            <p className="mb-4 text-xs text-ink-faint">Event progress</p>
            <ol className="space-y-3">
              {STEP_LABELS.map((label, i) => {
                const done = i < stepIndex || event?.status === 'SETTLED'
                const current = i === stepIndex && event?.status !== 'SETTLED'
                return (
                  <li key={label} className="flex items-center gap-3">
                    {done ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-moss-500">
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                    ) : current ? (
                      <Loader2 className="h-5 w-5 animate-spin text-sun-600" strokeWidth={1.75} />
                    ) : (
                      <Circle className="h-5 w-5 text-line" strokeWidth={1.75} />
                    )}
                    <span className={`text-sm ${done || current ? 'text-ink' : 'text-ink-faint'}`}>{label}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="rounded-xl border border-line bg-ink p-5">
            <p className="mb-3 text-xs text-paper/50">Live event log</p>
            <div className="h-64 overflow-y-auto font-mono text-xs leading-relaxed text-teal-200">
              {log.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      )}

      {event && event.selected?.length > 0 && <MatchingPanel event={event} />}

      {event?.status === 'SETTLED' && (
        <div className="rounded-xl border border-moss-200 bg-moss-50 p-5">
          <p className="text-sm font-medium text-moss-600">Simulation complete</p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="font-mono text-lg font-medium text-ink">{event.requiredKw} kW</p>
              <p className="text-xs text-ink-faint">Required</p>
            </div>
            <div>
              <p className="font-mono text-lg font-medium text-ink">{event.matchedKw} kW</p>
              <p className="text-xs text-ink-faint">Matched</p>
            </div>
            <div>
              <p className="font-mono text-lg font-medium text-ink">{event.flcCount}</p>
              <p className="text-xs text-ink-faint">FLCs activated</p>
            </div>
            <div>
              <p className="font-mono text-lg font-medium text-ink">{(event.recoveredMwh * 1000).toFixed(1)} kWh</p>
              <p className="text-xs text-ink-faint">Verified energy</p>
            </div>
          </div>
          <p className="mt-3 font-mono text-sm text-moss-600">
            Estimated settlement: ₹{event.settlement?.amount}
          </p>
        </div>
      )}
    </div>
  )
}
