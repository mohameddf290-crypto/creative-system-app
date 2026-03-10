import { motion } from 'framer-motion'
import { cn } from '@/utils'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  selected?: boolean
  animate?: boolean
}

export function GlassCard({
  children,
  className,
  onClick,
  hoverable = false,
  selected = false,
  animate = true,
}: GlassCardProps) {
  const base =
    'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl transition-all duration-200'
  const hover = hoverable ? 'hover:bg-white/8 hover:border-white/20 cursor-pointer' : ''
  const sel = selected ? 'border-[#0a84ff]/60 bg-[#0a84ff]/10' : ''

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(base, hover, sel, className)}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cn(base, hover, sel, className)} onClick={onClick}>
      {children}
    </div>
  )
}
