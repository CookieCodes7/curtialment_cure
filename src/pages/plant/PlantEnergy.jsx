import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { WEEKLY_RECOVERY, CURTAILMENT_VS_RECOVERY, FLC_PARTICIPATION } from '../../data/mockData.js'
import KpiCard from '../../components/KpiCard.jsx'

const axisProps = {
  tick: { fontSize: 11, fill: '#8A8D84' },
  axisLine: { stroke: '#E4E1D6' },
  tickLine: false,
}
const tooltipStyle = { fontSize: 12, borderRadius: 8, border: '1px solid #E4E1D6' }

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <p className="mb-4 text-xs text-ink-faint">{title}</p>
      <ResponsiveContainer width="100%" height={220}>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export default function PlantEnergy() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard label="Recovered this week" value="30.1" unit="MWh" tone="teal" />
        <KpiCard label="Revenue saved" value="₹2.39L" tone="sun" />
        <KpiCard label="Events this week" value="47" />
        <KpiCard label="Recovery rate" value="71" unit="%" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Recovered energy — daily (MWh)">
          <LineChart data={WEEKLY_RECOVERY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} width={28} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="mwh" stroke="#0E6E58" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Revenue saved — daily (₹)">
          <BarChart data={WEEKLY_RECOVERY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} width={40} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="revenue" fill="#DD8A1F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Curtailment vs recovery (MWh)">
          <BarChart data={CURTAILMENT_VS_RECOVERY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} width={28} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="curtailed" name="Curtailed" fill="#E2A388" radius={[4, 4, 0, 0]} />
            <Bar dataKey="recovered" name="Recovered" fill="#0E6E58" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="FLC participation — daily count">
          <BarChart data={FLC_PARTICIPATION}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} width={28} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="flcs" fill="#DD8A1F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  )
}
