import { cn } from '@/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'yellow'
  size?: 'sm' | 'md'
}

const variantMap = {
  default: 'bg-white/10 text-white/70',
  blue: 'bg-[#0a84ff]/20 text-[#0a84ff]',
  green: 'bg-[#32d74b]/20 text-[#32d74b]',
  red: 'bg-[#ff453a]/20 text-[#ff453a]',
  purple: 'bg-[#bf5af2]/20 text-[#bf5af2]',
  orange: 'bg-[#ff9f0a]/20 text-[#ff9f0a]',
  yellow: 'bg-[#ffd60a]/20 text-[#ffd60a]',
}

const sizeMap = {
  sm: 'text-xs px-2 py-0.5 rounded-md',
  md: 'text-xs px-2.5 py-1 rounded-lg',
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center font-medium', variantMap[variant], sizeMap[size])}>
      {children}
    </span>
  )
}

interface StatusBadgeProps {
  status: 'in_progress' | 'complete' | 'on_hold' | 'abandoned'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    in_progress: { label: 'In Progress', variant: 'blue' as const },
    complete: { label: 'Complete', variant: 'green' as const },
    on_hold: { label: 'On Hold', variant: 'orange' as const },
    abandoned: { label: 'Abandoned', variant: 'red' as const },
  }
  const { label, variant } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}
