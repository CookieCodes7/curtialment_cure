import { NavLink } from 'react-router-dom'
import { Sun } from 'lucide-react'

export default function Sidebar({ items, dark = false }) {
  const base = dark
    ? 'bg-ink text-paper/70 border-ink'
    : 'bg-paper-dim text-ink-soft border-line'
  const activeClass = dark
    ? 'bg-white/10 text-white'
    : 'bg-white text-ink shadow-sm'
  const accent = dark ? 'text-teal-200' : 'text-sun-600'

  return (
    <aside className={`hidden w-56 shrink-0 flex-col border-r px-3 py-5 md:flex ${base}`}>
      <div className="mb-6 flex items-center gap-2 px-2">
        <Sun className={`h-5 w-5 ${accent}`} strokeWidth={1.75} />
        <span className={`font-semibold ${dark ? 'text-white' : 'text-ink'}`}>YuvaSetu</span>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive ? activeClass : 'hover:bg-white/5'
              }`
            }
          >
            <item.icon className="h-4 w-4" strokeWidth={1.75} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
