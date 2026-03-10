import { create } from 'zustand'
import type { Module, Theme } from '@/types'

interface AppState {
  currentModule: Module
  sidebarCollapsed: boolean
  rightSidebarOpen: boolean
  commandPaletteOpen: boolean
  theme: Theme
  setCurrentModule: (module: Module) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setRightSidebarOpen: (open: boolean) => void
  setCommandPaletteOpen: (open: boolean) => void
  toggleRightSidebar: () => void
  toggleCommandPalette: () => void
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentModule: 'dashboard',
  sidebarCollapsed: false,
  rightSidebarOpen: false,
  commandPaletteOpen: false,
  theme: 'dark',
  setCurrentModule: (module) => set({ currentModule: module }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setTheme: (theme) => set({ theme }),
}))
