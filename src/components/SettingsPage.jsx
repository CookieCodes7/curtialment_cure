export default function SettingsPage({ fields }) {
  return (
    <div className="max-w-lg rounded-xl border border-line bg-white p-5">
      <p className="mb-4 text-sm font-medium text-ink">Account settings</p>
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center justify-between border-b border-line pb-3 last:border-0">
            <span className="text-sm text-ink-soft">{f.label}</span>
            <span className="text-sm text-ink">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
