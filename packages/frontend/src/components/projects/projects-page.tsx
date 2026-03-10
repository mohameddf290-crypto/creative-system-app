import { motion } from 'framer-motion'
import { Search, Plus, Music, Clock, Filter } from 'lucide-react'
import { useState } from 'react'
import { useSongStore } from '@/stores/use-song-store'
import { useAppStore } from '@/stores/use-app-store'
import { GlassCard } from '@/components/shared/glass-card'
import { GlassButton } from '@/components/shared/glass-button'
import { StatusBadge, Badge } from '@/components/shared/badge'
import { formatRelativeDate } from '@/utils'
import type { SongStatus } from '@/types'

const STATUS_FILTERS: { label: string; value: SongStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Complete', value: 'complete' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Abandoned', value: 'abandoned' },
]

export function ProjectsPage() {
  const { songs, searchQuery, setSearchQuery, activeSong, setActiveSong } = useSongStore()
  const { setCurrentModule } = useAppStore()
  const [statusFilter, setStatusFilter] = useState<SongStatus | 'all'>('all')

  const filtered = songs.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.key && s.key.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.genre && s.genre.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Projects</h2>
          <p className="text-sm text-white/50 mt-1">{songs.length} songs total</p>
        </div>
        <GlassButton variant="primary" size="md">
          <Plus size={14} /> New Song
        </GlassButton>
      </motion.div>

      {/* Search + filter */}
      <GlassCard className="p-4" animate>
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search size={16} className="text-white/30 flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, key, genre..."
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
          <GlassButton variant="ghost" size="md">
            <Filter size={16} />
          </GlassButton>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === f.value
                  ? 'bg-[#0a84ff]/30 border border-[#0a84ff]/60 text-[#0a84ff]'
                  : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Song list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/30 text-sm">No songs match your search</p>
          </div>
        ) : (
          filtered.map((song) => (
            <GlassCard
              key={song.id}
              hoverable
              selected={activeSong?.id === song.id}
              className="p-4"
              onClick={() => setActiveSong(song)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a84ff]/20 to-[#bf5af2]/20 flex items-center justify-center flex-shrink-0">
                  <Music size={20} className="text-white/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-white">{song.name}</p>
                    <StatusBadge status={song.status} />
                    {song.tags?.map((tag) => (
                      <Badge key={tag.id} variant="default" size="sm">{tag.name}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                    {song.bpm && <span>{song.bpm} BPM</span>}
                    {song.key && <span>· {song.key}</span>}
                    {song.genre && <span>· {song.genre}</span>}
                    {song.currentPhase && <span>· {song.currentPhase} phase</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Clock size={12} />
                    {formatRelativeDate(song.updatedAt)}
                  </div>
                  <GlassButton
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveSong(song)
                      setCurrentModule('dashboard')
                    }}
                  >
                    Open
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  )
}
