import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  suffix?: string
  icon: LucideIcon
  trend?: { value: number; up: boolean }
  delay?: number
  className?: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function StatCard({
  title,
  value,
  suffix = '',
  icon: Icon,
  trend,
  delay = 0,
  className,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start: number
    const duration = 1200
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start - delay
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setDisplayValue(Math.floor(value * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={clsx(
        'rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
        'p-6 shadow-soft dark:shadow-soft-dark',
        'hover:shadow-glow-cyan/30 dark:hover:shadow-glow-cyan/20 hover:border-neon-cyan/20',
        'transition-all duration-300',
        className
      )}
      whileHover={{ scale: 1.03, y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
            {displayValue.toLocaleString()}
            {suffix}
          </p>
          {trend && (
            <p
              className={clsx(
                'mt-1 text-sm font-medium',
                trend.up ? 'text-emerald-500' : 'text-red-500'
              )}
            >
              {trend.up ? '↑' : '↓'} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        <div className="rounded-2xl bg-neon-cyan/10 dark:bg-neon-cyan/20 p-3">
          <Icon className="w-6 h-6 text-neon-cyan" />
        </div>
      </div>
    </motion.div>
  )
}
