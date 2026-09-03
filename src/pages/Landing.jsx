import { Link } from 'react-router-dom'
import {
  Sun,
  Zap,
  Radio,
  Tractor,
  ArrowRight,
  Activity,
  ShieldCheck,
  Waves,
  Gauge,
  Network,
} from 'lucide-react'

const ROLES = [
  {
    to: '/login/plant',
    icon: Sun,
    title: 'Plant Developer',
    description:
      'Monitor curtailment, recovered generation and financial impact across your renewable assets.',
    action: 'Enter plant portal',
  },
  {
    to: '/login/discom',
    icon: Network,
    title: 'DISCOM / Grid Operator',
    description:
      'Coordinate flexible loads and respond to grid conditions in real time.',
    action: 'Open grid control',
  },
  {
    to: '/login/farmer',
    icon: Tractor,
    title: 'Farmer / FLC Participant',
    description:
      'Control your flexible load, verify participation and track your earnings.',
    action: 'Open participant portal',
  },
]

function EnergyNode({ icon: Icon, label, active = false }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={[
          'relative flex h-16 w-16 items-center justify-center rounded-2xl border',
          'backdrop-blur-md transition-all duration-300',
          active
            ? 'border-teal-400/50 bg-teal-400/10 shadow-[0_0_35px_rgba(45,212,191,0.15)]'
            : 'border-white/10 bg-white/[0.04]',
        ].join(' ')}
      >
        {active && (
          <span className="absolute inset-0 rounded-2xl border border-teal-400/20 animate-pulse" />
        )}

        <Icon
          className={active ? 'h-7 w-7 text-teal-300' : 'h-7 w-7 text-slate-300'}
          strokeWidth={1.6}
        />
      </div>

      <span className="text-xs font-medium tracking-wide text-slate-400">
        {label}
      </span>
    </div>
  )
}

function FlowLine() {
  return (
    <div className="relative hidden h-px flex-1 overflow-hidden bg-white/10 sm:block">
      <div className="absolute inset-y-0 left-0 w-24 animate-[flow_2.5s_linear_infinite] bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
    </div>
  )
}

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#061311] text-white">

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />

        <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-amber-400/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Navigation */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-300/10">
            <Waves className="h-5 w-5 text-teal-300" strokeWidth={1.7} />
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight">
              YuvaSetu
            </div>

            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Renewable Flexibility Network
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-6 text-sm text-slate-400 sm:flex">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Network operational
          </span>

          <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs">
            DEMO MODE
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10 lg:pt-20">

        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.07] px-4 py-2 text-xs font-medium text-teal-200">
            <Activity className="h-3.5 w-3.5" />
            Intelligent demand response infrastructure
          </div>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Turning renewable
            <span className="block bg-gradient-to-r from-teal-200 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              curtailment into flexibility.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            YuvaSetu connects distant renewable energy plants with
            flexible electricity consumers, helping recover wasted
            renewable generation through intelligent demand response.
          </p>

          {/* Live status */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3">

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
              <Sun className="h-3.5 w-3.5 text-amber-300" />
              Solar generation
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
              <Radio className="h-3.5 w-3.5 text-teal-300" />
              Real-time communication
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
              <Gauge className="h-3.5 w-3.5 text-emerald-300" />
              Verified flexibility
            </div>

          </div>
        </div>

        {/* Energy flow */}
        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-2xl backdrop-blur-xl sm:p-10">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                YuvaSetu network
              </p>

              <h2 className="mt-1 text-sm font-semibold text-slate-200">
                Renewable energy flexibility flow
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row">

            <EnergyNode
              icon={Sun}
              label="Solar Plant"
              active
            />

            <FlowLine />

            <EnergyNode
              icon={Zap}
              label="Curtailment"
            />

            <FlowLine />

            <EnergyNode
              icon={Radio}
              label="YuvaSetu"
              active
            />

            <FlowLine />

            <EnergyNode
              icon={Tractor}
              label="Flexible Loads"
              active
            />

          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="text-xs text-slate-500">Connected plants</div>
              <div className="mt-1 text-xl font-semibold">03</div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="text-xs text-slate-500">Flexible loads</div>
              <div className="mt-1 text-xl font-semibold">10</div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="text-xs text-slate-500">Available flexibility</div>
              <div className="mt-1 text-xl font-semibold text-teal-300">
                95 kW
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">
              <div className="text-xs text-slate-500">System status</div>
              <div className="mt-1 flex items-center gap-2 text-xl font-semibold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Role selection */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-300/70">
            Access platform
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Choose your YuvaSetu workspace
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Each participant gets a workspace designed around their role
            in the flexibility network.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          {ROLES.map((role) => {
            const Icon = role.icon

            return (
              <Link
                key={role.to}
                to={role.to}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/30 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >

                <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full bg-teal-300/5 blur-2xl transition-all duration-500 group-hover:bg-teal-300/10" />

                <div className="relative">

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-teal-300/30 group-hover:bg-teal-300/10">
                      <Icon className="h-6 w-6 text-slate-300 transition-colors group-hover:text-teal-300" />
                    </div>

                    <ArrowRight className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-300" />

                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {role.title}
                  </h3>

                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-400">
                    {role.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-teal-300">
                    {role.action}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                </div>
              </Link>
            )
          })}

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 lg:px-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-600 sm:flex-row">

          <div>
            YuvaSetu · Renewable Energy Flexibility Platform
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure communication
            </span>

            <span>
              Prototype / Demo
            </span>
          </div>

        </div>

      </footer>

      <style>{`
        @keyframes flow {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(500%);
          }
        }
      `}</style>

    </main>
  )
}