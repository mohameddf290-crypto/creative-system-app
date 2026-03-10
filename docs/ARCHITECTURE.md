# Star Platinum — Architecture Document

> **This is the permanent source of truth for the Star Platinum project.**
> Every developer and AI working on this codebase should read this document first.

---

## Product Identity

**Star Platinum** is a desktop music composition and analysis tool built for a rapper/producer. It is a creative intelligence system — not a DAW, not a generic AI tool — but a purpose-built assistant that guides the entire music creation workflow from sound design through mixing.

The system is built around one principle: **every output must be real, high-quality, and musically intelligent**. No slop. No generic AI language. No lazy outputs.

---

## Tech Stack

| Component | Technology | Version |
|---|---|---|
| Desktop Framework | Tauri (Rust backend) | 1.x |
| Frontend | React 19 + TypeScript (strict) | 19.x |
| State Management | Zustand | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animations | Framer Motion (spring physics) | 11.x |
| Database | SQLite (via Tauri plugin) | — |
| Package Manager | pnpm | 10.x |
| Testing | Vitest + Testing Library | 2.x |
| Code Quality | ESLint + Prettier | — |
| Icons | Lucide React | — |

---

## Monorepo Structure

```
creative-system-app/
├── packages/
│   └── frontend/              # React 19 + TypeScript + Vite
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/    # AppShell, Sidebar, TopBar, CommandPalette, ChatPanel
│       │   │   ├── shared/    # GlassCard, GlassModal, GlassButton, DropZone, Badge, ScoreRing
│       │   │   ├── sound-match/
│       │   │   ├── chords/
│       │   │   ├── melody/
│       │   │   ├── lyrics/
│       │   │   ├── engineering/
│       │   │   ├── settings/
│       │   │   ├── dashboard/
│       │   │   └── projects/
│       │   ├── stores/        # Zustand stores (10 stores)
│       │   ├── types/         # TypeScript type definitions
│       │   ├── utils/         # Utility functions
│       │   ├── styles/        # Global CSS + Tailwind
│       │   ├── mock-data/     # All fake data for Phase 1
│       │   ├── services/      # API stubs + DB schema
│       │   └── test/          # Vitest tests
│       └── [config files]
├── src-tauri/                 # Rust/Tauri backend
├── docs/                      # Documentation
└── [workspace config]
```

---

## UI Design System — Apple Glass Morphism (Dark Mode)

### Design Philosophy
The app must look and feel like it came with a Mac. Apple aesthetic. Glass morphism. Premium.

### Colour System
- **Background**: `#0a0a0a` (primary), `#141414` (secondary), `#1a1a1a` (tertiary)
- **Glass panels**: `backdrop-blur-xl bg-white/5 border border-white/10`
- **Text**: `#f5f5f7` (primary), `#86868b` (secondary)
- **Accent**: `#0a84ff` (blue), `#32d74b` (green), `#ff453a` (red), `#bf5af2` (purple), `#ff9f0a` (orange)

