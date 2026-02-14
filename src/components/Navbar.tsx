import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, ChevronDown, Menu } from 'lucide-react'
import clsx from 'clsx'
import ThemeToggle from '@/components/ThemeToggle'
import { useSidebar } from '@/hooks/useSidebar'

export default function Navbar({
  sidebarCollapsed: _sidebarCollapsed,
  sidebarWidth,
  onMenuClick,
}: {
  sidebarCollapsed: boolean
  sidebarWidth: number
  onMenuClick: () => void
}) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const profileRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useSidebar()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 z-30 h-16 flex items-center px-4 md:px-6',
        'backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10',
        'transition-[left] duration-300 ease-in-out'
      )}
      style={{ left: isMobile ? 0 : sidebarWidth }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* Mobile menu + Logo (mobile) */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Open menu"
              className="p-2 rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          {isMobile && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-100">SocietyHub</span>
            </Link>
          )}
        </div>

        {/* Search (desktop) */}
        {!isMobile && (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search societies, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx(
                  'w-full pl-12 pr-4 py-2.5 rounded-3xl',
                  'bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
                  'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50',
                  'transition-all duration-200'
                )}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className={clsx(
              'relative p-2.5 rounded-3xl',
              'backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
              'hover:shadow-glow-cyan transition-shadow duration-300'
            )}
          >
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className={clsx(
                'flex items-center gap-2 pl-2 pr-3 py-2 rounded-3xl',
                'backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
                'hover:shadow-soft dark:hover:shadow-soft-dark transition-shadow'
              )}
            >
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-semibold text-sm">
                JD
              </div>
              {!isMobile && (
                <>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                    John Doe
                  </span>
                  <ChevronDown
                    className={clsx('w-4 h-4 text-slate-500 transition-transform', profileOpen && 'rotate-180')}
                  />
                </>
              )}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className={clsx(
                    'absolute right-0 top-full mt-2 w-56 rounded-3xl overflow-hidden',
                    'backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10',
                    'shadow-soft dark:shadow-soft-dark'
                  )}
                >
                  <div className="p-4 border-b border-white/10 dark:border-white/5">
                    <p className="font-medium text-slate-800 dark:text-slate-100">John Doe</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">john@college.edu</p>
                  </div>
                  <div className="p-2">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 rounded-2xl text-sm text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5"
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 rounded-2xl text-sm text-slate-700 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-white/5"
                    >
                      Settings
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 rounded-2xl text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10"
                    >
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
