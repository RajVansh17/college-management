import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'
import SocietyCard from '@/components/SocietyCard'

const societies = [
  {
    id: 1,
    name: 'Tech Society',
    category: 'Tech',
    members: 320,
    description: 'Coding workshops, hackathons, and tech talks for aspiring developers.',
  },
  {
    id: 2,
    name: 'Cultural Club',
    category: 'Cultural',
    members: 280,
    description: 'Dance, music, drama and cultural festivals throughout the year.',
  },
  {
    id: 3,
    name: 'Sports Association',
    category: 'Sports',
    members: 450,
    description: 'Football, cricket, basketball and fitness events for everyone.',
  },
  {
    id: 4,
    name: 'Literary Society',
    category: 'Literary',
    members: 120,
    description: 'Poetry slams, creative writing and book clubs.',
  },
  {
    id: 5,
    name: 'Photography Club',
    category: 'Arts',
    members: 95,
    description: 'Photo walks, exhibitions and editing workshops.',
  },
  {
    id: 6,
    name: 'Entrepreneurship Cell',
    category: 'Tech',
    members: 180,
    description: 'Startup talks, pitch competitions and mentorship.',
  },
]

export default function Societies() {
  const [query, setQuery] = useState('')

  const filtered = societies.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Societies
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Browse and join college societies
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="search"
            placeholder="Search societies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-3xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
          />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.06 },
          },
          hidden: {},
        }}
      >
        {filtered.map((society) => (
          <motion.div
            key={society.id}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
          >
            <SocietyCard
              name={society.name}
              category={society.category}
              members={society.members}
              description={society.description}
            />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 py-12">
          No societies match your search.
        </p>
      )}
    </div>
  )
}
