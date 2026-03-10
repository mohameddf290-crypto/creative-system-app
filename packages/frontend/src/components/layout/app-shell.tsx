import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'
import { ChatPanel } from './chat-panel'
import { CommandPalette } from './command-palette'
import { useAppStore } from '@/stores/use-app-store'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { setCommandPaletteOpen, toggleRightSidebar } = useAppStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey
      if (isMeta && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      if (e.key === 'Tab' && !e.shiftKey && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        toggleRightSidebar()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setCommandPaletteOpen, toggleRightSidebar])

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f7] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <ChatPanel />
      <CommandPalette />
    </div>
  )
}
