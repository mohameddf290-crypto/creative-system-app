import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils'
import type { ReactNode } from 'react'
import { GlassButton } from './glass-button'

interface GlassModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: GlassModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
              sizeMap[size],
            )}
          >
            <div
              className={cn(
                'backdrop-blur-xl bg-[#1a1a1a]/90 border border-white/10 rounded-2xl shadow-2xl',
                className,
              )}
            >
              {title && (
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">{title}</h2>
                  <GlassButton variant="ghost" size="sm" onClick={onClose}>
                    <X size={16} />
                  </GlassButton>
                </div>
              )}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
