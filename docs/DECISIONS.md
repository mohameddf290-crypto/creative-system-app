# Star Platinum — Decisions Log

This file records all key architectural and product decisions made during the design and build of Star Platinum. It references the BATCH 01–16 specification files and documents updates from user conversations.

---

## Core Product Decisions

### D-001: Product Identity
**Decision**: Star Platinum is a creative intelligence system specifically for rap/hip-hop production.
**Rationale**: Generic music tools exist everywhere. This is purpose-built for one workflow.

### D-002: Desktop-First
**Decision**: Tauri (not Electron) for the desktop wrapper.
**Rationale**: Smaller bundle, better performance, native Rust backend for future audio processing.

### D-003: React 19 + Zustand (no Redux)
**Decision**: React 19 with Zustand for state management.
**Rationale**: Zustand is simpler, requires less boilerplate, and is well-suited to modular state domains.

### D-004: SQLite (not cloud DB)
**Decision**: Local SQLite database via Tauri plugin.
**Rationale**: Offline-first. User data stays on device. No subscription required. Google Drive backup is optional.

---

## Module-Specific Decisions

### D-010: SoundMatch = Inspiration, NOT Cloning
**Decision**: The SoundMatch module is an inspiration engine, not a 1:1 sound recreation tool.
**Context**: Original spec used "similarity" scores. Updated to "inspiration proximity" scores.
**Rationale**: Trying to clone a sound exactly is legally and creatively limiting. The goal is to create the user's OWN sound INSPIRED by the reference.
**Impact**: All copy uses "inspiration", not "similarity" or "copy". Modification instructions focus on capturing tonal CHARACTER, not exact parameters.

### D-011: Chords — 5 Interpretations, Ranked by Confidence
**Decision**: Always return exactly 5 chord interpretations ranked highest-to-lowest confidence.
**Rationale**: Gives the user genuine choice without overwhelming them. Each interpretation reflects a valid harmonic reading of the same audio.

### D-012: Melodies Are Independent
**Decision**: The Melody module generates instrumental melodies ONLY. They do NOT feed into the Lyrics module.
**Context**: Earlier spec considered connecting melody → lyrics workflow.
**Rationale**: Instrumental melodies (synth lines, hooks, counter-melodies) are separate creative decisions from lyric writing. Forcing the connection would constrain both.

### D-013: Lyrics Input = Complete Engineered Song
**Decision**: Lyrics module takes the COMPLETE engineered (mixed) instrumental as input, not raw stems.
**Context**: Updated from earlier spec that assumed stems/chord data as input.
**Rationale**: Lyrics must bounce on the actual drums and follow the actual mix energy. Raw stems miss the cumulative groove of the full production.

### D-014: Reference Sheet = Uploaded Text Document
**Decision**: Reference sheet is uploaded as a text file (TXT, DOC, MD), not typed inline.
**Rationale**: Producers already keep notes in documents. Uploading preserves formatting and allows longer, richer context than an input box.

### D-015: Reference Flows = Acapella + With-Song Audio
**Decision**: Reference flows are audio files — both acapella versions and with-instrumental versions.
**Rationale**: Hearing both allows the system to understand the cadence and delivery in context of a beat, not just in isolation.

### D-016: Rap Only, No Singing
**Decision**: All lyric and topline output is oriented around rapping, not singing.
**Impact**: No pitch guidance, no melodic contour for vocals, no tuning suggestions. Focus is entirely on: bars, flows, delivery, cadence, rhyme schemes, rhythm.

### D-017: No Traditional Song Structure
**Decision**: No verse/chorus/bridge detection or labeling in the Lyrics module.
**Context**: User confirmed they do not follow traditional song structure.
**Impact**: Removed section detection entirely. Lyrics are continuous bars. No structural constraints.

### D-018: Topline = Rapping Voice Guide
**Decision**: "Topline" means a vocal performance guide demonstrating the flow with real rapping, not a melodic singing guide.
**Rationale**: Traditional topline = sung melody guide. For this user, topline = how to rap these bars: speed, cadence, emphasis, breath placement.
**Implementation**: Apple Music-style word-by-word synced text display + flow notations.

### D-019: Engineering = Custom Intelligent Roadmap, Not Template
**Decision**: The Engineering module creates a CUSTOM roadmap per-song, not a fixed template.
**Context**: Earlier spec had a rigid 10-phase template.
**Rationale**: Every song has different issues. An intelligent system must create/skip/reorder phases based on what the song actually needs.
**Implementation Phase 1**: Mock roadmap uses the 5 most common phases. Phase 2: Claude API analyzes stems and creates a genuinely custom roadmap.

### D-020: Plugin Database with PDF Manuals
**Decision**: User uploads their plugins with PDF manuals. The system uses ANY configured plugin in engineering instructions.
**Rationale**: Generic instructions like "use a compressor" are useless. The system must give exact parameter values for the user's ACTUAL tools.
**Phase 1**: Mock plugin database with 3 sample plugins. Phase 2: PDF parsing + knowledge extraction.

### D-021: Engineering = List-Based Display
**Decision**: Engineering roadmap is displayed as a vertical list of phases, each with a nested list of per-instrument instructions. NOT a visual mixing board or timeline.
**Rationale**: Instructions need to be readable and checkable. A list format is clear, actionable, and works at any screen size.

---

## UI/UX Decisions

### D-030: Apple Glass Morphism Dark UI
**Decision**: Dark mode default. Glass morphism (backdrop-blur + translucent bg + border) for all panels.
**Rationale**: This is a premium creative tool. It should feel like a Mac app.

### D-031: Three Column Layout
**Decision**: Left sidebar (fixed), main content (flexible), right sidebar (collapsible chat panel).
**Rationale**: Most professional creative tools use this pattern. It scales well.

### D-032: Framer Motion Spring Physics
**Decision**: All animations use spring physics (`stiffness: 300, damping: 30`), not CSS transitions.
**Rationale**: Spring physics feel natural and premium. CSS duration-based animations feel robotic.

### D-033: Lucide React Icons
**Decision**: Lucide React for all icons throughout the app.
**Rationale**: Consistent stroke weight, minimal style, close to SF Symbols aesthetic.

### D-034: Command Palette (⌘K)
**Decision**: App-wide command palette accessible via ⌘K / Ctrl+K.
**Rationale**: Power users can navigate the entire app without touching the mouse.

---

## Quality Decisions

### D-040: TypeScript Strict Mode
**Decision**: `strict: true` in tsconfig. Zero `any` types. All props typed.
**Rationale**: This codebase is a foundation for a complex product. Type safety prevents bugs at scale.

### D-041: Mock Data Quality
**Decision**: All mock data must be music-relevant and realistic. No lorem ipsum.
**Rationale**: The scaffold must FEEL like a real product. Fake music data with actual chord names, real-sounding lyrics, and accurate parameter values demonstrates the quality bar.

### D-042: No Tone Selection in Lyrics
**Decision**: Removed tone selection (dark/aggressive/chill) from the Lyrics module.
**Context**: Earlier spec included tone selection.
**Rationale**: The reference sheet and reference flows provide enough creative context. Adding a tone selector oversimplifies and patronizes the user.
