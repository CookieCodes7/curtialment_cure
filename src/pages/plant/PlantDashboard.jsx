import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import { FileDown, CheckCircle2 } from 'lucide-react'
import { useEventStore } from '../../lib/useEventStore.js'
import { HISTORICAL_EVENTS, GENERATION_SERIES } from '../../data/mockData.js'
import { useAuth } from '../../context/AuthContext.jsx'
import KpiCard from '../../components/KpiCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'

const PLANT_ID = 'PLANT-01'

export default function PlantDashboard() {
  const { session } = useAuth()
  const { liveEvents, flcs } = useEventStore()
  const [reportOpen, setReportOpen] = useState(false)

  const myLiveEvents = liveEvents.filter((e) => e.plantId === PLANT_ID)
  const completedLive = myLiveEvents.filter((e) => e.status === 'SETTLED')
  const runningLive = myLiveEvents.filter((e) => !['COMPLETED', 'SETTLED'].includes(e.status))

  const extraRecoveredMwh = completedLive.reduce((a, e) => a + e.recoveredMwh, 0)
  const extraRevenue = completedLive.reduce((a, e) => a + (e.settlement?.amount ?? 0), 0)
  const activeCurtailmentMw = runningLive.length
    ? +(runningLive.reduce((a, e) => a + (e.requiredKw - e.matchedKw), 0) / 1000).toFixed(2)
    : 1.8

  const recovered = +(42.6 + extraRecoveredMwh).toFixed(2)
  const revenue = 341000 + extraRevenue
  const activeFlcs = flcs.filter((f) => f.status === 'active').length

  const rows = useMemo(
    () => [...myLiveEvents, ...HISTORICAL_EVENTS.filter((e) => e.plantId === PLANT_ID)].slice(0, 6),
    [myLiveEvents]
  )

  const lastEvent = completedLive[0]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-ink-faint">Good morning</p>
        <h2 className="text-xl font-medium text-ink">Pugal Solar Plant</h2>
        <p className="text-sm text-ink-soft">Bikaner, Rajasthan</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Current generation" value="218.4" unit="MW" />
        <KpiCard label="Active curtailment" value={activeCurtailmentMw} unit="MW" tone="clay" />
        <KpiCard label="Curtailment recovered" value={recovered} unit="MWh" tone="teal" />
        <KpiCard label="Revenue saved" value={`₹${(revenue / 100000).toFixed(2)}L`} tone="sun" />
        <KpiCard label="Active FLCs" value={activeFlcs} />
        <KpiCard label="Network flexibility" value="4.82" unit="MW" />
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <p className="mb-4 text-xs text-ink-faint">Generation vs curtailment vs recovered — today</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={GENERATION_SERIES}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#8A8D84' }} axisLine={{ stroke: '#E4E1D6' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#8A8D84' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E4E1D6' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="generation" name="Generation (MW)" stroke="#DD8A1F" fill="#FDF3E2" strokeWidth={2} />
            <Area type="monotone" dataKey="curtailed" name="Curtailed (MW)" stroke="#BE5030" fill="#F8E9E1" strokeWidth={2} />
            <Area type="monotone" dataKey="recovered" name="Recovered (MW)" stroke="#0E6E58" fill="#E4F1EC" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-ink">Recent curtailment events</h3>
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink-faint">
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Required</th>
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
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-ink">Hardware-verified energy</h3>
          <button
            onClick={() => setReportOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-paper-dim"
          >
            <FileDown className="h-3.5 w-3.5" strokeWidth={1.75} />
            Generate evidence report
          </button>
        </div>
        <p className="mt-1 text-xs text-ink-faint">Readings below come from FLC current-sensors, not self-reported figures.</p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink-faint">
                <th className="py-2 pr-4 font-medium">FLC</th>
                <th className="py-2 pr-4 font-medium">Assigned</th>
                <th className="py-2 pr-4 font-medium">Measured</th>
                <th className="py-2 pr-4 font-medium">Energy</th>
                <th className="py-2 font-medium">Verification</th>
              </tr>
            </thead>
            <tbody>
              {(lastEvent?.readings ?? [
                { id: 'FLC-004', allocatedKw: 15, powerKw: 14.82, energyKwh: 7.41 },
                { id: 'FLC-006', allocatedKw: 12.5, powerKw: 12.34, energyKwh: 6.17 },
              ]).map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4 font-mono text-xs">{r.id}</td>
                  <td className="py-2 pr-4 font-mono">{r.allocatedKw} kW</td>
                  <td className="py-2 pr-4 font-mono">{r.powerKw} kW</td>
                  <td className="py-2 pr-4 font-mono">{r.energyKwh ?? (r.powerKw / 2).toFixed(2)} kWh</td>
                  <td className="py-2">
                    <span className="inline-flex items-center gap-1 text-xs text-moss-600">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {reportOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/45 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <p className="text-xs text-ink-faint">YuvaSetu</p>
            <h3 className="mt-1 text-base font-medium text-ink">Curtailment recovery report</h3>
            <div className="mt-4 space-y-2 text-sm text-ink-soft">
              <div className="flex justify-between"><span>Plant</span><span className="text-ink">Pugal Solar Plant</span></div>
              <div className="flex justify-between"><span>Period</span><span className="text-ink">01–03 Sep 2026</span></div>
              <div className="flex justify-between"><span>Total curtailment</span><span className="font-mono text-ink">58.2 MWh</span></div>
              <div className="flex justify-between"><span>Recovered</span><span className="font-mono text-ink">{recovered} MWh</span></div>
              <div className="flex justify-between"><span>Participating FLCs</span><span className="font-mono text-ink">{new Set(myLiveEvents.flatMap(e => e.selected?.map(s => s.id) ?? [])).size + 18}</span></div>
              <div className="flex justify-between"><span>Estimated revenue</span><span className="font-mono text-ink">₹{revenue.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="mt-5 flex gap-2">
              <button onClick={() => setReportOpen(false)} className="flex-1 rounded-lg border border-line py-2 text-sm text-ink-soft">Close</button>
              <button onClick={() => setReportOpen(false)} className="flex-1 rounded-lg bg-ink py-2 text-sm font-medium text-white">Download report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
