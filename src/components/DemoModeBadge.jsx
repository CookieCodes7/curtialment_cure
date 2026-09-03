import { CircleDot } from 'lucide-react'

export default function DemoModeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-dim px-2.5 py-1 text-[11px] text-ink-faint">
      <CircleDot className="h-3 w-3" strokeWidth={1.5} />
      Demo mode — simulated data
    </span>
  )
}
