// Core application types

export type Module =
  | 'dashboard'
  | 'sound-match'
  | 'chords'
  | 'melody'
  | 'lyrics'
  | 'engineering'
  | 'projects'
  | 'settings'

export type Theme = 'dark' | 'light'

export type SongStatus = 'in_progress' | 'complete' | 'on_hold' | 'abandoned'

export interface Song {
  id: string
  name: string
  bpm?: number
  key?: string
  timeSignature: string
  genre?: string
  status: SongStatus
  currentPhase?: string
  folderId?: string
  notes?: string
  createdAt: string
  updatedAt: string
  tags?: Tag[]
}

export interface Folder {
  id: string
  name: string
  parentId?: string
  createdAt: string
}

export interface Tag {
  id: string
  name: string
  color?: string
}

// SoundMatch types
export interface AudioAnalysis {
  frequency: string
  timbre: string
  attack: string
  decay: string
  sustain: string
  release: string
  harmonics: string
  modulation: string
  spatial: string
  dynamics: string
  interpretedLabels: string[]
}

export interface PresetMatch {
  id: string
  presetName: string
  pluginName: string
  inspirationScore: number
  tags: string[]
  spectralData: number[]
  modificationInstructions: ModificationStep[]
}

export interface ModificationStep {
  step: number
  instruction: string
  why: string
  parameterValue?: string
}

// Chords types
export interface ChordInterpretation {
  id: string
  label: string
  confidenceScore: number
  progression: ChordEvent[]
  reasoning: string
}

export interface ChordEvent {
  chord: string
  startTime: number
  duration: number
  confidence: number
}

// Melody types
export type Contour = 'arch' | 'wave' | 'angular' | 'surprise'
export type Articulation = 'legato' | 'staccato' | 'mixed' | 'surprise'
export type TimeSignature = '4/4' | '3/4' | '6/8' | '5/4' | '7/8'

export interface MelodyNote {
  pitch: number // MIDI note number
  startBeat: number
  duration: number // in beats
  velocity: number
}

export interface MelodyVariation {
  id: string
  notes: MelodyNote[]
  qualityScore: number
  explanation: string
  emotionTags: string[]
  contour: Contour
  articulation: Articulation
}

// Lyrics types
export interface LyricVariation {
  id: string
  text: string
  antiSlopScore: number
  antiSlopFlags: string[]
  flowFitScore: number
  barCount: number
  wordCount: number
}

export interface ToplineData {
  audioUrl?: string
  syncedLyrics: SyncedWord[]
  flowNotations: FlowNotation[]
}

export interface SyncedWord {
  word: string
  startTime: number
  endTime: number
}

export interface FlowNotation {
  barStart: number
  type: 'speed-up' | 'slow-down' | 'emphasis' | 'pause' | 'normal'
  label: string
}

export interface ReferenceFlow {
  id: string
  name: string
  acapellaUrl?: string
  withSongUrl?: string
}

// Engineering types
export interface Stem {
  id: string
  name: string
  filePath?: string
  waveformData?: number[]
  category: string
}

export interface EngineeringInstruction {
  id: string
  text: string
  why: string
  pluginName?: string
  parameterDetails?: string
  isCompleted: boolean
}

export interface EngineeringInstrumentSection {
  instrumentName: string
  instructions: EngineeringInstruction[]
}

export interface EngineeringPhase {
  id: string
  phaseNumber: number
  phaseName: string
  description: string
  instruments: EngineeringInstrumentSection[]
  isComplete: boolean
  isLocked: boolean
}

export interface Plugin {
  id: string
  name: string
  category: string
  manualPath?: string
  manualStatus: 'uploaded' | 'not_uploaded'
  isFlStock: boolean
  createdAt: string
}

// Chat types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  module?: Module
}

// Settings types
export interface KeyboardShortcut {
  id: string
  label: string
  keys: string[]
  action: string
}
