import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FARMER_MONTHLY_EARNINGS } from '../../data/mockData.js'

export default function FarmerEarnings() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        <p className="text-xs text-ink-faint">Total earnings</p>
        <p className="mt-1 text-3xl font-semibold text-ink">₹1,842.50</p>
        <div className="mt-4 flex justify-center gap-10 border-t border-line pt-4 text-sm">
          <div>
            <p className="font-mono text-lg text-ink">₹428.50</p>
            <p className="text-xs text-ink-faint">this month</p>
          </div>
          <div>
            <p className="font-mono text-lg text-ink">₹376.20</p>
            <p className="text-xs text-ink-faint">last month</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-3 text-xs text-ink-faint">Monthly earnings</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={FARMER_MONTHLY_EARNINGS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8A8D84' }} axisLine={{ stroke: '#E4E1D6' }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#8A8D84' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E4E1D6' }} />
            <Bar dataKey="amount" fill="#DD8A1F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
