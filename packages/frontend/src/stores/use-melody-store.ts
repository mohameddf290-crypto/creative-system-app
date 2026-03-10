import { create } from 'zustand'
import type { MelodyVariation, Contour, Articulation, TimeSignature } from '@/types'
import { mockMelodyVariations } from '@/mock-data/melody'

type MelodyLength = 1 | 2 | 4 | 8

interface MelodyState {
  chordProgression: string
  tempo: number
  timeSignature: TimeSignature
  length: MelodyLength
  contour: Contour
  articulation: Articulation
  melodies: MelodyVariation[]
  selectedMelody: MelodyVariation | null
  comparingMelody: MelodyVariation | null
  isGenerating: boolean
  isPlaying: boolean
  playingMelodyId: string | null
  setChordProgression: (progression: string) => void
  setTempo: (tempo: number) => void
  setTimeSignature: (sig: TimeSignature) => void
  setLength: (length: MelodyLength) => void
  setContour: (contour: Contour) => void
  setArticulation: (articulation: Articulation) => void
  setSelectedMelody: (melody: MelodyVariation | null) => void
  setComparingMelody: (melody: MelodyVariation | null) => void
  setPlayingMelodyId: (id: string | null) => void
  generateMelodies: () => void
}

export const useMelodyStore = create<MelodyState>((set) => ({
  chordProgression: 'Dm9 → Am11 → Gmaj7 → Em7',
  tempo: 140,
  timeSignature: '4/4',
  length: 4,
  contour: 'arch',
  articulation: 'legato',
  melodies: [],
  selectedMelody: null,
  comparingMelody: null,
  isGenerating: false,
  isPlaying: false,
  playingMelodyId: null,
  setChordProgression: (progression) => set({ chordProgression: progression }),
  setTempo: (tempo) => set({ tempo }),
  setTimeSignature: (sig) => set({ timeSignature: sig }),
  setLength: (length) => set({ length }),
  setContour: (contour) => set({ contour }),
  setArticulation: (articulation) => set({ articulation }),
  setSelectedMelody: (melody) => set({ selectedMelody: melody }),
  setComparingMelody: (melody) => set({ comparingMelody: melody }),
  setPlayingMelodyId: (id) => set({ playingMelodyId: id }),
  generateMelodies: () => {
    set({ isGenerating: true, melodies: [] })
    setTimeout(() => {
      set({ isGenerating: false, melodies: mockMelodyVariations })
    }, 2800)
  },
}))
