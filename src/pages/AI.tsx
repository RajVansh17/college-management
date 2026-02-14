import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageCircle } from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import { useState } from 'react'
import clsx from 'clsx'

const recommendations = [
  {
    id: 1,
    title: 'Join Tech Society',
    reason: 'Based on your interest in coding and hackathons.',
    score: 92,
  },
  {
    id: 2,
    title: 'Register for HackNight',
    reason: 'Fits your schedule and skill level.',
    score: 88,
  },
  {
    id: 3,
    title: 'Try Cultural Club',
    reason: 'You might enjoy dance and music events.',
    score: 75,
  },
]

export default function AI() {
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-neon-cyan" />
          AI Recommendations
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Personalized society and event suggestions
        </p>
      </div>

      <GlassCard className="p-8 relative overflow-hidden">
        {/* Sparkle animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-neon-cyan/60"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`p-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-neon-purple/60"
              style={{
                right: `${10 + i * 20}%`,
                bottom: `${15 + (i % 2) * 30}%`,
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.5 + i * 0.15,
              }}
            />
          ))}
        </div>

        <div className="relative">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
            Your personalized recommendations
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Powered by your activity and preferences
          </p>

          <ul className="space-y-4">
            {recommendations.map((rec, i) => (
              <motion.li
                key={rec.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={clsx(
                  'flex items-center justify-between gap-4 p-4 rounded-3xl',
                  'bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5',
                  'hover:bg-white/10 dark:hover:bg-black/10 hover:border-neon-cyan/20 transition-colors'
                )}
              >
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{rec.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{rec.reason}</p>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-neon-cyan/20 dark:bg-neon-cyan/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-neon-cyan">{rec.score}</span>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.button
            type="button"
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 1500)
            }}
            disabled={loading}
            className="mt-6 px-6 py-3 rounded-3xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-semibold shadow-glow-cyan hover:shadow-glow-cyan-lg transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Refreshing...' : 'Refresh recommendations'}
          </motion.button>
        </div>
      </GlassCard>

      {/* Floating chatbot button */}
      <motion.div
        className="fixed bottom-24 right-6 z-50 md:bottom-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-neon-cyan/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.button
          type="button"
          onClick={() => setChatOpen((o) => !o)}
          className={clsx(
            'relative w-14 h-14 rounded-full flex items-center justify-center',
            'bg-gradient-to-br from-neon-cyan to-neon-purple text-white',
            'shadow-glow-cyan hover:shadow-glow-cyan-lg border-2 border-white/20',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
          )}
          animate={{ y: [0, -6, 0] }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI chat"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={clsx(
            'fixed bottom-36 right-6 z-50 w-80 md:bottom-24 md:right-8 md:w-96',
            'rounded-3xl overflow-hidden',
            'backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-white/20 dark:border-white/10',
            'shadow-soft dark:shadow-soft-dark'
          )}
        >
          <div className="p-4 border-b border-white/10 dark:border-white/5 flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              AI Assistant
            </span>
            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="p-1 rounded-xl hover:bg-white/10 text-slate-500"
            >
              ×
            </button>
          </div>
          <div className="p-4 h-64 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
            Chat coming soon. Ask me about societies and events!
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
