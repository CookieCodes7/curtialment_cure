import { SETTLEMENTS } from '../../data/mockData.js'
import StatusBadge from '../../components/StatusBadge.jsx'

export default function PlantSettlements() {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-ink-faint">
            <th className="px-4 py-3 font-medium">Settlement</th>
            <th className="px-4 py-3 font-medium">Event</th>
            <th className="px-4 py-3 font-medium">Energy</th>
            <th className="px-4 py-3 font-medium">Rate</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {SETTLEMENTS.map((s) => (
            <tr key={s.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-mono text-xs">{s.id}</td>
              <td className="px-4 py-3 font-mono text-xs text-ink-soft">{s.eventId}</td>
              <td className="px-4 py-3 font-mono">{s.energyMwh.toFixed(2)} MWh</td>
              <td className="px-4 py-3 font-mono text-ink-soft">₹{s.rate}/kWh</td>
              <td className="px-4 py-3 font-mono">₹{s.amount.toLocaleString('en-IN')}</td>
              <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-4 py-3 text-xs text-ink-faint">
        Rate shown is a configurable demo rate, not an officially finalised tariff.
      </p>
    </div>
  )
}
