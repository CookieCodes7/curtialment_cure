import { Link } from 'react-router-dom'
import { Sun, Zap, GitBranch, Tractor, Activity, ArrowRight, CheckCircle2 } from 'lucide-react'

const FLOW = [
  { icon: Sun, label: 'Solar plant', tone: 'sun' },
  { icon: Zap, label: 'Curtailment', tone: 'clay' },
  { icon: GitBranch, label: 'YuvaSetu', tone: 'teal' },
  { icon: Tractor, label: 'Flexible loads', tone: 'sun' },
  { icon: CheckCircle2, label: 'Verified energy', tone: 'moss' },
]

const TONE = {
  sun: 'bg-sun-50 text-sun-600',
  clay: 'bg-clay-50 text-clay-600',
  teal: 'bg-teal-50 text-teal-600',
  moss: 'bg-moss-50 text-moss-600',
}

const ROLES = [
  {
    to: '/login/plant',
    icon: Sun,
    title: 'Plant developer',
    body: 'Monitor curtailment, recovered energy, and revenue at your plant.',
    cta: 'Log in as plant developer',
  },
  {
    to: '/login/discom',
    icon: Activity,
    title: 'DISCOM / grid operator',
    body: 'Monitor grid flexibility and coordinate demand response.',
    cta: 'Log in as grid operator',
  },
  {
    to: '/login/farmer',
    icon: Tractor,
    title: 'Farmer / FLC participant',
    body: 'Track your pump activity, energy, and earnings.',
    cta: 'Log in as participant',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-6">
        <Sun className="h-5 w-5 text-sun-600" strokeWidth={1.75} />
        <span className="font-semibold text-ink">YuvaSetu</span>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-14 pt-6 text-center">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">YuvaSetu</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Connecting renewable energy with flexible loads
        </p>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 sm:flex-col sm:gap-2">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${TONE[step.tone]}`}>
                <step.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span className="text-xs text-ink-soft sm:text-center">{step.label}</span>
              {i < FLOW.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint sm:hidden" strokeWidth={1.75} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {ROLES.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-ink-faint"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-dim">
                <r.icon className="h-5 w-5 text-ink-soft" strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 text-base font-medium text-ink">{r.title}</h2>
              <p className="mt-1.5 flex-1 text-sm text-ink-soft">{r.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:gap-2.5 transition-all">
                {r.cta}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
