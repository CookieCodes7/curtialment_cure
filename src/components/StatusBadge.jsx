const MAP = {
  // event state machine
  DETECTED: { c: 'clay', label: 'Detected' },
  MATCHING: { c: 'sun', label: 'Matching' },
  MATCHED: { c: 'sun', label: 'Matched' },
  DISPATCHING: { c: 'sun', label: 'Dispatching' },
  ACTIVE: { c: 'teal', label: 'Active' },
  VERIFYING: { c: 'sun', label: 'Verifying' },
  COMPLETED: { c: 'moss', label: 'Completed' },
  SETTLED: { c: 'moss', label: 'Settled' },
  // flc / system status
  available: { c: 'moss', label: 'Available' },
  active: { c: 'teal', label: 'Active' },
  offline: { c: 'clay', label: 'Offline' },
  Completed: { c: 'moss', label: 'Completed' },
  Processed: { c: 'moss', label: 'Processed' },
  Verified: { c: 'moss', label: 'Verified' },
  online: { c: 'moss', label: 'Online' },
  healthy: { c: 'moss', label: 'Healthy' },
}

const COLORS = {
  clay: 'bg-clay-50 text-clay-600',
  sun: 'bg-sun-50 text-sun-600',
  teal: 'bg-teal-50 text-teal-600',
  moss: 'bg-moss-50 text-moss-600',
}

export default function StatusBadge({ status, dot = true }) {
  const entry = MAP[status] || { c: 'teal', label: status }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${COLORS[entry.c]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full bg-current`} />}
      {entry.label}
    </span>
  )
}
