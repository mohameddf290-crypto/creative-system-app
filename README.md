# Star Platinum ⭐

> **A creative intelligence system for rap production and music composition**

Star Platinum is a desktop app that guides you through the entire music creation workflow — from sound design and chord analysis through melody generation, lyric writing, and professional mixing. Built specifically for rap/hip-hop producers.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Launch web preview
pnpm dev

# Launch full desktop app (requires Rust)
pnpm tauri dev
```

See [docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md) for complete setup instructions.

---

## Tech Stack

| Component | Technology |
|---|---|
| Desktop Framework | Tauri + Rust |
| Frontend | React 19 + TypeScript |
| State Management | Zustand |
| Styling | Tailwind CSS + Framer Motion |
| Database | SQLite (via Tauri) |
| Package Manager | pnpm |

---

## Modules

### 🔊 SoundMatch
Upload a reference sound and get inspiration matches — NOT copies. The system analyzes tonal character (frequency, timbre, dynamics, spatial) and maps it to presets in your library with modification instructions to help you create YOUR own sound.

### 🎹 Chords
Upload drumless audio or a melody and get 5 ranked chord interpretations with confidence scores. Real jazz/complex harmony. Editable BPM and key. Apple Music-style chord timeline.

### 🎵 Melody
Generate instrumental melodies (synth lines, counter-melodies, hooks) from a chord progression. Configure contour, articulation, length. Get mini piano roll previews. Export as MIDI.

### ✍️ Lyrics & Topline
Upload your complete engineered song, a reference sheet with themes, and reference flows for cadence inspiration. Generate rap bars with anti-slop enforcement — zero clichés, zero AI language, real bars. Topline feature provides a vocal performance guide with Apple Music-style synced text.

### 🎛️ Engineering
Upload stems and get a complete, intelligent mixing roadmap split into phases. Every instrument. Every operation. Exact plugin parameters and WHY explanations. Uses your configured plugin database (with PDF manuals) for precision instructions.

---

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the complete technical specification.

See [docs/DECISIONS.md](docs/DECISIONS.md) for all product and architectural decisions.

---

## License

Private — all rights reserved.
