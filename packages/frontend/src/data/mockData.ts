import { Project, ChordProgression, MelodyLine, LyricEntry, EngineeringNote } from '../store';

export const mockProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Midnight Resonance',
    tempo: 92,
    key: 'Dm',
    genre: 'Dark Soul / Neo-Soul',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-14T18:30:00Z',
  },
  {
    id: 'proj-002',
    name: 'Chrome Horizons',
    tempo: 128,
    key: 'F#m',
    genre: 'Synthwave / Electronic',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-05T14:10:00Z',
  },
  {
    id: 'proj-003',
    name: 'Velvet Undertow',
    tempo: 78,
    key: 'Bb',
    genre: 'R&B / Lo-Fi',
    createdAt: '2024-03-12T11:00:00Z',
    updatedAt: '2024-03-20T16:45:00Z',
  },
];

export const mockChordProgressions: ChordProgression[] = [
  {
    id: 'cp-001',
    projectId: 'proj-001',
    name: 'Intro Progression',
    chords: ['Dm', 'Bb', 'F', 'C'],
    key: 'Dm',
    mode: 'natural minor',
  },
  {
    id: 'cp-002',
    projectId: 'proj-001',
    name: 'Bridge — Tension Build',
    chords: ['Dm7', 'Gm7', 'Bb maj7', 'A7'],
    key: 'Dm',
    mode: 'dorian',
  },
  {
    id: 'cp-003',
    projectId: 'proj-002',
    name: 'Main Synth Loop',
    chords: ['F#m', 'A', 'E', 'C#m'],
    key: 'F#m',
    mode: 'natural minor',
  },
  {
    id: 'cp-004',
    projectId: 'proj-002',
    name: 'Chorus Lift',
    chords: ['D', 'A', 'E', 'F#m'],
    key: 'D',
    mode: 'major',
  },
  {
    id: 'cp-005',
    projectId: 'proj-003',
    name: 'Verse Groove',
    chords: ['Bbmaj7', 'Gm7', 'Ebmaj7', 'F7'],
    key: 'Bb',
    mode: 'major',
  },
  {
    id: 'cp-006',
    projectId: 'proj-003',
    name: 'Pre-Chorus Drift',
    chords: ['Cm7', 'F9', 'Bbmaj7', 'Dm7b5'],
    key: 'Bb',
    mode: 'jazz',
  },
];

export const mockMelodyLines: MelodyLine[] = [
  {
    id: 'ml-001',
    projectId: 'proj-001',
    name: 'Vocal Hook A',
    notes: 'D4 F4 A4 C5 A4 F4 G4 F4 D4',
    scale: 'D natural minor',
    tempo: 92,
  },
  {
    id: 'ml-002',
    projectId: 'proj-001',
    name: 'Piano Countermelody',
    notes: 'A3 C4 D4 E4 F4 E4 D4 C4',
    scale: 'D Dorian',
    tempo: 92,
  },
  {
    id: 'ml-003',
    projectId: 'proj-002',
    name: 'Lead Synth Arp',
    notes: 'F#4 A4 C#5 E5 C#5 A4 F#4 E4',
    scale: 'F# minor pentatonic',
    tempo: 128,
  },
  {
    id: 'ml-004',
    projectId: 'proj-003',
    name: 'Sax-Style Melody',
    notes: 'Bb3 D4 F4 A4 G4 F4 Eb4 D4',
    scale: 'Bb major',
    tempo: 78,
  },
];

export const mockLyrics: LyricEntry[] = [
  {
    id: 'ly-001',
    projectId: 'proj-001',
    section: 'verse',
    lines: [
      'Moving through the static noise',
      'Searching for a clearer voice',
      'In the space between the light',
      'Something lingers through the night',
    ],
    theme: 'isolation / searching',
  },
  {
    id: 'ly-002',
    projectId: 'proj-001',
    section: 'chorus',
    lines: [
      'Midnight resonance, calling out my name',
      'Every frequency an echo of the same',
      'I hear you through the walls of sound',
      'Midnight resonance, pulling me around',
    ],
    theme: 'connection across distance',
  },
  {
    id: 'ly-003',
    projectId: 'proj-002',
    section: 'verse',
    lines: [
      'Neon spills across the interstate',
      'Digital ghosts at the city gate',
      'You said we\'d meet at the edge of time',
      'Chrome horizons — you were always mine',
    ],
    theme: 'nostalgia / cyberpunk longing',
  },
  {
    id: 'ly-004',
    projectId: 'proj-003',
    section: 'verse',
    lines: [
      'Silk and smoke in the afternoon',
      'Playing old records in your living room',
      'Got a velvet feeling I can\'t shake',
      'Low and heavy like a slow heartbreak',
    ],
    theme: 'intimacy / slow burn',
  },
  {
    id: 'ly-005',
    projectId: 'proj-003',
    section: 'bridge',
    lines: [
      'Let the undertow take us down',
      'No resistance, no sound',
      'Just the weight of what we found',
    ],
    theme: 'surrender',
  },
];

export const mockEngineeringNotes: EngineeringNote[] = [
  {
    id: 'en-001',
    projectId: 'proj-001',
    stage: 'tracking',
    notes: 'Vocals recorded with Neumann U87 through 1073 pre. Three takes comped. Room mics on drums at 8ft. Bass DI + Ampeg SVT blend.',
    settings: {
      'Vocal Mic': 'Neumann U87',
      'Preamp': 'API 1073',
      'Room Size': 'Medium Live Room',
      'Sample Rate': '96kHz / 32-bit',
    },
  },
  {
    id: 'en-002',
    projectId: 'proj-001',
    stage: 'mixing',
    notes: 'Vocal chain: de-ess → 1176 (4:1) → LA-2A. Parallel drum bus with heavy compression. Low-end split at 90Hz for sub control. Reverb sends: plate for vocals, hall for piano.',
    settings: {
      'Vocal Comp': 'UA 1176 + LA-2A',
      'Drum Bus': 'SSL G-Bus Comp',
      'Master Bus': 'Neve 8078 EQ',
      'Mix Level': '-6dBFS headroom',
    },
  },
  {
    id: 'en-003',
    projectId: 'proj-002',
    stage: 'tracking',
    notes: 'All synths recorded as stereo stems. Oberheim OB-X8 for leads. Moog Subsequent 37 for bass. Roland TR-808 for drums — tuned kicks at D2.',
    settings: {
      'Lead Synth': 'Oberheim OB-X8',
      'Bass Synth': 'Moog Subsequent 37',
      'Drums': 'Roland TR-808 + 909',
      'Interface': 'UA Apollo x8p',
    },
  },
  {
    id: 'en-004',
    projectId: 'proj-003',
    stage: 'mastering',
    notes: 'Mastered for streaming (Spotify -14 LUFS). Gentle analog warmth pass via Studer A80 tape sim. Final limiter: iZotope Ozone Maximizer at -1dBTP.',
    settings: {
      'Target Loudness': '-14 LUFS',
      'True Peak': '-1.0 dBTP',
      'Tape Sim': 'Studer A80 (Softube)',
      'Limiter': 'iZotope Ozone 11',
    },
  },
];
