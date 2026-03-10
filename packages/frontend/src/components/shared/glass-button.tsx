import { motion } from 'framer-motion'
import { cn } from '@/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'default' | 'primary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const variantStyles = {
  default: 'bg-white/8 border-white/15 hover:bg-white/12 hover:border-white/25 text-white/90',
  primary:
    'bg-[#0a84ff]/20 border-[#0a84ff]/40 hover:bg-[#0a84ff]/30 hover:border-[#0a84ff]/60 text-[#0a84ff]',
  danger:
    'bg-[#ff453a]/20 border-[#ff453a]/40 hover:bg-[#ff453a]/30 hover:border-[#ff453a]/60 text-[#ff453a]',
  success:
    'bg-[#32d74b]/20 border-[#32d74b]/40 hover:bg-[#32d74b]/30 hover:border-[#32d74b]/60 text-[#32d74b]',
  ghost: 'bg-transparent border-transparent hover:bg-white/8 text-white/70 hover:text-white',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
}

export function GlassButton({
  children,
  variant = 'default',
  size = 'md',
  isLoading,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'backdrop-blur-xl border font-medium transition-all duration-200',
        'inline-flex items-center justify-center',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled ?? isLoading}
      {...(props as object)}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </motion.button>
  )
}
