import { create } from 'zustand'
import type { LyricVariation, ToplineData, ReferenceFlow } from '@/types'
import { mockLyricVariations, mockToplineData } from '@/mock-data/lyrics'

interface LyricsState {
  engineeredSong: File | null
  engineeredSongName: string | null
  referenceSheet: string | null
  referenceSheetName: string | null
  referenceFlows: ReferenceFlow[]
  blacklist: string[]
  lyricVariations: LyricVariation[]
  selectedLyrics: LyricVariation | null
  editedLyrics: string
  toplineData: ToplineData | null
  isGenerating: boolean
  isToplinePlaying: boolean
  currentToplineTime: number
  blacklistInput: string
  setEngineeredSong: (file: File | null) => void
  setReferenceSheet: (text: string | null, name?: string) => void
  addReferenceFlow: (flow: ReferenceFlow) => void
  removeReferenceFlow: (id: string) => void
  addToBlacklist: (word: string) => void
  removeFromBlacklist: (word: string) => void
  setBlacklistInput: (input: string) => void
  setLyricVariations: (variations: LyricVariation[]) => void
  setSelectedLyrics: (variation: LyricVariation | null) => void
  setEditedLyrics: (text: string) => void
  setToplineData: (data: ToplineData | null) => void
  setIsToplinePlaying: (value: boolean) => void
  setCurrentToplineTime: (time: number) => void
  generateLyrics: () => void
}

export const useLyricsStore = create<LyricsState>((set) => ({
  engineeredSong: null,
  engineeredSongName: null,
  referenceSheet: null,
  referenceSheetName: null,
  referenceFlows: [],
  blacklist: [],
  lyricVariations: [],
  selectedLyrics: null,
  editedLyrics: '',
  toplineData: null,
  isGenerating: false,
  isToplinePlaying: false,
  currentToplineTime: 0,
  blacklistInput: '',
  setEngineeredSong: (file) =>
    set({ engineeredSong: file, engineeredSongName: file?.name ?? null }),
  setReferenceSheet: (text, name) =>
    set({ referenceSheet: text, referenceSheetName: name ?? null }),
  addReferenceFlow: (flow) =>
    set((state) => ({ referenceFlows: [...state.referenceFlows, flow] })),
  removeReferenceFlow: (id) =>
    set((state) => ({ referenceFlows: state.referenceFlows.filter((f) => f.id !== id) })),
  addToBlacklist: (word) =>
    set((state) => ({
      blacklist: state.blacklist.includes(word.toLowerCase())
        ? state.blacklist
        : [...state.blacklist, word.toLowerCase()],
    })),
  removeFromBlacklist: (word) =>
    set((state) => ({ blacklist: state.blacklist.filter((w) => w !== word) })),
  setBlacklistInput: (input) => set({ blacklistInput: input }),
  setLyricVariations: (variations) => set({ lyricVariations: variations }),
  setSelectedLyrics: (variation) =>
    set({ selectedLyrics: variation, editedLyrics: variation?.text ?? '' }),
  setEditedLyrics: (text) => set({ editedLyrics: text }),
  setToplineData: (data) => set({ toplineData: data }),
  setIsToplinePlaying: (value) => set({ isToplinePlaying: value }),
  setCurrentToplineTime: (time) => set({ currentToplineTime: time }),
  generateLyrics: () => {
    set({ isGenerating: true, lyricVariations: [] })
    setTimeout(() => {
      set({
        isGenerating: false,
        lyricVariations: mockLyricVariations,
        toplineData: mockToplineData,
      })
    }, 3000)
  },
}))
