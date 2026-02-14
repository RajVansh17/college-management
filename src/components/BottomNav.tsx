import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, Sparkles } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/societies', icon: Users, label: 'Societies' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/ai', icon: Sparkles, label: 'AI' },
] as const

export default function BottomNav() {
  return (
    <nav
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-40 md:hidden',
        'backdrop-blur-xl bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/10',
        'safe-area-pb'
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-3xl transition-all duration-200 min-w-0',
                isActive
                  ? 'text-neon-cyan'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              )
            }
          >
            <Icon className="w-6 h-6 shrink-0" />
            <span className="text-xs font-medium truncate w-full text-center">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
