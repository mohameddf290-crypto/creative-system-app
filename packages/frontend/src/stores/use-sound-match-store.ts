import { create } from 'zustand'
import type { AudioAnalysis, PresetMatch, ModificationStep } from '@/types'
import { mockAudioAnalysis, mockPresetMatches } from '@/mock-data/sound-match'

interface ModificationHistoryEntry {
  presetId: string
  attempt: number
  score: number
  timestamp: string
}

interface SoundMatchState {
  referenceAudio: File | null
  referenceAudioName: string | null
  analysisResult: AudioAnalysis | null
  presetMatches: PresetMatch[]
  selectedMatch: PresetMatch | null
  modificationHistory: ModificationHistoryEntry[]
  isAnalyzing: boolean
  showModificationPanel: boolean
  setReferenceAudio: (file: File | null) => void
  setAnalysisResult: (result: AudioAnalysis | null) => void
  setPresetMatches: (matches: PresetMatch[]) => void
  setSelectedMatch: (match: PresetMatch | null) => void
  addModificationHistory: (entry: ModificationHistoryEntry) => void
  setIsAnalyzing: (value: boolean) => void
  setShowModificationPanel: (show: boolean) => void
  runMockAnalysis: () => void
}

export const useSoundMatchStore = create<SoundMatchState>((set) => ({
  referenceAudio: null,
  referenceAudioName: null,
  analysisResult: null,
  presetMatches: [],
  selectedMatch: null,
  modificationHistory: [],
  isAnalyzing: false,
  showModificationPanel: false,
  setReferenceAudio: (file) =>
    set({ referenceAudio: file, referenceAudioName: file?.name ?? null }),
  setAnalysisResult: (result) => set({ analysisResult: result }),
  setPresetMatches: (matches) => set({ presetMatches: matches }),
  setSelectedMatch: (match) => set({ selectedMatch: match, showModificationPanel: !!match }),
  addModificationHistory: (entry) =>
    set((state) => ({ modificationHistory: [...state.modificationHistory, entry] })),
  setIsAnalyzing: (value) => set({ isAnalyzing: value }),
  setShowModificationPanel: (show) => set({ showModificationPanel: show }),
  runMockAnalysis: () => {
    set({ isAnalyzing: true })
    setTimeout(() => {
      set({
        isAnalyzing: false,
        analysisResult: mockAudioAnalysis,
        presetMatches: mockPresetMatches,
      })
    }, 2200)
  },
}))

// Re-export for convenience
export type { ModificationStep }
