import { Outlet, NavLink } from 'react-router-dom'
import {
  Home,
  Activity,
  Wallet,
  Bell,
  User,
  LogOut,
  Sun,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

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

  return (
    <div className="min-h-screen bg-paper">

      {/* Header */}

      <header className="border-b border-line bg-white px-5 py-4 shadow-sm">

        <div className="mx-auto flex max-w-md items-center justify-between">

          <div className="flex items-center gap-3">

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
                {session?.org?.split('·')[1] ||
                  'Pugal'}
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={logout}
            aria-label="Log out"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition hover:border-orange-200 hover:bg-orange-50"
          >

            <LogOut
              className="h-4 w-4 text-ink-soft"
              strokeWidth={1.8}
            />

          </button>

        </div>

      </header>


      {/* Content */}

      <main className="mx-auto max-w-md px-4 py-5 pb-28">

        <Outlet />

      </main>


      {/* Mobile navigation */}

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-around border-t border-line bg-white px-2 py-2.5 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">

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