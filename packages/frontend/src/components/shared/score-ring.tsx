interface ScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function ScoreRing({
  score,
  size = 64,
  strokeWidth = 5,
  color = '#0a84ff',
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
        >
          {score}%
        </span>
      </div>
      {label && <span className="text-xs text-white/50">{label}</span>}
    </div>
  )
}
