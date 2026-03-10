import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Music, Settings, FolderOpen, Volume2, Piano, Mic2, Sliders } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@/stores/use-app-store'
import { cn } from '@/utils'
import type { Module } from '@/types'

interface Command {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  action: () => void
  category: string
}

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, setCurrentModule } = useAppStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const navigateTo = (mod: Module) => {
    setCurrentModule(mod)
    setCommandPaletteOpen(false)
    setQuery('')
  }

  const commands: Command[] = [
    { id: 'go-dashboard', label: 'Dashboard', description: 'Go to home', icon: <Music size={16} />, action: () => navigateTo('dashboard'), category: 'Navigate' },
    { id: 'go-soundmatch', label: 'SoundMatch', description: 'Sound inspiration engine', icon: <Volume2 size={16} />, action: () => navigateTo('sound-match'), category: 'Navigate' },
    { id: 'go-chords', label: 'Chords', description: 'Harmonic analysis', icon: <Piano size={16} />, action: () => navigateTo('chords'), category: 'Navigate' },
    { id: 'go-melody', label: 'Melody', description: 'Melody generation', icon: <Music size={16} />, action: () => navigateTo('melody'), category: 'Navigate' },
    { id: 'go-lyrics', label: 'Lyrics & Topline', description: 'Rap writing system', icon: <Mic2 size={16} />, action: () => navigateTo('lyrics'), category: 'Navigate' },
    { id: 'go-engineering', label: 'Engineering', description: 'Mixing roadmap', icon: <Sliders size={16} />, action: () => navigateTo('engineering'), category: 'Navigate' },
    { id: 'go-projects', label: 'Projects', description: 'Song management', icon: <FolderOpen size={16} />, action: () => navigateTo('projects'), category: 'Navigate' },
    { id: 'go-settings', label: 'Settings', description: 'App settings', icon: <Settings size={16} />, action: () => navigateTo('settings'), category: 'Navigate' },
  ]

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : commands

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [commandPaletteOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!commandPaletteOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        filtered[selectedIndex]?.action()
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [commandPaletteOpen, filtered, selectedIndex, setCommandPaletteOpen])

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2"
          >
            <div className="backdrop-blur-2xl bg-[#141414]/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={18} className="text-white/40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or jump to..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-base"
                />
                <kbd className="text-xs text-white/30 bg-white/8 px-2 py-1 rounded-md">ESC</kbd>
              </div>

              {/* Commands */}
              <div className="py-2 max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm text-white/30 py-6">No results found</p>
                ) : (
                  filtered.map((cmd, idx) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                        idx === selectedIndex ? 'bg-[#0a84ff]/20 text-[#0a84ff]' : 'hover:bg-white/5 text-white/80',
                      )}
                    >
                      <span className={cn(idx === selectedIndex ? 'text-[#0a84ff]' : 'text-white/40')}>
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{cmd.label}</p>
                        {cmd.description && (
                          <p className="text-xs text-white/40">{cmd.description}</p>
                        )}
                      </div>
                      <ArrowRight size={14} className="text-white/20 flex-shrink-0" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
