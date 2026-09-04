import { Outlet, NavLink } from 'react-router-dom'

import {
  Home,
  Activity,
  Wallet,
  Bell,
  User,
  LogOut,
  Sun,
  Zap,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const NAV = [
  {
    to: '/farmer/dashboard',
    label: 'Home',
    icon: Home,
    end: true,
  },
  {
    to: '/farmer/activity',
    label: 'Activity',
    icon: Activity,
  },
  {
    to: '/farmer/earnings',
    label: 'Earnings',
    icon: Wallet,
  },
  {
    to: '/farmer/notifications',
    label: 'Alerts',
    icon: Bell,
  },
  {
    to: '/farmer/profile',
    label: 'Profile',
    icon: User,
  },
]

export default function FarmerLayout() {
  const { session, logout } = useAuth()
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-paper">

      {/* =====================================================
          DESKTOP SIDEBAR
          ===================================================== */}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white lg:block">

        {/* Logo */}

        <div className="flex h-20 items-center gap-3 border-b border-line px-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-100">
            <Sun
              className="h-6 w-6 text-yellow-600"
              strokeWidth={1.7}
            />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-ink">
              YuvaSetu
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Flexible Energy
            </p>
          </div>

        </div>


        {/* User */}

        <div className="border-b border-line px-5 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sun-100 text-sun-700">
              <User
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold text-ink">
                {session?.name || 'Farmer'}
              </p>

              <p className="mt-0.5 truncate text-xs text-ink-faint">
                {session?.flcId || 'FLC-001'}
              </p>

            </div>

          </div>

        </div>


        {/* Navigation */}

        <div className="px-4 py-5">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">
            My Dashboard
          </p>

          <div className="space-y-1">

            {NAV.map((item) => {

              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-3 py-3',
                      'text-sm font-semibold transition-all',
                      isActive
                        ? 'bg-yellow-50 text-yellow-700 shadow-sm'
                        : 'text-ink-soft hover:bg-paper hover:text-ink',
                    ].join(' ')
                  }
                >

                  <Icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.8}
                  />

                  <span>{item.label}</span>

                </NavLink>
              )

            })}

          </div>

        </div>


        {/* Sidebar bottom */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-line p-4">

          <div className="mb-3 rounded-xl bg-sun-50 p-3">

            <div className="flex items-center gap-2">

              <Zap
                className="h-4 w-4 text-sun-600"
                fill="currentColor"
              />

              {/* Language Switch */}

<button
  type="button"
  onClick={toggleLanguage}
  className="mb-3 flex w-full items-center justify-between rounded-xl border border-line bg-white px-3 py-3 transition hover:border-yellow-300 hover:bg-yellow-50"
>
  <div className="flex items-center gap-2">

    <span className="text-sm font-semibold text-ink">
      भाषा / Language
    </span>

  </div>

  <div className="flex items-center rounded-full bg-paper p-1">

    <span
      className={`rounded-full px-2 py-1 text-[10px] font-bold ${
        language === 'en'
          ? 'bg-white text-yellow-700 shadow-sm'
          : 'text-ink-faint'
      }`}
    >
      EN
    </span>

    <span
      className={`rounded-full px-2 py-1 text-[10px] font-bold ${
        language === 'hi'
          ? 'bg-white text-yellow-700 shadow-sm'
          : 'text-ink-faint'
      }`}
    >
      हिं
    </span>

  </div>

</button>
              

              {/* <span className="text-xs font-semibold text-sun-800">
                Flexible Load
              </span> */}

            </div>

            <p className="mt-1 text-[10px] leading-4 text-sun-700">
              Helping absorb renewable energy when the grid needs flexibility.
            </p>

          </div>


          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-orange-50 hover:text-orange-700"
          >

            <LogOut
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            Log out

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <div className="lg:pl-64">

        {/* ===================================================
            HEADER
            =================================================== */}

        <header className="border-b border-line bg-white px-5 py-4 shadow-sm lg:px-8">

          <div className="mx-auto flex max-w-7xl items-center justify-between">

            {/* Mobile identity */}

            <div className="flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-100">

                <Sun
                  className="h-5 w-5 text-yellow-600"
                  strokeWidth={1.7}
                />

              </div>

              <div>

                <p className="text-base font-bold tracking-tight text-ink">
                  Namaste,{' '}
                  {session?.name?.split(' ')[0]}
                </p>

                <p className="mt-0.5 text-xs font-medium text-ink-faint">
                  {session?.flcId}
                  {' · '}
                  {session?.org?.split('·')[1] || 'Pugal'}
                </p>

              </div>

            </div>


            {/* Desktop title */}

            <div className="hidden lg:block">

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Farmer / Participant Portal
              </p>

              <h1 className="mt-1 text-xl font-bold tracking-tight text-ink">
                Namaste, {session?.name?.split(' ')[0] || 'Farmer'}
              </h1>

            </div>


            {/* Right side */}

            <button
  type="button"
  onClick={toggleLanguage}
  className="flex h-9 items-center gap-1 rounded-full border border-line bg-white px-2 text-[10px] font-bold text-ink-soft"
  aria-label="Change language"
>
  <span
    className={
      language === 'en'
        ? 'text-yellow-700'
        : 'text-ink-faint'
    }
  >
    EN
  </span>

  <span className="text-ink-faint">
    /
  </span>

  <span
    className={
      language === 'hi'
        ? 'text-yellow-700'
        : 'text-ink-faint'
    }
  >
    हिं
  </span>
</button>

            <div className="flex items-center gap-3">

              <div className="hidden rounded-full bg-green-50 px-3 py-1.5 text-[11px] font-semibold text-green-700 sm:block">

                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />

                System Online

              </div>


              {/* Mobile logout */}

              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition hover:border-orange-200 hover:bg-orange-50 lg:hidden"
              >

                <LogOut
                  className="h-4 w-4 text-ink-soft"
                  strokeWidth={1.8}
                />

              </button>

            </div>

          </div>

        </header>


        {/* ===================================================
            CONTENT
            =================================================== */}

        <main className="mx-auto max-w-7xl px-4 py-5 pb-28 sm:px-6 lg:px-8 lg:py-8 lg:pb-10">

          <Outlet />

        </main>

      </div>


      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          ===================================================== */}

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-around border-t border-line bg-white px-2 py-2.5 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] lg:hidden">

        {NAV.map((item) => {

          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex min-h-[44px] min-w-[52px]',
                  'flex-col items-center justify-center gap-1',
                  'rounded-lg px-2 text-[11px] font-semibold',
                  'transition-colors',
                  isActive
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-ink-faint hover:bg-paper hover:text-ink',
                ].join(' ')
              }
            >

              <Icon
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />

              {item.label}

            </NavLink>
          )

        })}

      </nav>

    </div>
  )
}