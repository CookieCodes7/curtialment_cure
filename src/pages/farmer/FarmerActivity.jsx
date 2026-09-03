import { CheckCircle2 } from 'lucide-react'
import { FARMER_HISTORY } from '../../data/mockData.js'

export default function FarmerActivity() {
  return (
    <div className="space-y-3">
      {FARMER_HISTORY.map((h, i) => (
        <div key={i} className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink">{h.date}</p>
            <span className="inline-flex items-center gap-1 text-xs text-moss-600">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} /> Verified
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">Flexibility event · {h.durationMin} minutes</p>
          <div className="mt-3 flex justify-between border-t border-line pt-3 text-sm">
            <span className="text-ink-soft">Energy verified</span>
            <span className="font-mono text-ink">{h.energyKwh} kWh</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-ink-soft">Earned</span>
            <span className="font-mono font-medium text-ink">₹{h.earned.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
