import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useStore, ChordProgression } from '../store';

type CPDraft = Omit<ChordProgression, 'id'>;

const MODES = ['major', 'natural minor', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'locrian', 'jazz'];
const KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B',
               'Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', 'F#m'];

const blank = (projectId: string): CPDraft => ({
  projectId,
  name: '',
  chords: [],
  key: 'C',
  mode: 'major',
});

function Chords() {
  const {
    projects,
    activeProjectId,
    chordProgressions,
    addChordProgression,
    updateChordProgression,
  } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<CPDraft>(blank(activeProjectId ?? ''));
  const [chordsInput, setChordsInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [filterProjectId, setFilterProjectId] = useState<string>(activeProjectId ?? 'all');

  const filtered =
    filterProjectId === 'all'
      ? chordProgressions
      : chordProgressions.filter((cp) => cp.projectId === filterProjectId);

  const handleSubmit = () => {
    if (!draft.name.trim()) return;
    const chords = chordsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const payload = { ...draft, chords };
    if (editId) {
      updateChordProgression(editId, payload);
      setEditId(null);
    } else {
      addChordProgression(payload);
    }
    resetForm();
  };

  const startEdit = (cp: ChordProgression) => {
    setDraft({ projectId: cp.projectId, name: cp.name, chords: cp.chords, key: cp.key, mode: cp.mode });
    setChordsInput(cp.chords.join(', '));
    setEditId(cp.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setDraft(blank(activeProjectId ?? ''));
    setChordsInput('');
    setEditId(null);
    setShowForm(false);
  };

  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Chord Progressions</div>
          <div className="module-subtitle">Build and organise harmonic ideas</div>
        </div>
        {!showForm && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setDraft(blank(activeProjectId ?? ''));
              setShowForm(true);
            }}
          >
            + Add Progression
          </button>
        )}
      </div>

      {showForm && (
        <ModuleCard className="form-panel">
          <h3>{editId ? 'Edit Progression' : 'New Chord Progression'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="e.g. Intro Progression"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Project</label>
              <select
                value={draft.projectId}
                onChange={(e) => setDraft({ ...draft, projectId: e.target.value })}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Key</label>
              <select value={draft.key} onChange={(e) => setDraft({ ...draft, key: e.target.value })}>
                {KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Mode</label>
              <select value={draft.mode} onChange={(e) => setDraft({ ...draft, mode: e.target.value })}>
                {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Chords (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. Dm, Bb, F, C"
                value={chordsInput}
                onChange={(e) => setChordsInput(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Add Progression'}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
          </div>
        </ModuleCard>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <span className="section-title" style={{ margin: 0, flex: 'unset' }}>Filter by project</span>
        <select
          value={filterProjectId}
          onChange={(e) => setFilterProjectId(e.target.value)}
          style={{ width: 220 }}
        >
          <option value="all">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♩</div>
          <h3>No chord progressions yet</h3>
          <p>Add your first progression to start building harmonies.</p>
        </div>
      ) : (
        <div className="item-list">
          {filtered.map((cp) => (
            <ModuleCard key={cp.id} className="item-card">
              <div className="item-card-header">
                <div>
                  <div className="item-card-title">{cp.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {projectName(cp.projectId)} · {cp.key} {cp.mode}
                  </div>
                </div>
                <div className="item-card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => startEdit(cp)}>Edit</button>
                </div>
              </div>
              <div className="chord-chips">
                {cp.chords.map((chord, i) => (
                  <span key={i} className="chord-chip">{chord}</span>
                ))}
              </div>
            </ModuleCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chords;
