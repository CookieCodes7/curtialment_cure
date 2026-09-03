import { Outlet, NavLink } from 'react-router-dom'
import { Home, Activity, Wallet, Bell, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { LogOut } from 'lucide-react'

const NAV = [
  { to: '/farmer/dashboard', label: 'Home', icon: Home, end: true },
  { to: '/farmer/activity', label: 'Activity', icon: Activity },
  { to: '/farmer/earnings', label: 'Earnings', icon: Wallet },
  { to: '/farmer/notifications', label: 'Alerts', icon: Bell },
  { to: '/farmer/profile', label: 'Profile', icon: User },
]

export default function FarmerLayout() {
  const { session, logout } = useAuth()

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
        <div>
          <p className="text-base font-semibold text-ink">Namaste, {session?.name?.split(' ')[0]}</p>
          <p className="text-xs text-ink-faint">{session?.flcId} · {session?.org?.split('·')[1] || 'Pugal'}</p>
        </div>
        <button onClick={logout} aria-label="Log out" className="flex h-9 w-9 items-center justify-center rounded-full border border-line">
          <LogOut className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
        </button>
      </header>

      <main className="mx-auto max-w-md px-4 py-5 pb-24">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md justify-around border-t border-line bg-white py-2.5">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-[11px] ${
                isActive ? 'text-sun-600' : 'text-ink-faint'
              }`
            }
          >
            <item.icon className="h-5 w-5" strokeWidth={1.75} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
