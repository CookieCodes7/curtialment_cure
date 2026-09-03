import { Link } from 'react-router-dom'
import SolarEnergyAnimation from '../components/SolarEnergyAnimation'
import HardwareSolution from "../components/HardwareSolution";
import {
  Sun,
  Zap,
  Radio,
  Tractor,
  Activity,
  ShieldCheck,
  Gauge,
  Network,
  Power,
  ChevronRight,
  ArrowRight,
  Waves,
} from 'lucide-react'

const ROLES = [
  {
    to: '/login/plant',
    icon: Sun,
    number: '01',
    title: 'Plant Developer',
    description:
      'Monitor renewable generation, curtailment events, recovered energy and financial impact.',
    action: 'Open plant portal',
  },
  {
    to: '/login/discom',
    icon: Network,
    number: '02',
    title: 'DISCOM / Grid Operator',
    description:
      'Coordinate flexible loads and respond to renewable curtailment events in real time.',
    action: 'Open grid control',
  },
  {
    to: '/login/farmer',
    icon: Tractor,
    number: '03',
    title: 'Farmer / FLC Participant',
    description:
      'Participate in demand response, monitor your pump and track verified earnings.',
    action: 'Open participant portal',
  },
]

function EnergyNode({
  icon: Icon,
  label,
  subtitle,
  active = false,
  warning = false,
}) {
  return (
    <div className="flex min-w-[110px] flex-col items-center">
      <div
        className={[
          'relative flex h-[72px] w-[72px] items-center justify-center',
          'rounded-2xl border transition-all duration-300',
          active
            ? 'border-yellow-400/60 bg-yellow-50 shadow-[0_8px_30px_rgba(245,158,11,0.15)]'
            : warning
              ? 'border-orange-300 bg-orange-50'
              : 'border-gray-200 bg-white',
        ].join(' ')}
      >
        {active && (
          <span className="absolute inset-[-5px] rounded-2xl border border-yellow-400/20" />
        )}

        <Icon
          className={
            active
              ? 'h-8 w-8 text-yellow-500'
              : warning
                ? 'h-8 w-8 text-orange-500'
                : 'h-7 w-7 text-gray-500'
          }
          strokeWidth={1.5}
        />
      </div>

      <span className="mt-3 text-sm font-semibold tracking-tight text-gray-800">
        {label}
      </span>

      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-400">
        {subtitle}
      </span>
    </div>
  )
}

