import { ArrowDown, CheckCircle2 } from 'lucide-react'

export default function MatchingPanel({ event }) {
  const remaining = Math.max(event.requiredKw - event.matchedKw, 0)

  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <p className="text-xs text-ink-faint">Matching engine</p>

      <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
        <div className="rounded-lg bg-clay-50 px-4 py-2">
          <p className="font-mono text-lg font-medium text-clay-600">{event.requiredKw} kW</p>
          <p className="text-[11px] text-clay-600">Curtailment requirement</p>
        </div>
        <ArrowDown className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />
        <div className="rounded-lg bg-teal-50 px-4 py-2">
          <p className="text-sm font-medium text-teal-600">Matching engine</p>
        </div>
        <ArrowDown className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />
        <div className="rounded-lg bg-sun-50 px-4 py-2">
          <p className="font-mono text-lg font-medium text-sun-600">{event.selected?.length ?? 0} FLCs</p>
          <p className="text-[11px] text-sun-600">Selected</p>
        </div>
      </div>

      {event.selected?.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {event.selected.map((f) => (
            <div key={f.id} className="rounded-lg border border-line px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-ink">{f.id}</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-moss-500" strokeWidth={1.75} />
              </div>
              <p className="mt-1 font-mono text-sm text-ink">{f.allocatedKw} kW</p>
              <p className="text-[11px] text-ink-faint">{f.distanceKm} km · score {f.score}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
        <div>
          <p className="font-mono text-sm font-medium text-ink">{event.requiredKw} kW</p>
          <p className="text-[11px] text-ink-faint">Required</p>
        </div>
        <div>
          <p className="font-mono text-sm font-medium text-teal-600">{event.matchedKw} kW</p>
          <p className="text-[11px] text-ink-faint">Matched</p>
        </div>
        <div>
          <p className="font-mono text-sm font-medium text-ink-faint">{remaining} kW</p>
          <p className="text-[11px] text-ink-faint">Remaining</p>
        </div>
      </div>
    </div>
  )
}
