import { useAuth } from '../../context/AuthContext.jsx'

const FIELDS = [
  ['Name', 'Ramesh Choudhary'],
  ['FLC ID', 'FLC-001'],
  ['Load type', 'Agricultural pump'],
  ['Rated capacity', '7.5 kW'],
  ['Location', 'Pugal, Bikaner'],
  ['Phone', '+91 98XXX XX214'],
]

export default function FarmerProfile() {
  const { logout } = useAuth()
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-white p-4">
        {FIELDS.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
            <span className="text-sm text-ink-faint">{label}</span>
            <span className="text-sm text-ink">{value}</span>
          </div>
        ))}
      </div>
      <button onClick={logout} className="w-full rounded-xl border border-clay-200 bg-clay-50 py-2.5 text-sm font-medium text-clay-600">
        Log out
      </button>
    </div>
  )
}
