# Creative System

A music brainstorming and production desktop application built with **React**, **TypeScript**, **Vite**, and **Tauri**. Manage chord progressions, melody lines, lyrics, and engineering notes — all from a beautiful glassmorphism UI.

---

## Features

| Module | Description |
|---|---|
| **Dashboard** | Overview stats, recent projects, and quick-action shortcuts |
| **Projects** | Create and manage production sessions with key, tempo, and genre |
| **Chords** | Build and organise chord progressions per project |
| **Melody** | Record melody ideas with note sequences and scale info |
| **Lyrics** | Write and organise lyric entries by section (verse/chorus/bridge) |
| **Engineering** | Log tracking, mixing, and mastering decisions with settings tables |

---

## Architecture

```
creative-system-app/
├── package.json              # Root pnpm workspace
├── pnpm-workspace.yaml
├── packages/
│   └── frontend/             # Vite + React + TypeScript SPA
│       ├── src/
│       │   ├── store/        # Zustand state (persist middleware)
│       │   ├── data/         # Mock seed data
│       │   ├── components/   # Sidebar, Header, ModuleCard
│       │   └── modules/      # Dashboard, Projects, Chords, Melody, Lyrics, Engineering
│       └── src/__tests__/    # Vitest + Testing Library tests
└── src-tauri/                # Tauri Rust backend + SQLite schema
    └── src/main.rs
```

State is managed in a **Zustand store** with `persist` middleware (localStorage). The Rust backend initialises a **SQLite** database schema on startup; future versions will wire up Tauri commands for full persistence.

---

## Prerequisites

- **Node.js** 18+
- **pnpm** 8+ (`npm install -g pnpm`)
- **Rust** stable (https://rustup.rs)
- **Tauri CLI** (`cargo install tauri-cli`)

---

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Run the frontend dev server
pnpm dev

# 3. Run in Tauri desktop mode
pnpm tauri
```

---

## Development Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server (http://localhost:5173) |
| `pnpm build` | TypeScript check + Vite production build |
| `pnpm test` | Run Vitest test suite (single run) |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm lint` | ESLint across all TypeScript/TSX files |
| `pnpm tauri` | Launch Tauri desktop app (requires Rust) |

---

## Tech Stack

- **Frontend**: React 18, TypeScript 5, Vite 5
- **State**: Zustand 4 with persist middleware
- **Routing**: React Router DOM 6
- **Desktop**: Tauri 1 (Rust)
- **Database**: SQLite via `rusqlite` (bundled)
- **Testing**: Vitest + @testing-library/react
- **Styling**: Pure CSS with glassmorphism design system (no external CSS framework)
