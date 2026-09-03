import { Link } from 'react-router-dom'
import { useEventStore } from '../../lib/useEventStore.js'
import { HISTORICAL_EVENTS } from '../../data/mockData.js'
import StatusBadge from '../../components/StatusBadge.jsx'

const PLANT_ID = 'PLANT-01'

export default function PlantEvents() {
  const { liveEvents } = useEventStore()
  const rows = [...liveEvents.filter((e) => e.plantId === PLANT_ID), ...HISTORICAL_EVENTS.filter((e) => e.plantId === PLANT_ID)]

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-ink-faint">
            <th className="px-4 py-3 font-medium">Event</th>
            <th className="px-4 py-3 font-medium">Time</th>
            <th className="px-4 py-3 font-medium">Required flexibility</th>
            <th className="px-4 py-3 font-medium">Matched</th>
            <th className="px-4 py-3 font-medium">Recovered</th>
            <th className="px-4 py-3 font-medium">Duration</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-b border-line last:border-0 hover:bg-paper-dim/50">
              <td className="px-4 py-3">
                <Link to={`/plant/events/${e.id}`} className="font-mono text-xs text-teal-600 hover:underline">{e.id}</Link>
              </td>
              <td className="px-4 py-3 font-mono text-ink-soft">{e.time}</td>
              <td className="px-4 py-3 font-mono">{e.requiredKw} kW</td>
              <td className="px-4 py-3 font-mono">{e.matchedKw} kW</td>
              <td className="px-4 py-3 font-mono">{e.recoveredMwh?.toFixed(2)} MWh</td>
              <td className="px-4 py-3 font-mono text-ink-soft">{e.durationMin} min</td>
              <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
