import { Link } from 'react-router-dom'
import { useEventStore } from '../../lib/useEventStore.js'
import { HISTORICAL_EVENTS } from '../../data/mockData.js'
import KpiCard from '../../components/KpiCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { Zap, ArrowRight } from 'lucide-react'

export default function DiscomDashboard() {
  const { flcs, liveEvents } = useEventStore()

  const availableFlcs = flcs.filter((f) => f.status === 'available')
  const activeFlcs = flcs.filter((f) => f.status === 'active')
  const availableMw = +(availableFlcs.reduce((a, f) => a + f.capacityKw, 0) / 1000).toFixed(2)
  const utilizedMw = +(activeFlcs.reduce((a, f) => a + f.currentPowerKw, 0) / 1000).toFixed(2)
  const totalMw = availableMw + utilizedMw
  const utilizationPct = totalMw > 0 ? Math.round((utilizedMw / totalMw) * 100) : 0

  const runningEvents = liveEvents.filter((e) => !['COMPLETED', 'SETTLED'].includes(e.status))
  const todaysCount = liveEvents.length + HISTORICAL_EVENTS.filter((e) => e.time.startsWith('03 Sep')).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Available flexibility" value={availableMw} unit="MW" tone="teal" />
        <KpiCard label="Active curtailment" value={utilizedMw} unit="MW" tone="clay" />
        <KpiCard label="Active FLCs" value={activeFlcs.length} tone="sun" />
        <KpiCard label="Connected FLCs" value={flcs.length} />
        <KpiCard label="Today's events" value={todaysCount} />
        <KpiCard label="Flexibility utilisation" value={utilizationPct} unit="%" />
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <p className="text-xs text-ink-faint">Available flexibility</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-3xl font-medium text-teal-600">{totalMw.toFixed(2)}</span>
          <span className="text-sm text-ink-soft">MW across the Bikaner network</span>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-paper-dim">
          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-700"
            style={{ width: `${utilizationPct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-faint">{utilizationPct}% utilised right now</p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink">Active curtailment events</h2>
          <Link to="/discom/simulation" className="inline-flex items-center gap-1 text-xs font-medium text-teal-600">
            Simulate an event <ArrowRight className="h-3 w-3" strokeWidth={1.75} />
          </Link>
        </div>
        {runningEvents.length === 0 ? (
          <EmptyState icon={Zap} title="No active curtailment events" hint="Trigger one from the Simulation screen to see it here." />
        ) : (
          <div className="space-y-2">
            {runningEvents.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{e.plant}</p>
                  <p className="font-mono text-xs text-ink-faint">
                    {e.requiredKw} kW required · {e.matchedKw} kW matched
                  </p>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
