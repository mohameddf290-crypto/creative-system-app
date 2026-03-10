import { create } from 'zustand'
import type { ChatMessage, Module } from '@/types'

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "I'm here to help you craft something great. What are you working on right now? I can assist with sound design, chord theory, melody ideas, lyrics, or mixing decisions.",
  'sound-match':
    "I'll analyze that reference track for you. The key is finding the tonal character — brightness, warmth, and spatial width — rather than trying to copy it note-for-note. What aspect of the sound interests you most?",
  chords:
    'Looking at the chord analysis, the Dorian mode interpretation has the strongest confidence. The raised 6th degree is the signature — it gives that simultaneously minor and major feeling. Want me to suggest some reharmonisation options?',
  melody:
    "For this chord progression, I'd recommend an arch contour — start lower, peak around bar 3, then resolve down. The Dorian harmony wants a melody that hints at the raised 6th without overplaying it.",
  lyrics:
    "Keep the imagery concrete and specific — avoid metaphors that could apply to anyone. 'The corner of 5th and Main' hits harder than 'the place where everything changed'. What's the central feeling you're chasing in these bars?",
  engineering:
    'The kick needs more separation from the 808. I suggest sidechain compression with a 0.5ms attack and 200ms release — this creates the breathing dynamic that defines the genre. Check Phase 1 instructions for the exact parameters.',
}

interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  context: Module | null
  isTyping: boolean
  sendMessage: (content: string) => void
  setIsOpen: (open: boolean) => void
  setContext: (context: Module | null) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hey — I'm your creative copilot. I know this project inside out. Ask me anything about sound design, chords, melody, lyrics, or mixing.",
      timestamp: new Date().toISOString(),
    },
  ],
  isOpen: false,
  context: null,
  isTyping: false,
  sendMessage: (content) => {
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      module: get().context ?? undefined,
    }
    set((state) => ({ messages: [...state.messages, userMessage], isTyping: true }))
    setTimeout(() => {
      const context = get().context
      const response = context
        ? (MOCK_RESPONSES[context] ?? MOCK_RESPONSES.default)
        : MOCK_RESPONSES.default
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        module: context ?? undefined,
      }
      set((state) => ({
        messages: [...state.messages, assistantMessage],
        isTyping: false,
      }))
    }, 1200)
  },
  setIsOpen: (open) => set({ isOpen: open }),
  setContext: (context) => set({ context }),
  clearMessages: () => set({ messages: [] }),
}))
