import { create } from 'zustand'
import type { Song, Folder, Tag } from '@/types'
import { mockSongs, mockFolders, mockTags } from '@/mock-data/songs'

interface SongState {
  activeSong: Song | null
  songs: Song[]
  folders: Folder[]
  tags: Tag[]
  searchQuery: string
  setActiveSong: (song: Song | null) => void
  addSong: (song: Song) => void
  updateSong: (id: string, updates: Partial<Song>) => void
  deleteSong: (id: string) => void
  setSearchQuery: (query: string) => void
}

export const useSongStore = create<SongState>((set) => ({
  activeSong: mockSongs[0],
  songs: mockSongs,
  folders: mockFolders,
  tags: mockTags,
  searchQuery: '',
  setActiveSong: (song) => set({ activeSong: song }),
  addSong: (song) => set((state) => ({ songs: [song, ...state.songs] })),
  updateSong: (id, updates) =>
    set((state) => ({
      songs: state.songs.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      activeSong:
        state.activeSong?.id === id ? { ...state.activeSong, ...updates } : state.activeSong,
    })),
  deleteSong: (id) =>
    set((state) => ({
      songs: state.songs.filter((s) => s.id !== id),
      activeSong: state.activeSong?.id === id ? null : state.activeSong,
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
