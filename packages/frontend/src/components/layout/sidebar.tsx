import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Volume2,
  Piano,
  Music,
  Mic2,
  Sliders,
  FolderOpen,
  Settings,
  Star,
  ChevronLeft,
} from 'lucide-react'
import { useAppStore } from '@/stores/use-app-store'
import { useSongStore } from '@/stores/use-song-store'
import { cn } from '@/utils'
import type { Module } from '@/types'

const modules: { id: Module; label: string; icon: React.ReactNode; emoji: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, emoji: '🏠' },
  { id: 'sound-match', label: 'SoundMatch', icon: <Volume2 size={18} />, emoji: '🔊' },
  { id: 'chords', label: 'Chords', icon: <Piano size={18} />, emoji: '🎹' },
  { id: 'melody', label: 'Melody', icon: <Music size={18} />, emoji: '🎵' },
  { id: 'lyrics', label: 'Lyrics & Topline', icon: <Mic2 size={18} />, emoji: '✍️' },
  { id: 'engineering', label: 'Engineering', icon: <Sliders size={18} />, emoji: '🎛️' },
  { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} />, emoji: '📁' },
  { id: 'settings', label: 'Settings', icon: <Settings size={18} />, emoji: '⚙️' },
]

export function Sidebar() {
  const { currentModule, setCurrentModule, sidebarCollapsed, setSidebarCollapsed } = useAppStore()
  const { activeSong } = useSongStore()

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 68 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full backdrop-blur-xl bg-white/3 border-r border-white/8 overflow-hidden flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#0a84ff] to-[#bf5af2] flex items-center justify-center">
          <Star size={16} className="text-white" fill="white" />
        </div>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm font-bold text-white">Star Platinum</p>
            <p className="text-xs text-white/40 truncate">
              {activeSong?.name ?? 'No song selected'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {modules.map((mod) => {
          const isActive = currentModule === mod.id
          return (
            <button
              key={mod.id}
              onClick={() => setCurrentModule(mod.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5',
                'transition-all duration-150 text-left',
                isActive
                  ? 'bg-[#0a84ff]/20 text-[#0a84ff] border border-[#0a84ff]/30'
                  : 'text-white/60 hover:text-white hover:bg-white/8',
              )}
            >
              <span className="flex-shrink-0">{mod.icon}</span>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium truncate"
                >
                  {mod.label}
                </motion.span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/15 flex items-center justify-center hover:bg-[#252525] transition-colors z-10"
      >
        <ChevronLeft
          size={12}
          className={cn('text-white/60 transition-transform', sidebarCollapsed && 'rotate-180')}
        />
      </button>
    </motion.aside>
  )
}