### Typography
System font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif`
Minimum 16px body text. Bold headings with generous spacing.

### Animations
- All transitions: `type: "spring", stiffness: 300, damping: 30`
- Duration: 300–400ms
- 60fps target
- Page transitions: slide + fade
- Card appear: scale from 0.97 + fade

### Layout — Three Column
1. **Left Sidebar** (~260px, collapsible): Module navigation
2. **Main Content** (flexible): Module page
3. **Right Sidebar** (320px, slide-in): Chat panel (Copilot)

---

## State Management

Ten Zustand stores, each responsible for one domain:

| Store | Responsibility |
|---|---|
| `useAppStore` | currentModule, sidebar state, command palette, theme |
| `useSongStore` | Active song, song list, CRUD operations |
| `useSoundMatchStore` | SoundMatch module state |
| `useChordsStore` | Chords module state |
| `useMelodyStore` | Melody module state |
| `useLyricsStore` | Lyrics & Topline module state |
| `useEngineeringStore` | Engineering roadmap state |
| `usePluginStore` | Plugin database (delegated to engineering store in Phase 1) |
| `useChatStore` | Chat panel messages and context |
| `useSettingsStore` | API key, storage, shortcuts, appearance |

All stores use Zustand v5 with TypeScript. No `any` types. Full strict mode.

---

## The 5 Modules

### Module 1: SoundMatch — Sound Inspiration Engine
**Core principle**: Inspiration, NOT imitation. The goal is to help the user create their OWN sound.

- Upload reference audio (WAV/MP3/FLAC/OGG)
- Analyze tonal character: frequency, timbre, ADSR, harmonics, modulation, spatial, dynamics
- Returns 5 "inspiration match" preset cards with "inspiration proximity" scores
- Modification instructions with technical parameters and WHY explanations
- Spectral comparison visualization (reference vs preset)

### Module 2: Chords — Harmonic Analysis
**Core principle**: Real chords for real songs. Non-negotiable accuracy.

- Upload drumless audio or melody
- Detect BPM and Key (both user-editable)
- Return 5 chord interpretations ranked by confidence
- Each interpretation has: label, confidence score, chord progression, reasoning
- Visual timeline showing chords synced to audio playback
- Apple Music-style active chord highlighting

### Module 3: Melody — Instrumental Melody Generation
**Core principle**: Intellectual AND human. Melodies that touch hearts and souls.

- Melodies are for **instruments** (synth lines, counter-melodies, hooks) — NOT vocals
- Melodies are **independent** — they do NOT feed into the Lyrics module
- Input: chord progression, tempo, time signature, length, contour, articulation
- Output: 5 melody variations with mini piano roll visualizations
- Each melody has: quality score, emotion tags, explanation
- Export as MIDI (stub in Phase 1)

### Module 4: Lyrics & Topline — Rap-Focused Writing System
**Critical updates**:
- Input: **complete engineered song** (not just chords/melody)
- **Reference sheet**: uploaded text document with themes and elements
- **Reference flows**: acapella + with-song audio files for flow inspiration
- **Rap only** — no singing, no traditional song structure, no verse/chorus labels
- **Topline** = vocal/oral performance guide with Apple Music-style synced highlighted text
- Anti-slop enforcement: zero clichés, no AI-detector language, no lazy rhymes

### Module 5: Engineering — Intelligent Mixing Roadmap
**Core principle**: Precise, detailed instruction lists. NOT suggestions. Every instrument. Every phase.

- Upload unmixed song + individual stems
- Optional reference track for A/B comparison
- Plugin database with manuals (PDFs) — system uses ANY configured plugin
- Generates a complete custom roadmap split into intelligent phases
- Each phase has: per-instrument instructions with parameter details + WHY explanation
- Checkboxes to track completion per instruction
- Phase completion gates (unlock next phase)

Engineering phase knowledge base (not rigid — system adapts):
1. Technical prep / cleanup
2. Session organization / routing
3. Static balance
4. Corrective processing
5. Tone shaping & dynamics
6. Space / depth / stereo design
7. Movement / automation / ear candy
8. Bus processing / glue
9. Mix validation
10. Mastering

---

## Database Schema

Full SQL schema at `packages/frontend/src/services/schema.sql`.

Key tables:
- `songs` — primary entity (all modules reference this)
- `folders`, `tags`, `song_tags` — organization
- `sound_match_analyses` — SoundMatch results
- `chord_analyses` — chord detection results
- `melody_generations` — generated melodies with MIDI data
- `lyrics_sessions` — lyrics and topline data
- `engineering_sessions` — roadmap and completion tracking
- `plugins` — plugin database with manual data
- `reference_tracks` — uploaded reference tracks
- `song_versions` — delta-based version history
- `workflow_events` — analytics and undo/redo

All JSON fields store complex data structures. SQLite via Tauri plugin.

---

## Integration Points (Phase 1 = Stubbed, Phase 2 = Real)

| Feature | Phase 1 | Phase 2 |
|---|---|---|
| Audio analysis | Mock data | Real DSP / Claude API |
| Chord detection | Mock data | Essentia / Claude API |
| Melody generation | Mock data | Claude API + MIDI engine |
| Lyrics generation | Mock data | Claude API (specialized prompts) |
| Engineering roadmap | Mock data | Claude API + plugin knowledge base |
| Audio playback | Button stubs | Web Audio API |
| MIDI export | Button stub | Web MIDI API |
| SQLite persistence | In-memory stores | Tauri SQLite plugin |
| Google Drive backup | Stub | OAuth2 + Drive API |

---

## Anti-Slop Protocols

These rules apply to ALL AI-generated content in Phase 2:

1. **No clichés** — "pressure makes a diamond", "hustle", "grind" etc. are flagged
2. **No AI-detector language** — "delve", "tapestry", "intricate", "myriad" etc. are banned
3. **No lazy rhymes** — forced rhymes that compromise meaning are rejected
4. **Specificity over vagueness** — concrete imagery beats abstract description
5. **Rap orientation** — all lyric content assumes rap delivery, bars structure, cadence
6. **No traditional structure** — no forced verse/chorus/bridge labels
7. **Engineering precision** — all instructions include exact parameter values and WHY

---

## Quality Standards

- TypeScript strict mode throughout — zero `any` types
- All file names: kebab-case (`glass-card.tsx`, `use-song-store.ts`)
- All component names: PascalCase (`GlassCard`, `SoundMatchPage`)
- All mock data: music-relevant, realistic, not lorem ipsum
- All animations: 60fps spring physics
- All glass panels: visible backdrop-blur with translucent borders