function FlowLine({ active = false }) {
  return (
    <div className="relative hidden h-[2px] flex-1 overflow-hidden rounded-full bg-gray-200 sm:block">
      {active && (
        <>
          <div className="absolute inset-y-0 left-0 w-20 animate-[solarFlow_2.2s_linear_infinite] rounded-full bg-gradient-to-r from-transparent via-yellow-400 to-orange-400" />

          <div className="absolute inset-y-0 left-0 w-10 animate-[solarFlow_2.2s_linear_infinite_0.8s] rounded-full bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60" />
        </>
      )}
    </div>
  )
}

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f4eb] text-gray-900">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0">

        {/* Soft solar glow */}
        <div className="absolute left-1/2 top-[-280px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-yellow-300/20 blur-[130px]" />

        {/* Orange glow */}
        <div className="absolute right-[-250px] top-[25%] h-[500px] w-[500px] rounded-full bg-orange-300/10 blur-[130px]" />

        {/* Warm lower glow */}
        <div className="absolute bottom-[-300px] left-[-200px] h-[550px] w-[550px] rounded-full bg-amber-200/20 blur-[140px]" />

        {/* Very subtle technical grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(80,60,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(80,60,20,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

      </div>


      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-300 bg-yellow-100 shadow-sm">

            <Sun
              className="h-6 w-6 text-yellow-500"
              strokeWidth={1.7}
            />

          </div>

          <div>

            <div className="text-[20px] font-bold tracking-[-0.035em] text-gray-900">
              YuvaSetu
            </div>

            <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gray-400">
              Renewable Flexibility Network
            </div>

          </div>

        </div>


        {/* Network status */}

        <div className="hidden items-center gap-5 sm:flex">

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-30" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

            </span>

            Network operational

          </div>


          <div className="rounded-md border border-gray-200 bg-white/70 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-gray-400 shadow-sm">
            DEMO MODE
          </div>

        </div>

      </header>
      <HardwareSolution />


      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-10 lg:pt-20">

        <div className="mx-auto max-w-4xl text-center">

          {/* Eyebrow */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-100/70 px-4 py-2 shadow-sm">

            <Power
              className="h-3.5 w-3.5 text-yellow-600"
              strokeWidth={1.8}
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-700">
              Intelligent demand response infrastructure
            </span>

          </div>


          {/* Main heading */}

          <h1 className="text-[42px] font-semibold leading-[1.03] tracking-[-0.05em] text-gray-900 sm:text-6xl lg:text-[76px]">

            Don't waste

            <span className="relative mx-2 inline-block text-yellow-500">

              renewable energy.

              <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-80" />

            </span>

            <span className="block text-gray-700">
              redirect its value.
            </span>

          </h1>


          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-7 text-gray-500 sm:text-[17px]">

            YuvaSetu connects distant renewable energy plants with
            flexible electricity consumers, transforming renewable
            curtailment into useful, measurable demand response.

          </p>


          {/* Feature pills */}

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3.5 py-2 text-[11px] font-medium text-gray-500 shadow-sm">

              <Sun className="h-3.5 w-3.5 text-yellow-500" />

              Renewable generation

            </div>


            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3.5 py-2 text-[11px] font-medium text-gray-500 shadow-sm">

              <Radio className="h-3.5 w-3.5 text-orange-500" />

              Real-time communication

            </div>


            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3.5 py-2 text-[11px] font-medium text-gray-500 shadow-sm">

              <Gauge className="h-3.5 w-3.5 text-yellow-600" />

              Verified flexibility

            </div>

          </div>

        </div>


        {/* =====================================================
            ENERGY NETWORK
        ===================================================== */}

        <div className="mx-auto mt-16 max-w-6xl">

          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-[0_25px_80px_rgba(80,60,20,0.08)] backdrop-blur-xl">

            {/* Top solar accent */}

            <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400" />


            {/* Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">

              <div>

                <div className="flex items-center gap-2">

                  <Activity className="h-4 w-4 text-orange-500" />

                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-gray-700">
                    Network flow
                  </span>

                </div>

                <p className="mt-1 text-[11px] text-gray-400">
                  Renewable curtailment → flexible demand
                </p>

              </div>


              <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5">

                <span className="relative flex h-1.5 w-1.5">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-40" />

                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />

                </span>

                <span className="text-[9px] font-bold tracking-[0.16em] text-green-600">
                  LIVE
                </span>

              </div>

            </div>


            {/* Flow diagram */}

            <div className="px-6 py-10 sm:px-10 sm:py-12">

              <div className="flex flex-col items-center gap-7 sm:flex-row sm:gap-4">

                <EnergyNode
                  icon={Sun}
                  label="Solar Plant"
                  subtitle="Generation"
                  active
                />

                <FlowLine active />

                <EnergyNode
                  icon={Zap}
                  label="Curtailment"
                  subtitle="Detected"
                  warning
                />

                <FlowLine active />

                <EnergyNode
                  icon={Radio}
                  label="YuvaSetu"
                  subtitle="Matching"
                  active
                />

                <FlowLine active />

                <EnergyNode
                  icon={Tractor}
                  label="Flexible Loads"
                  subtitle="Activated"
                  active
                />

              </div>


              {/* Explanation */}

              <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-yellow-200 bg-yellow-50/60 px-5 py-4 text-center">

                <p className="text-[11px] leading-5 text-gray-500">

                  <span className="font-bold text-orange-600">
                    YuvaSetu response:
                  </span>{' '}

                  When renewable generation is curtailed, available
                  flexible loads are intelligently matched and activated
                  to absorb useful energy.

                </p>

              </div>

            </div>


            {/* Metrics */}

            <div className="grid grid-cols-2 border-t border-gray-100 sm:grid-cols-4">

              <div className="border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">

                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  Connected plants
                </div>

                <div className="mt-2 text-2xl font-semibold tracking-tight text-gray-800">
                  03
                </div>

              </div>


              <div className="border-b border-gray-100 p-5 sm:border-b-0 sm:border-r">

                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  Flexible loads
                </div>

                <div className="mt-2 text-2xl font-semibold tracking-tight text-gray-800">
                  10
                </div>

              </div>


              <div className="border-r-0 border-gray-100 p-5 sm:border-r">

                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  Available flexibility
                </div>

                <div className="mt-2 text-2xl font-semibold tracking-tight text-orange-500">

                  95

                  <span className="ml-1 text-sm font-medium text-orange-400">
                    kW
                  </span>

                </div>

              </div>


              <div className="p-5">

                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  System status
                </div>

                <div className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight text-green-600">

                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />

                  Online

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      <SolarEnergyAnimation />


      {/* =========================================================
          PLATFORM ACCESS
      ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">

        <div className="mb-9">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <div className="flex items-center gap-2">

                <span className="h-[2px] w-8 bg-gradient-to-r from-yellow-400 to-orange-400" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  Platform access
                </span>

              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-gray-900 sm:text-3xl">
                Choose your workspace
              </h2>

            </div>


            <p className="max-w-md text-sm leading-6 text-gray-500 sm:text-right">

              Three participants.

              <br className="hidden sm:block" />

              One coordinated renewable-energy flexibility network.

            </p>

          </div>

        </div>


        {/* Role cards */}

        <div className="grid gap-5 md:grid-cols-3">

          {ROLES.map((role) => {

            const Icon = role.icon

            return (
              <Link
                key={role.to}
                to={role.to}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_10px_35px_rgba(80,60,20,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-[0_20px_55px_rgba(245,158,11,0.12)]"
              >

                {/* Hover glow */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-yellow-200/20 blur-3xl transition-all duration-500 group-hover:bg-yellow-300/30" />


                {/* Number */}

                <div className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-gray-200 transition-colors group-hover:text-yellow-400/50">
                  {role.number}
                </div>


                <div className="relative">

                  {/* Icon */}

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:border-yellow-300 group-hover:bg-yellow-50">

                    <Icon
                      className="h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-yellow-600"
                      strokeWidth={1.5}
                    />

                  </div>


                  {/* Title */}

                  <h3 className="mt-7 text-[17px] font-semibold tracking-[-0.015em] text-gray-900">
                    {role.title}
                  </h3>


                  {/* Description */}

                  <p className="mt-2 min-h-[72px] text-[13px] leading-6 text-gray-500">
                    {role.description}
                  </p>


                  {/* Action */}

                  <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-4">

                    <span className="text-[11px] font-bold text-gray-500 transition-colors group-hover:text-orange-500">
                      {role.action}
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:border-yellow-300 group-hover:bg-yellow-50">

                      <ChevronRight
                        className="h-4 w-4 text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-orange-500"
                        strokeWidth={1.7}
                      />

                    </div>

                  </div>

                </div>

              </Link>
            )
          })}

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="relative z-10 border-t border-gray-200 bg-white/50 px-6 py-7 lg:px-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="flex items-center gap-2">

            <Sun className="h-3.5 w-3.5 text-yellow-500" />

            <span className="text-[10px] font-medium tracking-wide text-gray-400">
              YuvaSetu · Renewable Energy Flexibility Platform
            </span>

          </div>


          <div className="flex items-center gap-5 text-[10px] text-gray-400">

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


      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>{`

        @keyframes solarFlow {

          0% {
            transform: translateX(-150%);
          }

          100% {
            transform: translateX(600%);
          }

        }

      `}</style>

    </main>
  )
}