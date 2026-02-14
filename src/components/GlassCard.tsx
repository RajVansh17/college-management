import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        'rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
        'shadow-soft dark:shadow-soft-dark',
        hover && 'hover:shadow-glow-cyan/50 dark:hover:shadow-glow-cyan/30 hover:border-neon-cyan/30',
        'transition-shadow duration-300',
        className
      )}
      whileHover={hover ? { scale: 1.03, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
