// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{Connection, Result, params};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

struct DbConn(Mutex<Connection>);

fn init_db(path: &str) -> Result<Connection> {
    let conn = Connection::open(path)?;
    conn.execute_batch(
        "
        PRAGMA journal_mode=WAL;
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

// ── Project DTOs ──────────────────────────────────────────────────────

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectRow {
    pub id: String,
    pub name: String,
    pub tempo: i64,
    pub key: String,
    pub genre: String,
    pub created_at: String,
    pub updated_at: String,
}

// ── Tauri Commands ────────────────────────────────────────────────────

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Welcome to Creative System, {}!", name)
}

#[tauri::command]
fn list_projects(db: State<DbConn>) -> Result<Vec<ProjectRow>, String> {
    let conn = db.0.lock().map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT id, name, tempo, key, genre, created_at, updated_at FROM projects ORDER BY updated_at DESC")
        .map_err(|e| e.to_string())?;
    let rows = stmt
        .query_map([], |row| {
            Ok(ProjectRow {
                id: row.get(0)?,
                name: row.get(1)?,
                tempo: row.get(2)?,
                key: row.get(3)?,
                genre: row.get(4)?,
                created_at: row.get(5)?,
                updated_at: row.get(6)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;
    Ok(rows)
}

#[tauri::command]
fn create_project(
    db: State<DbConn>,
    id: String,
    name: String,
    tempo: i64,
    key: String,
    genre: String,
    created_at: String,
    updated_at: String,
) -> Result<(), String> {
    let conn = db.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO projects (id, name, tempo, key, genre, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![id, name, tempo, key, genre, created_at, updated_at],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn update_project(
    db: State<DbConn>,
    id: String,
    name: String,
    tempo: i64,
    key: String,
    genre: String,
    updated_at: String,
) -> Result<(), String> {
    let conn = db.0.lock().map_err(|e| e.to_string())?;
    conn.execute(
        "UPDATE projects SET name=?1, tempo=?2, key=?3, genre=?4, updated_at=?5 WHERE id=?6",
        params![name, tempo, key, genre, updated_at, id],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_project(db: State<DbConn>, id: String) -> Result<(), String> {
    let conn = db.0.lock().map_err(|e| e.to_string())?;
    // Cascade-delete related data manually (SQLite foreign keys may be disabled)
    conn.execute("DELETE FROM chord_progressions WHERE project_id=?1", params![id])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM melody_lines WHERE project_id=?1", params![id])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM lyric_entries WHERE project_id=?1", params![id])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM engineering_notes WHERE project_id=?1", params![id])
        .map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM projects WHERE id=?1", params![id])
        .map_err(|e| e.to_string())?;
    Ok(())
}

// ── Main ──────────────────────────────────────────────────────────────

fn main() {
    let conn = init_db("creative_system.db").expect("failed to initialize database");

    tauri::Builder::default()
        .manage(DbConn(Mutex::new(conn)))
        .invoke_handler(tauri::generate_handler![
            greet,
            list_projects,
            create_project,
            update_project,
            delete_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
