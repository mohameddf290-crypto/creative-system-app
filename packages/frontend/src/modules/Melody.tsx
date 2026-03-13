import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useStore, MelodyLine } from '../store';

type MLDraft = Omit<MelodyLine, 'id'>;

const SCALES = [
  'major', 'natural minor', 'harmonic minor', 'melodic minor',
  'major pentatonic', 'minor pentatonic', 'dorian', 'phrygian',
  'lydian', 'mixolydian', 'blues', 'chromatic',
];

const blank = (projectId: string, tempo: number): MLDraft => ({
  projectId,
  name: '',
  notes: '',
  scale: 'major',
  tempo,
});

function Melody() {
  const { projects, activeProjectId, melodyLines, addMelodyLine, updateMelodyLine } = useStore();

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<MLDraft>(blank(activeProjectId ?? '', activeProject?.tempo ?? 120));
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = melodyLines.filter((ml) => ml.projectId === activeProjectId);

  const handleSubmit = () => {
    if (!draft.name.trim()) return;
    if (editId) {
      updateMelodyLine(editId, draft);
      setEditId(null);
    } else {
      addMelodyLine(draft);
    }
    resetForm();
  };

  const startEdit = (ml: MelodyLine) => {
    setDraft({ projectId: ml.projectId, name: ml.name, notes: ml.notes, scale: ml.scale, tempo: ml.tempo });
    setEditId(ml.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setDraft(blank(activeProjectId ?? '', activeProject?.tempo ?? 120));
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Melody Lines</div>
          <div className="module-subtitle">
            {activeProject ? `Active project: ${activeProject.name}` : 'Select a project from the header'}
          </div>
        </div>
        {!showForm && activeProjectId && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Melody
          </button>
        )}
      </div>

      {showForm && (
        <ModuleCard className="form-panel">
          <h3>{editId ? 'Edit Melody' : 'New Melody Line'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="e.g. Vocal Hook A"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Scale</label>
              <select value={draft.scale} onChange={(e) => setDraft({ ...draft, scale: e.target.value })}>
                {SCALES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tempo (BPM)</label>
              <input
                type="number"
                min={40}
                max={300}
                value={draft.tempo}
                onChange={(e) => setDraft({ ...draft, tempo: Number(e.target.value) })}
              />
            </div>
            <div className="form-group full-width">
              <label>Notes (space-separated, e.g. D4 F4 A4)</label>
              <input
                type="text"
                placeholder="D4 F4 A4 C5 A4 F4"
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Add Melody'}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
          </div>
        </ModuleCard>
      )}

      {!activeProjectId ? (
        <div className="empty-state">
          <div className="empty-icon">♫</div>
          <h3>No project selected</h3>
          <p>Select an active project from the header dropdown.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♫</div>
          <h3>No melody lines yet</h3>
          <p>Add your first melody idea to this project.</p>
        </div>
      ) : (
        <div className="item-list">
          {filtered.map((ml) => (
            <ModuleCard key={ml.id} className="item-card">
              <div className="item-card-header">
                <div>
                  <div className="item-card-title">{ml.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {ml.scale} · {ml.tempo} BPM
                  </div>
                </div>
                <div className="item-card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => startEdit(ml)}>Edit</button>
                </div>
              </div>
              <div className="item-card-body">
                <div className="chord-chips" style={{ marginTop: 8 }}>
                  {ml.notes.split(' ').filter(Boolean).map((note, i) => (
                    <span key={i} className="chord-chip" style={{
                      background: 'rgba(34,211,238,0.1)',
                      borderColor: 'rgba(34,211,238,0.25)',
                      color: 'var(--accent-cyan)',
                    }}>
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </ModuleCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Melody;
