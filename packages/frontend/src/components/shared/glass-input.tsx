import { cn } from '@/utils'
import type { InputHTMLAttributes } from 'react'

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function GlassInput({ label, error, className, ...props }: GlassInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <input
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl',
          'px-4 py-2.5 text-sm text-white placeholder-white/30',
          'outline-none focus:border-[#0a84ff]/50 focus:ring-1 focus:ring-[#0a84ff]/30',
          'transition-all duration-200',
          error && 'border-[#ff453a]/50',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-[#ff453a]">{error}</p>}
    </div>
  )
}

interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function GlassTextarea({ label, className, ...props }: GlassTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white/70">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl',
          'px-4 py-2.5 text-sm text-white placeholder-white/30',
          'outline-none focus:border-[#0a84ff]/50 focus:ring-1 focus:ring-[#0a84ff]/30',
          'transition-all duration-200 resize-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}
