import {
  Zap,
  IndianRupee,
  Activity,
  CheckCircle2,
  Clock3,
  Gauge,
  TrendingUp,
  Droplets,
  ArrowUpRight,
} from 'lucide-react'

import { useEventStore } from '../../lib/useEventStore.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { FARMER_HISTORY } from '../../data/mockData.js'

const FLC_ID = 'FLC-001'

export default function FarmerDashboard() {
  const { session } = useAuth()
  const { flcs, liveEvents } = useEventStore()

  const myFlc = flcs.find(
    (f) => f.id === (session?.flcId ?? FLC_ID)
  )

  const active = myFlc?.status === 'active'

  const myEvents = liveEvents.filter(
    (e) =>
      e.selected?.some(
        (s) => s.id === myFlc?.id
      )
  )

  const myEvent = myEvents.find(
    (e) => e.status !== 'SETTLED'
  )

  const recentHistory = FARMER_HISTORY.slice(0, 3)

  const monthlyEarnings = 428.5

  const monthlyEnergy = 53.4

  const monthlyEvents = 12

  const currentPower = myFlc?.currentPowerKw ?? 0

  const capacity = myFlc?.capacityKw ?? 7.5

  const utilization =
    capacity > 0
      ? Math.min(
          100,
          Math.round(
            (currentPower / capacity) * 100
          )
        )
      : 0

  return (
    <div className="space-y-4">

      {/* =====================================================
          HERO / LIVE STATUS
          ===================================================== */}

      <div
        className={`relative overflow-hidden rounded-3xl border p-5 ${
          active
            ? 'border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50'
            : 'border-sun-200 bg-gradient-to-br from-sun-50 via-white to-amber-50'
        }`}
      >

        {/* Decorative circle */}

        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${
            active
              ? 'bg-green-100'
              : 'bg-sun-100'
          } opacity-60`}
        />

        <div className="relative">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
                YOUR FLEXIBLE LOAD
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    active
                      ? 'bg-green-500 shadow-[0_0_0_5px_rgba(34,197,94,0.12)]'
                      : 'bg-sun-500 shadow-[0_0_0_5px_rgba(245,158,11,0.12)]'
                  }`}
                />

                <h1 className="text-2xl font-bold tracking-tight text-ink">
                  {active
                    ? 'Running now'
                    : 'Ready'}
                </h1>

              </div>

              <p className="mt-1 text-sm text-ink-soft">
                {active
                  ? 'Your pump is participating in a flexibility event.'
                  : 'Your pump is available for the next event.'}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-sun-100 text-sun-700'
              }`}
            >
              <Zap
                className="h-6 w-6"
                fill={active ? 'currentColor' : 'none'}
                strokeWidth={1.75}
              />
            </div>

          </div>

          {/* Current power */}

          <div className="mt-5 flex items-end justify-between">

            <div>
              <p className="text-xs text-ink-faint">
                Current power
              </p>

              <p className="mt-1 font-mono text-3xl font-semibold text-ink">
                {currentPower}
                <span className="ml-1 text-base font-normal text-ink-faint">
                  kW
                </span>
              </p>
            </div>

            <div className="text-right">

              <p className="text-xs text-ink-faint">
                Capacity
              </p>

              <p className="mt-1 font-mono text-sm font-medium text-ink">
                {capacity} kW
              </p>

            </div>

          </div>

          {/* Power bar */}

          <div className="mt-3">

            <div className="h-2 overflow-hidden rounded-full bg-black/5">

              <div
                className={`h-full rounded-full transition-all ${
                  active
                    ? 'bg-green-500'
                    : 'bg-sun-500'
                }`}
                style={{
                  width: `${active ? Math.max(utilization, 8) : 0}%`,
                }}
              />

            </div>

            <div className="mt-1 flex justify-between text-[10px] text-ink-faint">
              <span>
                {active
                  ? `${utilization}% active`
                  : 'Not currently running'}
              </span>

              <span>
                {active
                  ? 'LIVE'
                  : 'AVAILABLE'}
              </span>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ACTIVE EVENT
          ===================================================== */}

      {myEvent && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Activity
                className="h-4 w-4"
                strokeWidth={2}
              />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-center justify-between gap-3">

                <p className="text-sm font-semibold text-ink">
                  Flexibility event
                </p>

                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase text-orange-700">
                  {myEvent.status}
                </span>

              </div>

              <p className="mt-1 text-xs text-ink-soft">
                {myEvent.plant || 'Solar plant'} ·
                {myEvent.requiredKw
                  ? ` ${myEvent.requiredKw} kW requested`
                  : ' Energy flexibility request'}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs">

                <span className="flex items-center gap-1.5 text-ink-soft">
                  <Clock3 className="h-3.5 w-3.5" />
                  Event in progress
                </span>

                <span className="flex items-center gap-1.5 font-medium text-green-700">
                  <Zap className="h-3.5 w-3.5" />
                  Participating
                </span>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          QUICK STATS
          ===================================================== */}

      <div className="grid grid-cols-2 gap-3">

        {/* Earnings */}

        <div className="rounded-2xl border border-line bg-white p-4">

          <div className="flex items-center justify-between">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sun-50 text-sun-600">
              <IndianRupee
                className="h-4 w-4"
                strokeWidth={2}
              />
            </div>

            <ArrowUpRight
              className="h-4 w-4 text-green-600"
              strokeWidth={1.75}
            />

          </div>

          <p className="mt-4 text-[11px] text-ink-faint">
            THIS MONTH
          </p>

          <p className="mt-1 font-mono text-xl font-semibold text-ink">
            ₹{monthlyEarnings.toFixed(2)}
          </p>

          <p className="mt-1 text-[11px] text-green-700">
            Earned from flexibility
          </p>

        </div>


        {/* Energy */}

        <div className="rounded-2xl border border-line bg-white p-4">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Gauge
              className="h-4 w-4"
              strokeWidth={2}
            />
          </div>

          <p className="mt-4 text-[11px] text-ink-faint">
            VERIFIED ENERGY
          </p>

          <p className="mt-1 font-mono text-xl font-semibold text-ink">
            {monthlyEnergy}
            <span className="ml-1 text-xs font-normal text-ink-faint">
              kWh
            </span>
          </p>

          <p className="mt-1 text-[11px] text-ink-faint">
            Hardware verified
          </p>

        </div>

      </div>


      {/* =====================================================
          PARTICIPATION SUMMARY
          ===================================================== */}

      <div className="rounded-2xl border border-line bg-white p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-ink">
              Your participation
            </p>

            <p className="mt-1 text-xs text-ink-faint">
              Your contribution this month
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <TrendingUp
              className="h-4 w-4"
              strokeWidth={2}
            />
          </div>

        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-line">

          <div className="text-center">

            <p className="font-mono text-lg font-semibold text-ink">
              {monthlyEvents}
            </p>

            <p className="mt-1 text-[10px] text-ink-faint">
              EVENTS
            </p>

          </div>

          <div className="text-center">

            <p className="font-mono text-lg font-semibold text-ink">
              53.4
            </p>

            <p className="mt-1 text-[10px] text-ink-faint">
              kWh VERIFIED
            </p>

          </div>

          <div className="text-center">

            <p className="font-mono text-lg font-semibold text-green-700">
              100%
            </p>

            <p className="mt-1 text-[10px] text-ink-faint">
              VERIFIED
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          RECENT VERIFIED ACTIVITY
          ===================================================== */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-ink">
              Recent activity
            </p>

            <p className="mt-0.5 text-xs text-ink-faint">
              Your latest verified flexibility events
            </p>
          </div>

          <span className="text-[10px] font-semibold uppercase tracking-wide text-sun-600">
            View all
          </span>

        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">

          {recentHistory.map((item, index) => (

            <div
              key={`${item.date}-${index}`}
              className={`flex items-center gap-3 p-4 ${
                index !== recentHistory.length - 1
                  ? 'border-b border-line'
                  : ''
              }`}
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">

                <CheckCircle2
                  className="h-4 w-4"
                  strokeWidth={2}
                />

              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">

                  <p className="text-sm font-medium text-ink">
                    {item.date}
                  </p>

                  <p className="font-mono text-sm font-semibold text-ink">
                    ₹{item.earned.toFixed(2)}
                  </p>

                </div>

                <p className="mt-1 text-xs text-ink-faint">
                  {item.durationMin} min · {item.energyKwh} kWh verified
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          IMPACT CARD
          ===================================================== */}

      <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-5">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <Droplets
              className="h-5 w-5"
              strokeWidth={1.75}
            />
          </div>

          <div>

            <p className="text-sm font-semibold text-ink">
              Your flexibility matters
            </p>

            <p className="mt-1 text-xs leading-5 text-ink-soft">
              By making your pump available when the
              grid needs flexible demand, you help absorb
              renewable energy that might otherwise be curtailed.
            </p>

          </div>

        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2.5">

          <span className="text-xs text-ink-soft">
            Verified flexibility this month
          </span>

          <span className="font-mono text-sm font-semibold text-green-700">
            53.4 kWh
          </span>

        </div>

      </div>


      {/* =====================================================
          DEMO DATA NOTE
          ===================================================== */}

      <p className="px-2 pb-2 text-center text-[10px] leading-4 text-ink-faint">
        YuvaSetu demo · Energy and earnings shown are
        illustrative values from the prototype.
      </p>

    </div>
  )
}