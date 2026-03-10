import { motion } from 'framer-motion'
import { Plus, TrendingUp, Music, CheckCircle2, ArrowRight, Clock } from 'lucide-react'
import { useSongStore } from '@/stores/use-song-store'
import { useAppStore } from '@/stores/use-app-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { StatusBadge } from '@/components/shared/badge'
import { formatRelativeDate } from '@/utils'

const phaseLabels: Record<string, string> = {
  'sound-match': 'SoundMatch',
  chords: 'Chords',
  melody: 'Melody',
  lyrics: 'Lyrics',
  engineering: 'Engineering',
}

export function DashboardPage() {
  const { songs, activeSong, setActiveSong } = useSongStore()
  const { setCurrentModule } = useAppStore()

  const inProgress = songs.filter((s) => s.status === 'in_progress').length
  const completed = songs.filter((s) => s.status === 'complete').length
  const recentSongs = [...songs].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )

  const nextAction = activeSong
    ? `Continue "${activeSong.name}" — ${phaseLabels[activeSong.currentPhase ?? ''] ?? 'Setup'} phase`
    : 'Create your first song to get started'

  return (
    <div className="p-6 space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <h2 className="text-3xl font-bold text-white">
          Star Platinum{' '}
          <span className="text-2xl">⭐</span>
        </h2>
        <p className="text-white/50 mt-1">Your creative intelligence system. Let's build something great.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Songs In Progress', value: inProgress, icon: <Music size={20} />, color: '#0a84ff' },
          { label: 'Completed', value: completed, icon: <CheckCircle2 size={20} />, color: '#32d74b' },
          { label: 'Total Songs', value: songs.length, icon: <TrendingUp size={20} />, color: '#bf5af2' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-4" animate>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* What's Next */}
      <GlassCard className="p-5" animate>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-[#0a84ff] uppercase tracking-wider mb-2">What's Next</p>
            <p className="text-white font-medium">{nextAction}</p>
            {activeSong && (
              <p className="text-sm text-white/50 mt-1">
                {activeSong.bpm} BPM · {activeSong.key}
              </p>
            )}
          </div>
          {activeSong && (
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => activeSong.currentPhase && setCurrentModule(activeSong.currentPhase as never)}
            >
              Continue <ArrowRight size={14} />
            </GlassButton>
          )}
        </div>
      </GlassCard>

      {/* Recent Songs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Songs</h3>
          <div className="flex gap-2">
            <GlassButton variant="ghost" size="sm" onClick={() => setCurrentModule('projects')}>
              View All
            </GlassButton>
            <GlassButton variant="primary" size="sm">
              <Plus size={14} /> New Song
            </GlassButton>
          </div>
        </div>
        <div className="space-y-2">
          {recentSongs.slice(0, 5).map((song) => (
            <GlassCard
              key={song.id}
              hoverable
              selected={activeSong?.id === song.id}
              onClick={() => setActiveSong(song)}
              className="p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a84ff]/30 to-[#bf5af2]/30 flex items-center justify-center flex-shrink-0">
                  <Music size={18} className="text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{song.name}</p>
                    <StatusBadge status={song.status} />
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">
                    {song.bpm && `${song.bpm} BPM`}
                    {song.key && ` · ${song.key}`}
                    {song.currentPhase && ` · ${phaseLabels[song.currentPhase] ?? song.currentPhase}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30 flex-shrink-0">
                  <Clock size={12} />
                  {formatRelativeDate(song.updatedAt)}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
