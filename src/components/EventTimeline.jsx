import { Check } from 'lucide-react'

export default function EventTimeline({ steps }) {
  return (
    <ol className="relative border-l border-line pl-5">
      {steps.map((s, i) => (
        <li key={i} className="mb-5 last:mb-0">
          <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-moss-500">
            <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
          </span>
          <p className="text-sm text-ink">{s.label}</p>
          <p className="font-mono text-xs text-ink-faint">{s.at}</p>
        </li>
      ))}
    </ol>
  )
}
