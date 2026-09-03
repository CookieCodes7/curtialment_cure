import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useEventStore } from '../../lib/useEventStore.js'
import { HISTORICAL_EVENTS } from '../../data/mockData.js'
import EventTimeline from '../../components/EventTimeline.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import EmptyState from '../../components/EmptyState.jsx'

function syntheticTimeline(e) {
  return [
    { label: 'Curtailment detected', at: e.time },
    { label: 'Matching engine completed', at: e.time },
    { label: 'Activation commands sent', at: e.time },
    { label: 'Sensor data received', at: e.time },
    { label: 'Event completed', at: e.time },
    { label: 'Settlement generated', at: e.time },
  ]
}

export default function PlantEventDetail() {
  const { id } = useParams()
  const { liveEvents } = useEventStore()
  const event = liveEvents.find((e) => e.id === id) || HISTORICAL_EVENTS.find((e) => e.id === id)

  if (!event) {
    return <EmptyState title="Event not found" hint="It may not exist in this demo dataset." />
  }

  const timeline = event.timeline?.length ? event.timeline : syntheticTimeline(event)

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/plant/events" className="inline-flex items-center gap-1.5 text-xs text-ink-faint hover:text-ink-soft">
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} /> All events
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-mono text-lg font-medium text-ink">{event.id}</h2>
          <StatusBadge status={event.status} />
        </div>
        <p className="text-sm text-ink-soft">{event.plant}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs text-ink-faint">Curtailment requirement</p>
          <p className="mt-1 font-mono text-lg text-ink">{event.requiredKw} kW</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs text-ink-faint">Duration</p>
          <p className="mt-1 font-mono text-lg text-ink">{event.durationMin} min</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs text-ink-faint">Matched flexibility</p>
          <p className="mt-1 font-mono text-lg text-ink">{event.matchedKw} kW</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-xs text-ink-faint">Verified energy</p>
          <p className="mt-1 font-mono text-lg text-ink">{event.recoveredMwh?.toFixed(2)} MWh</p>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <p className="mb-4 text-xs text-ink-faint">Event timeline</p>
        <EventTimeline steps={timeline} />
      </div>

      {event.selected?.length > 0 && (
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="mb-3 text-xs text-ink-faint">FLCs involved</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {event.selected.map((f) => (
              <div key={f.id} className="rounded-lg border border-line px-3 py-2">
                <p className="font-mono text-xs font-medium">{f.id}</p>
                <p className="text-[11px] text-ink-faint">{f.allocatedKw} kW allocated</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
