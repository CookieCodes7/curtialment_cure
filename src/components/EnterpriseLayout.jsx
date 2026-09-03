import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import DemoModeBadge from './DemoModeBadge.jsx'

export default function EnterpriseLayout({ items, dark, title, subtitle, statusLabel, notifications }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar items={items} dark={dark} />
      <div className="flex min-w-0 flex-1 flex-col pb-14 md:pb-0">
        <Topbar title={title} subtitle={subtitle} statusLabel={statusLabel} notifications={notifications} />
        <main className="flex-1 px-5 py-6 md:px-8">
          <Outlet />
        </main>
        <footer className="hidden px-8 pb-4 md:block">
          <DemoModeBadge />
        </footer>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-line bg-white py-2 md:hidden">
        {items.slice(0, 5).map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] ${
                isActive ? 'text-sun-600' : 'text-ink-faint'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
            {item.label.split(' ')[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
