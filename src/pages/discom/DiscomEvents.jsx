import { Link } from 'react-router-dom'
import { useEventStore } from '../../lib/useEventStore.js'
import { HISTORICAL_EVENTS } from '../../data/mockData.js'
import StatusBadge from '../../components/StatusBadge.jsx'

export default function DiscomEvents() {
  const { liveEvents } = useEventStore()
  const rows = [...liveEvents, ...HISTORICAL_EVENTS]

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-ink-faint">
            <th className="px-4 py-3 font-medium">Event</th>
            <th className="px-4 py-3 font-medium">Plant</th>
            <th className="px-4 py-3 font-medium">Time</th>
            <th className="px-4 py-3 font-medium">Required</th>
            <th className="px-4 py-3 font-medium">Matched</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((e) => (
            <tr key={e.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-mono text-xs">
                <Link to={`/plant/events/${e.id}`} className="hover:underline">{e.id}</Link>
              </td>
              <td className="px-4 py-3">{e.plant}</td>
              <td className="px-4 py-3 font-mono text-ink-soft">{e.time}</td>
              <td className="px-4 py-3 font-mono">{e.requiredKw} kW</td>
              <td className="px-4 py-3 font-mono">{e.matchedKw} kW</td>
              <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
