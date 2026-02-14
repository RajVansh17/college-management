import { motion } from 'framer-motion'
import { useState } from 'react'
import EventCard from '@/components/EventCard'

const events = [
  {
    id: 1,
    title: 'HackNight',
    society: 'Tech Society',
    date: 'Feb 18, 6:00 PM',
    venue: 'CS Block, Room 101',
    capacity: 80,
    registered: 72,
    status: 'upcoming' as const,
  },
  {
    id: 2,
    title: 'Cultural Fest',
    society: 'Cultural Club',
    date: 'Feb 22, 4:00 PM',
    venue: 'Main Auditorium',
    capacity: 500,
    registered: 480,
    status: 'upcoming' as const,
  },
  {
    id: 3,
    title: 'Startup Pitch',
    society: 'E-Cell',
    date: 'Feb 14, 2:00 PM',
    venue: 'Incubation Center',
    capacity: 60,
    registered: 60,
    status: 'live' as const,
  },
  {
    id: 4,
    title: 'Football Finals',
    society: 'Sports Association',
    date: 'Feb 25, 3:00 PM',
    venue: 'College Ground',
    capacity: 200,
    registered: 45,
    status: 'upcoming' as const,
  },
  {
    id: 5,
    title: 'Poetry Slam',
    society: 'Literary Society',
    date: 'Feb 10, 5:00 PM',
    venue: 'Library Hall',
    capacity: 50,
    registered: 50,
    status: 'ended' as const,
  },
  {
    id: 6,
    title: 'Photo Walk',
    society: 'Photography Club',
    date: 'Feb 28, 7:00 AM',
    venue: 'Campus & Gardens',
    capacity: 30,
    registered: 28,
    status: 'upcoming' as const,
  },
]

export default function Events() {
  const [filter, setFilter] = useState<string>('all')

  const filtered =
    filter === 'all'
      ? events
      : events.filter((e) => e.status === filter)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Events
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Discover and register for events
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'live', 'ended'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`
                px-4 py-2 rounded-3xl text-sm font-medium capitalize transition-all
                ${
                  filter === f
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-glow-cyan/30'
                    : 'bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-neon-cyan/20'
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
          hidden: {},
        }}
      >
        {filtered.map((event) => (
          <motion.div
            key={event.id}
            layout
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 16 },
            }}
          >
            <EventCard
              title={event.title}
              society={event.society}
              date={event.date}
              venue={event.venue}
              capacity={event.capacity}
              registered={event.registered}
              status={event.status}
            />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 py-12">
          No events in this category.
        </p>
      )}
    </div>
  )
}
