import { motion } from 'framer-motion'
import { Calendar, MapPin, Users } from 'lucide-react'
import clsx from 'clsx'

type EventStatus = 'upcoming' | 'live' | 'ended' | 'cancelled'

interface EventCardProps {
  title: string
  society: string
  date: string
  venue: string
  capacity: number
  registered: number
  status: EventStatus
}

const statusConfig: Record<
  EventStatus,
  { label: string; className: string; pulse?: boolean }
> = {
  upcoming: {
    label: 'Upcoming',
    className: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
    pulse: false,
  },
  live: {
    label: 'Live',
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pulse: true,
  },
  ended: {
    label: 'Ended',
    className: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    pulse: false,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
    pulse: false,
  },
}

export default function EventCard({
  title,
  society,
  date,
  venue,
  capacity,
  registered,
  status,
}: EventCardProps) {
  const percent = capacity > 0 ? Math.min((registered / capacity) * 100, 100) : 0
  const config = statusConfig[status]

  return (
    <motion.div
      className={clsx(
        'rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
        'p-6 shadow-soft dark:shadow-soft-dark',
        'hover:shadow-glow-purple/30 dark:hover:shadow-glow-purple/20 hover:border-neon-purple/30',
        'transition-all duration-300'
      )}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 truncate">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{society}</p>
        </div>
        <span
          className={clsx(
            'shrink-0 text-xs font-medium px-3 py-1 rounded-full border',
            config.className,
            config.pulse && 'animate-pulse'
          )}
        >
          {config.label}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 shrink-0 text-neon-purple" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0 text-neon-cyan" />
          <span className="truncate">{venue}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Users className="w-3.5 h-3.5" />
            Capacity
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {registered} / {capacity}
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/20 dark:bg-black/20 overflow-hidden">
          <motion.div
            className={clsx(
              'h-full rounded-full',
              percent >= 90 ? 'bg-red-400' : percent >= 70 ? 'bg-amber-400' : 'bg-neon-cyan'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
