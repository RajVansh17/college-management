import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Users } from 'lucide-react'
import clsx from 'clsx'

interface SocietyCardProps {
  name: string
  category: string
  members: number
  description: string
  image?: string
}

export default function SocietyCard({
  name,
  category,
  members,
  description,
}: SocietyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovering(false)
  }

  const handleMouseEnter = () => setIsHovering(true)

  return (
    <div ref={cardRef} style={{ perspective: '1000px' }} className="cursor-pointer">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={clsx(
          'rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
          'p-6 shadow-soft dark:shadow-soft-dark',
        'transition-shadow duration-300',
          isHovering && 'shadow-glow-cyan/30 dark:shadow-glow-cyan/20 border-neon-cyan/30'
        )}
        whileHover={{ scale: 1.03, z: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
      <div style={{ transform: 'translateZ(20px)' }} className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold text-xl shrink-0">
            {name.charAt(0)}
          </div>
          <span
            className={clsx(
              'text-xs font-medium px-3 py-1 rounded-full',
              'bg-neon-cyan/20 dark:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
            )}
          >
            {category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">{name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {members} members
          </span>
        </div>
      </div>
      </motion.div>
    </div>
  )
}
