# Star Platinum — Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Install |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| pnpm | 9+ | `npm install -g pnpm` |
| Rust | 1.70+ | https://rustup.rs |
| Tauri CLI | 1.x | `cargo install tauri-cli` |

### macOS additional requirements
```bash
xcode-select --install
```

### Linux (Ubuntu/Debian) additional requirements
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget file \
  libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/mohameddf290-crypto/creative-system-app.git
cd creative-system-app
```

---

## 2. Install Dependencies

```bash
pnpm install
```

This installs all workspace dependencies including React, Zustand, Framer Motion, Tailwind CSS, and development tools.

---

## 3. Run in Development Mode

### Web preview only (recommended for UI development)
```bash
pnpm dev
```
Opens at `http://localhost:1420`

### Full Tauri app (requires Rust + system dependencies)
```bash
pnpm tauri dev
```
This compiles the Rust backend and launches the native desktop window.

---

## 4. Build for Production

### Build web assets only
```bash
pnpm build
```

### Build native desktop app (creates installable binary)
```bash
pnpm tauri build
```
Output: `src-tauri/target/release/bundle/`

---

## 5. Run Tests

```bash
pnpm test
```

Run with UI:
```bash
pnpm test:ui
```

---

## 6. Code Quality

### Lint
```bash
pnpm lint
```

### Format
```bash
pnpm format
```

### Type check
```bash
cd packages/frontend && pnpm type-check
```

---

## Project Structure Quick Reference

```
creative-system-app/
├── packages/frontend/     # All UI code (React + TypeScript)
│   ├── src/components/    # UI components by module
│   ├── src/stores/        # Zustand state stores
│   ├── src/mock-data/     # All fake data (Phase 1)
│   └── src/types/         # TypeScript type definitions
├── src-tauri/             # Rust backend
├── docs/                  # Architecture + decisions docs
└── pnpm-workspace.yaml    # Monorepo config
```

---

## Getting Your Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-api03-...`)
6. Open Star Platinum → Settings → Claude API Key → paste and save

---

## Common Issues

### `pnpm install` fails
Ensure Node.js 18+ is installed: `node --version`

### Tauri won't compile
- Check Rust version: `rustc --version` (needs 1.70+)
- Update Rust: `rustup update`
- Install system dependencies (see Prerequisites above)

### App opens but shows blank screen
- Ensure the dev server is running: `pnpm dev`
- Check browser console for errors
- Verify `vite.config.ts` port matches `tauri.conf.json` devPath

### TypeScript errors after pulling changes
```bash
cd packages/frontend
pnpm type-check
```
