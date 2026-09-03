import { useState } from 'react'
import { FileDown } from 'lucide-react'

export default function PlantReports() {
  const [range, setRange] = useState('01–03 Sep 2026')

  return (
    <div className="max-w-lg rounded-xl border border-line bg-white p-6">
      <p className="text-xs text-ink-faint">YuvaSetu</p>
      <h2 className="mt-1 text-base font-medium text-ink">Curtailment recovery report</h2>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs text-ink-soft">Period</label>
        <input
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-sun-500"
        />
      </div>

      <div className="mt-5 space-y-2 text-sm text-ink-soft">
        <div className="flex justify-between"><span>Plant</span><span className="text-ink">Pugal Solar Plant</span></div>
        <div className="flex justify-between"><span>Total curtailment</span><span className="font-mono text-ink">58.2 MWh</span></div>
        <div className="flex justify-between"><span>Recovered</span><span className="font-mono text-ink">42.6 MWh</span></div>
        <div className="flex justify-between"><span>Participating FLCs</span><span className="font-mono text-ink">28</span></div>
        <div className="flex justify-between"><span>Estimated revenue</span><span className="font-mono text-ink">₹3,41,000</span></div>
      </div>

      <button className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-ink py-2.5 text-sm font-medium text-white hover:opacity-90">
        <FileDown className="h-4 w-4" strokeWidth={1.75} />
        Download report
      </button>
    </div>
  )
}
