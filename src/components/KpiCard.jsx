export default function KpiCard({ label, value, unit, trend, tone = 'ink' }) {
  const toneClass = {
    ink: 'text-ink',
    sun: 'text-sun-600',
    teal: 'text-teal-600',
    clay: 'text-clay-600',
    moss: 'text-moss-600',
  }[tone]

  return (
    <div className="rounded-xl border border-line bg-white px-5 py-4">
      <p className="text-xs text-ink-faint">{label}</p>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className={`font-mono text-2xl font-medium ${toneClass}`}>{value}</span>
        {unit && <span className="text-sm text-ink-soft">{unit}</span>}
      </div>
      {trend && (
        <p className={`mt-1 text-xs ${trend.startsWith('-') ? 'text-clay-600' : 'text-moss-600'}`}>
          {trend}
        </p>
      )}
    </div>
  )
}
