// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result};

fn init_db() -> Result<Connection> {
    let conn = Connection::open("creative_system.db")?;
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            tempo INTEGER DEFAULT 120,
            key TEXT DEFAULT 'C',
            genre TEXT DEFAULT '',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS chord_progressions (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            name TEXT NOT NULL,
            chords TEXT NOT NULL,
            key TEXT DEFAULT 'C',
            mode TEXT DEFAULT 'major',
            FOREIGN KEY (project_id) REFERENCES projects(id)
        );
        CREATE TABLE IF NOT EXISTS melody_lines (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            name TEXT NOT NULL,
            notes TEXT NOT NULL,
            scale TEXT DEFAULT 'major',
            tempo INTEGER DEFAULT 120,
            FOREIGN KEY (project_id) REFERENCES projects(id)
        );
        CREATE TABLE IF NOT EXISTS lyric_entries (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            section TEXT NOT NULL,
            lines TEXT NOT NULL,
            theme TEXT DEFAULT '',
            FOREIGN KEY (project_id) REFERENCES projects(id)
        );
        CREATE TABLE IF NOT EXISTS engineering_notes (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            stage TEXT NOT NULL,
            notes TEXT NOT NULL,
            settings TEXT DEFAULT '{}',
            FOREIGN KEY (project_id) REFERENCES projects(id)
        );
        ",
    )?;
    Ok(conn)
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Welcome to Creative System, {}!", name)
}

fn main() {
    let _ = init_db();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
