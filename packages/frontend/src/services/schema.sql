-- Star Platinum Database Schema
-- SQLite via Tauri plugin
-- Version: 1.0.0 (Phase 1)

-- Songs (primary unit)
CREATE TABLE songs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bpm INTEGER,
  key TEXT,
  time_signature TEXT DEFAULT '4/4',
  genre TEXT,
  status TEXT DEFAULT 'in_progress', -- in_progress, complete, on_hold, abandoned
  current_phase TEXT,
  folder_id TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (folder_id) REFERENCES folders(id)
);

-- Folders
CREATE TABLE folders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES folders(id)
);

-- Tags
CREATE TABLE tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT
);

-- Song Tags (many-to-many)
CREATE TABLE song_tags (
  song_id TEXT,
  tag_id TEXT,
  PRIMARY KEY (song_id, tag_id),
  FOREIGN KEY (song_id) REFERENCES songs(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- SoundMatch analyses
CREATE TABLE sound_match_analyses (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  reference_audio_path TEXT,
  analysis_data TEXT, -- JSON: frequency, timbre, ADSR, etc.
  preset_matches TEXT, -- JSON: array of matches with scores
  modification_history TEXT, -- JSON: array of attempts
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Preset Library
CREATE TABLE presets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  plugin_name TEXT,
  plugin_version TEXT,
  category TEXT,
  tags TEXT, -- JSON array
  file_path TEXT,
  audio_preview_path TEXT,
  analysis_data TEXT, -- JSON
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Chord analyses
CREATE TABLE chord_analyses (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  audio_path TEXT,
  detected_bpm INTEGER,
  detected_key TEXT,
  interpretations TEXT, -- JSON: array of 5 interpretations
  selected_interpretation_index INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Melody generations
CREATE TABLE melody_generations (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  chord_progression TEXT, -- JSON
  tempo INTEGER,
  time_signature TEXT,
  length_bars INTEGER,
  contour TEXT,
  articulation TEXT,
  melodies TEXT, -- JSON: array of 5 melody variations with MIDI data
  selected_melody_index INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Lyrics
CREATE TABLE lyrics_sessions (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  engineered_song_path TEXT,
  reference_sheet_text TEXT,
  reference_flow_paths TEXT, -- JSON array
  blacklist TEXT, -- JSON array
  variations TEXT, -- JSON: array of lyric variations
  selected_variation_index INTEGER,
  topline_data TEXT, -- JSON: flow data, timing, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Engineering sessions
CREATE TABLE engineering_sessions (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  stems TEXT, -- JSON: array of stem info
  reference_track_path TEXT,
  roadmap TEXT, -- JSON: complete phase roadmap
  current_phase INTEGER DEFAULT 0,
  completed_instructions TEXT, -- JSON: set of completed instruction IDs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Plugin database
CREATE TABLE plugins (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  manual_path TEXT,
  manual_parsed_data TEXT, -- JSON: extracted knowledge from manual
  is_fl_stock INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reference tracks
CREATE TABLE reference_tracks (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  file_path TEXT,
  name TEXT,
  artist TEXT,
  genre TEXT,
  bpm INTEGER,
  key TEXT,
  analysis_data TEXT, -- JSON
  notes TEXT,
  cover_art_path TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Song versions
CREATE TABLE song_versions (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  label TEXT,
  snapshot_data TEXT, -- JSON: complete state snapshot (delta-based)
  phase TEXT,
  auto_generated INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);

-- Workflow tracking
CREATE TABLE workflow_events (
  id TEXT PRIMARY KEY,
  song_id TEXT,
  module TEXT,
  action TEXT,
  details TEXT, -- JSON
  duration_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (song_id) REFERENCES songs(id)
);
