import { create } from 'zustand'
import type { Stem, EngineeringPhase, Plugin } from '@/types'
import { mockEngineeringRoadmap, mockPlugins } from '@/mock-data/engineering'

interface EngineeringState {
  stems: Stem[]
  referenceTrack: File | null
  referenceTrackName: string | null
  roadmap: EngineeringPhase[]
  currentPhase: number
  completedInstructions: Set<string>
  plugins: Plugin[]
  isAnalyzing: boolean
  addStem: (stem: Stem) => void
  removeStem: (id: string) => void
  updateStemName: (id: string, name: string) => void
  setReferenceTrack: (file: File | null) => void
  setRoadmap: (roadmap: EngineeringPhase[]) => void
  setCurrentPhase: (phase: number) => void
  toggleInstruction: (instructionId: string) => void
  completePhase: (phaseId: string) => void
  addPlugin: (plugin: Plugin) => void
  removePlugin: (id: string) => void
  setIsAnalyzing: (value: boolean) => void
  generateRoadmap: () => void
}

export const useEngineeringStore = create<EngineeringState>((set) => ({
  stems: [],
  referenceTrack: null,
  referenceTrackName: null,
  roadmap: [],
  currentPhase: 0,
  completedInstructions: new Set(),
  plugins: mockPlugins,
  isAnalyzing: false,
  addStem: (stem) => set((state) => ({ stems: [...state.stems, stem] })),
  removeStem: (id) => set((state) => ({ stems: state.stems.filter((s) => s.id !== id) })),
  updateStemName: (id, name) =>
    set((state) => ({
      stems: state.stems.map((s) => (s.id === id ? { ...s, name } : s)),
    })),
  setReferenceTrack: (file) =>
    set({ referenceTrack: file, referenceTrackName: file?.name ?? null }),
  setRoadmap: (roadmap) => set({ roadmap }),
  setCurrentPhase: (phase) => set({ currentPhase: phase }),
  toggleInstruction: (instructionId) =>
    set((state) => {
      const next = new Set(state.completedInstructions)
      if (next.has(instructionId)) {
        next.delete(instructionId)
      } else {
        next.add(instructionId)
      }
      return { completedInstructions: next }
    }),
  completePhase: (phaseId) =>
    set((state) => ({
      roadmap: state.roadmap.map((p) =>
        p.id === phaseId
          ? { ...p, isComplete: true }
          : p.phaseNumber === state.currentPhase + 2
            ? { ...p, isLocked: false }
            : p,
      ),
      currentPhase: state.currentPhase + 1,
    })),
  addPlugin: (plugin) => set((state) => ({ plugins: [...state.plugins, plugin] })),
  removePlugin: (id) => set((state) => ({ plugins: state.plugins.filter((p) => p.id !== id) })),
  setIsAnalyzing: (value) => set({ isAnalyzing: value }),
  generateRoadmap: () => {
    set({ isAnalyzing: true, roadmap: [] })
    setTimeout(() => {
      set({ isAnalyzing: false, roadmap: mockEngineeringRoadmap, currentPhase: 0 })
    }, 3200)
  },
}))
