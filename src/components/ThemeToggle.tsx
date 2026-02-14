import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import clsx from 'clsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={clsx(
        'relative w-14 h-14 rounded-3xl flex items-center justify-center overflow-hidden',
        'backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
        'hover:shadow-glow-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan transition-shadow duration-300'
      )}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 0 : 360,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {/* Sun: visible in light mode, "sets" in dark (rotate + opacity) */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            y: isDark ? 20 : 0,
            rotate: isDark ? -90 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Sun className="w-6 h-6 text-amber-400" strokeWidth={2} />
        </motion.div>

        {/* Moon: visible in dark mode, "rises" from below */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -20,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Moon className="w-6 h-6 text-slate-200" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </button>
  )
}
