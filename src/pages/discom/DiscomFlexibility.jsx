import { useState, useMemo } from 'react'
import { Search, Sun } from 'lucide-react'
import { useEventStore } from '../../lib/useEventStore.js'
import { PLANTS } from '../../data/mockData.js'
import StatusBadge from '../../components/StatusBadge.jsx'
import EmptyState from '../../components/EmptyState.jsx'

const FILTERS = ['all', 'available', 'active', 'offline']

// Deterministic pseudo-positions so the schematic layout is stable across renders.
function schematicPos(i, total) {
  const angle = (i / total) * Math.PI * 1.4 - Math.PI * 0.2
  const radius = 40 + (i % 3) * 8
  return { x: 50 + Math.cos(angle) * radius, y: 55 + Math.sin(angle) * radius * 0.65 }
}

export default function DiscomFlexibility() {
  const { flcs } = useEventStore()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return flcs.filter((f) => {
      const matchesFilter = filter === 'all' || f.status === filter
      const q = query.toLowerCase()
      const matchesQuery =
        !q || f.id.toLowerCase().includes(q) || f.owner.toLowerCase().includes(q) || f.location.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [flcs, filter, query])

  const dotColor = { available: 'bg-moss-500', active: 'bg-teal-500', offline: 'bg-clay-500' }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-line bg-white p-5">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-xs text-ink-faint">Schematic network view</p>
          <p className="text-[11px] text-ink-faint">Not geographically accurate</p>
        </div>
        <div className="relative h-56 w-full overflow-hidden rounded-lg bg-paper-dim">
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sun-500">
              <Sun className="h-4 w-4 text-white" strokeWidth={1.75} />
            </div>
            <span className="mt-1 text-[10px] text-ink-soft">{PLANTS[0].name.split(' ')[0]}</span>
          </div>
          {flcs.slice(0, 24).map((f, i) => {
            const { x, y } = schematicPos(i, 24)
            return (
              <div
                key={f.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                title={`${f.id} · ${f.status}`}
              >
                <span className={`block h-2 w-2 rounded-full ${dotColor[f.status]}`} />
              </div>
            )
          })}
        </div>
        <div className="mt-3 flex gap-4 text-[11px] text-ink-faint">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-moss-500" /> Available</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-500" /> Active</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-clay-500" /> Offline</span>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === f ? 'bg-ink text-white' : 'bg-paper-dim text-ink-soft hover:bg-line'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FLC, owner, or location"
              className="w-full rounded-lg border border-line bg-white py-2 pl-8 pr-3 text-sm outline-none focus:border-sun-500 sm:w-64"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No FLCs match this filter" hint="Try clearing the search or filter." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-ink-faint">
                  <th className="px-4 py-3 font-medium">FLC</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Capacity</th>
                  <th className="px-4 py-3 font-medium">Distance</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Current power</th>
                  <th className="px-4 py-3 font-medium">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f) => (
                  <tr key={f.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-mono text-xs">{f.id}</td>
                    <td className="px-4 py-3">{f.owner}</td>
                    <td className="px-4 py-3 text-ink-soft">{f.location}</td>
                    <td className="px-4 py-3 text-ink-soft">{f.type}</td>
                    <td className="px-4 py-3 font-mono">{f.capacityKw} kW</td>
                    <td className="px-4 py-3 font-mono text-ink-soft">{f.distanceKm} km</td>
                    <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                    <td className="px-4 py-3 font-mono">{f.currentPowerKw > 0 ? `${f.currentPowerKw} kW` : '—'}</td>
                    <td className="px-4 py-3 text-ink-faint">{f.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <details className="rounded-xl border border-line bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium text-ink">Matching criteria — prototype matching policy</summary>
        <div className="mt-3 space-y-2 text-sm text-ink-soft">
          <div className="flex items-center justify-between">
            <span>Capacity contribution</span>
            <span className="font-mono">70%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
            <div className="h-full w-[70%] rounded-full bg-teal-500" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span>Distance / proximity</span>
            <span className="font-mono">30%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">
            <div className="h-full w-[30%] rounded-full bg-sun-500" />
          </div>
          <p className="pt-2 text-xs text-ink-faint">
            This is a prototype matching policy for demonstration, not an official regulatory requirement.
          </p>
        </div>
      </details>
    </div>
  )
}
