import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  mockProjects,
  mockChordProgressions,
  mockMelodyLines,
  mockLyrics,
  mockEngineeringNotes,
} from '../data/mockData';

export interface Project {
  id: string;
  name: string;
  tempo: number;
  key: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChordProgression {
  id: string;
  projectId: string;
  name: string;
  chords: string[];
  key: string;
  mode: string;
}

export interface MelodyLine {
  id: string;
  projectId: string;
  name: string;
  notes: string;
  scale: string;
  tempo: number;
}

export interface LyricEntry {
  id: string;
  projectId: string;
  section: string;
  lines: string[];
  theme: string;
}

export interface EngineeringNote {
  id: string;
  projectId: string;
  stage: string;
  notes: string;
  settings: Record<string, string>;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  audioDevice: string;
  defaultProjectDir: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  audioDevice: 'System Default',
  defaultProjectDir: '~/Documents/CreativeSystem',
};

interface AppStore {
  currentView: string;
  activeProjectId: string | null;
  sidebarCollapsed: boolean;
  settings: AppSettings;
  projects: Project[];
  chordProgressions: ChordProgression[];
  melodyLines: MelodyLine[];
  lyrics: LyricEntry[];
  engineeringNotes: EngineeringNote[];

  setCurrentView: (view: string) => void;
  setActiveProject: (id: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;

  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  addChordProgression: (cp: Omit<ChordProgression, 'id'>) => void;
  updateChordProgression: (id: string, updates: Partial<ChordProgression>) => void;

  addMelodyLine: (ml: Omit<MelodyLine, 'id'>) => void;
  updateMelodyLine: (id: string, updates: Partial<MelodyLine>) => void;

  addLyricEntry: (le: Omit<LyricEntry, 'id'>) => void;
  updateLyricEntry: (id: string, updates: Partial<LyricEntry>) => void;

  addEngineeringNote: (en: Omit<EngineeringNote, 'id'>) => void;
  updateEngineeringNote: (id: string, updates: Partial<EngineeringNote>) => void;
}

const uid = () => crypto.randomUUID();
const now = () => new Date().toISOString();

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      currentView: 'dashboard',
      activeProjectId: mockProjects[0]?.id ?? null,
      sidebarCollapsed: false,
      settings: DEFAULT_SETTINGS,
      projects: mockProjects,
      chordProgressions: mockChordProgressions,
      melodyLines: mockMelodyLines,
      lyrics: mockLyrics,
      engineeringNotes: mockEngineeringNotes,

      setCurrentView: (view) => set({ currentView: view }),
      setActiveProject: (id) => set({ activeProjectId: id }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      updateSettings: (updates) =>
        set((state) => ({ settings: { ...state.settings, ...updates } })),

      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { ...project, id: uid(), createdAt: now(), updatedAt: now() },
          ],
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: now() } : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          chordProgressions: state.chordProgressions.filter((cp) => cp.projectId !== id),
          melodyLines: state.melodyLines.filter((ml) => ml.projectId !== id),
          lyrics: state.lyrics.filter((ly) => ly.projectId !== id),
          engineeringNotes: state.engineeringNotes.filter((en) => en.projectId !== id),
          activeProjectId:
            state.activeProjectId === id
              ? (state.projects.find((p) => p.id !== id)?.id ?? null)
              : state.activeProjectId,
        })),

      addChordProgression: (cp) =>
        set((state) => ({
          chordProgressions: [...state.chordProgressions, { ...cp, id: uid() }],
        })),

      updateChordProgression: (id, updates) =>
        set((state) => ({
          chordProgressions: state.chordProgressions.map((cp) =>
            cp.id === id ? { ...cp, ...updates } : cp
          ),
        })),

      addMelodyLine: (ml) =>
        set((state) => ({
          melodyLines: [...state.melodyLines, { ...ml, id: uid() }],
        })),

      updateMelodyLine: (id, updates) =>
        set((state) => ({
          melodyLines: state.melodyLines.map((ml) =>
            ml.id === id ? { ...ml, ...updates } : ml
          ),
        })),

      addLyricEntry: (le) =>
        set((state) => ({
          lyrics: [...state.lyrics, { ...le, id: uid() }],
        })),

      updateLyricEntry: (id, updates) =>
        set((state) => ({
          lyrics: state.lyrics.map((ly) =>
            ly.id === id ? { ...ly, ...updates } : ly
          ),
        })),

      addEngineeringNote: (en) =>
        set((state) => ({
          engineeringNotes: [...state.engineeringNotes, { ...en, id: uid() }],
        })),

      updateEngineeringNote: (id, updates) =>
        set((state) => ({
          engineeringNotes: state.engineeringNotes.map((en) =>
            en.id === id ? { ...en, ...updates } : en
          ),
        })),
    }),
    {
      name: 'creative-system-store',
    }
  )
);
