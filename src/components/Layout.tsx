import { useState, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import BottomNav from '@/components/BottomNav'
import { useSidebar } from '@/hooks/useSidebar'

const sidebarWidth = (collapsed: boolean) => (collapsed ? 80 : 260)

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { collapsed, toggle, isMobile } = useSidebar()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const width = useMemo(() => sidebarWidth(collapsed), [collapsed])

  return (
    <div className="min-h-screen flex">
      <Sidebar
        collapsed={collapsed}
        onToggle={toggle}
        isMobile={isMobile}
      />

      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={clsx(
              'fixed left-0 top-0 z-50 h-full w-[260px]',
              'backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-r border-white/20 dark:border-white/10'
            )}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <span className="font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-2xl hover:bg-white/10"
              >
                ×
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {[
                { to: '/', label: 'Dashboard' },
                { to: '/societies', label: 'Societies' },
                { to: '/events', label: 'Events' },
                { to: '/ai', label: 'AI' },
              ].map(({ to, label }) => (
                <a
                  key={to}
                  href={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-3xl hover:bg-white/10 text-slate-700 dark:text-slate-300"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div
        className="flex-1 flex flex-col min-h-screen transition-[margin-left] duration-300"
        style={{ marginLeft: isMobile ? 0 : width }}
      >
        <Navbar
          sidebarCollapsed={collapsed}
          sidebarWidth={width}
          onMenuClick={() => setMobileMenuOpen((o) => !o)}
        />

        <main className="flex-1 pt-16 pb-20 md:pb-8 px-4 md:px-6">
          <AnimatePresence mode="wait">
            <PageTransition key={useLocation().pathname}>
              {children ?? <Outlet />}
            </PageTransition>
          </AnimatePresence>
        </main>

        {isMobile && <BottomNav />}
      </div>
    </div>
  )
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-[60vh]"
    >
      {children}
    </motion.div>
  )
}

