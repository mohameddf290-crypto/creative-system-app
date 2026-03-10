import { Search, MessageSquare, Bell, Plus } from 'lucide-react'
import { useAppStore } from '@/stores/use-app-store'
import { useSongStore } from '@/stores/use-song-store'
import { useChatStore } from '@/stores/use-chat-store'
import { GlassButton } from '@/components/shared/glass-button'
import { StatusBadge } from '@/components/shared/badge'

const moduleTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'sound-match': 'SoundMatch',
  chords: 'Chords',
  melody: 'Melody',
  lyrics: 'Lyrics & Topline',
  engineering: 'Engineering',
  projects: 'Projects',
  settings: 'Settings',
}

export function TopBar() {
  const { currentModule, setCommandPaletteOpen, toggleRightSidebar } = useAppStore()
  const { activeSong } = useSongStore()
  const { setIsOpen } = useChatStore()

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 backdrop-blur-xl bg-white/3 flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-white">{moduleTitles[currentModule]}</h1>
        {activeSong && currentModule !== 'settings' && currentModule !== 'projects' && (
          <div className="flex items-center gap-2">
            <span className="text-white/30">·</span>
            <span className="text-sm text-white/50">{activeSong.name}</span>
            <StatusBadge status={activeSong.status} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
        >
          <Search size={14} className="text-white/40" />
          <span className="text-xs text-white/40">Search...</span>
          <kbd className="text-xs text-white/30 bg-white/10 px-1.5 py-0.5 rounded-md">⌘K</kbd>
        </button>

        <GlassButton
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsOpen(true)
            toggleRightSidebar()
          }}
        >
          <MessageSquare size={16} />
        </GlassButton>

        <GlassButton variant="ghost" size="sm">
          <Bell size={16} />
        </GlassButton>

        <GlassButton variant="primary" size="sm">
          <Plus size={14} />
          New Song
        </GlassButton>
      </div>
    </div>
  )
}
