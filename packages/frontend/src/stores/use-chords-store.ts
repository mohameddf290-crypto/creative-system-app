import { create } from 'zustand'
import type { ChordInterpretation } from '@/types'
import { mockChordInterpretations } from '@/mock-data/chords'

type ViewMode = 'timeline' | 'piano-roll' | 'list'

interface ChordsState {
  audioFile: File | null
  audioFileName: string | null
  bpm: number | null
  key: string | null
  interpretations: ChordInterpretation[]
  selectedInterpretation: ChordInterpretation | null
  viewMode: ViewMode
  isAnalyzing: boolean
  isPlaying: boolean
  currentTime: number
  setBpm: (bpm: number | null) => void
  setKey: (key: string | null) => void
  setAudioFile: (file: File | null) => void
  setInterpretations: (items: ChordInterpretation[]) => void
  setSelectedInterpretation: (item: ChordInterpretation | null) => void
  setViewMode: (mode: ViewMode) => void
  setIsAnalyzing: (value: boolean) => void
  setIsPlaying: (value: boolean) => void
  setCurrentTime: (time: number) => void
  runMockAnalysis: () => void
}

export const useChordsStore = create<ChordsState>((set) => ({
  audioFile: null,
  audioFileName: null,
  bpm: null,
  key: null,
  interpretations: [],
  selectedInterpretation: null,
  viewMode: 'timeline',
  isAnalyzing: false,
  isPlaying: false,
  currentTime: 0,
  setBpm: (bpm) => set({ bpm }),
  setKey: (key) => set({ key }),
  setAudioFile: (file) => set({ audioFile: file, audioFileName: file?.name ?? null }),
  setInterpretations: (items) => set({ interpretations: items }),
  setSelectedInterpretation: (item) => set({ selectedInterpretation: item }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setIsAnalyzing: (value) => set({ isAnalyzing: value }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  setCurrentTime: (time) => set({ currentTime: time }),
  runMockAnalysis: () => {
    set({ isAnalyzing: true })
    setTimeout(() => {
      set({
        isAnalyzing: false,
        bpm: 140,
        key: 'D minor',
        interpretations: mockChordInterpretations,
      })
    }, 2500)
  },
}))
