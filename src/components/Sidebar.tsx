import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/societies', icon: Users, label: 'Societies' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/ai', icon: Sparkles, label: 'AI' },
] as const

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  isMobile: boolean
}

export default function Sidebar({ collapsed, onToggle, isMobile }: SidebarProps) {
  if (isMobile) return null

  return (
    <motion.aside
      className={clsx(
        'fixed left-0 top-0 z-40 h-screen flex flex-col',
        'backdrop-blur-xl bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10',
        'shadow-soft dark:shadow-soft-dark'
      )}
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex h-16 items-center px-4 border-b border-white/10 dark:border-white/5 shrink-0">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                SocietyHub
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-9 h-9 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shrink-0 mx-auto"
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-3xl px-4 py-3 transition-all duration-200',
                isActive
                  ? 'bg-neon-cyan/20 dark:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shadow-glow-cyan'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-slate-200'
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="truncate font-medium"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-white/10 dark:border-white/5">
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={clsx(
            'w-full flex items-center justify-center gap-2 rounded-3xl py-3',
            'text-slate-600 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-slate-200 transition-colors'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
