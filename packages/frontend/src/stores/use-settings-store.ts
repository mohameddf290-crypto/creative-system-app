import { create } from 'zustand'
import type { KeyboardShortcut } from '@/types'

const defaultShortcuts: KeyboardShortcut[] = [
  { id: 's-1', label: 'Command Palette', keys: ['⌘', 'K'], action: 'openCommandPalette' },
  { id: 's-2', label: 'Dashboard', keys: ['⌘', '1'], action: 'goToDashboard' },
  { id: 's-3', label: 'SoundMatch', keys: ['⌘', '2'], action: 'goToSoundMatch' },
  { id: 's-4', label: 'Chords', keys: ['⌘', '3'], action: 'goToChords' },
  { id: 's-5', label: 'Melody', keys: ['⌘', '4'], action: 'goToMelody' },
  { id: 's-6', label: 'Lyrics', keys: ['⌘', '5'], action: 'goToLyrics' },
  { id: 's-7', label: 'Engineering', keys: ['⌘', '6'], action: 'goToEngineering' },
  { id: 's-8', label: 'New Song', keys: ['⌘', 'N'], action: 'newSong' },
  { id: 's-9', label: 'Save', keys: ['⌘', 'S'], action: 'save' },
  { id: 's-10', label: 'Undo', keys: ['⌘', 'Z'], action: 'undo' },
  { id: 's-11', label: 'Redo', keys: ['⌘', '⇧', 'Z'], action: 'redo' },
  { id: 's-12', label: 'Play/Pause', keys: ['Space'], action: 'playPause' },
  { id: 's-13', label: 'Toggle Right Sidebar', keys: ['Tab'], action: 'toggleRightSidebar' },
]

interface SettingsState {
  apiKey: string
  driveConnected: boolean
  storagePath: string
  shortcuts: KeyboardShortcut[]
  darkMode: boolean
  trackingEnabled: boolean
  setApiKey: (key: string) => void
  setDriveConnected: (connected: boolean) => void
  setStoragePath: (path: string) => void
  updateShortcut: (id: string, keys: string[]) => void
  setDarkMode: (dark: boolean) => void
  setTrackingEnabled: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  apiKey: '',
  driveConnected: false,
  storagePath: '~/Documents/StarPlatinum',
  shortcuts: defaultShortcuts,
  darkMode: true,
  trackingEnabled: false,
  setApiKey: (key) => set({ apiKey: key }),
  setDriveConnected: (connected) => set({ driveConnected: connected }),
  setStoragePath: (path) => set({ storagePath: path }),
  updateShortcut: (id, keys) =>
    set((state) => ({
      shortcuts: state.shortcuts.map((s) => (s.id === id ? { ...s, keys } : s)),
    })),
  setDarkMode: (dark) => set({ darkMode: dark }),
  setTrackingEnabled: (enabled) => set({ trackingEnabled: enabled }),
}))
