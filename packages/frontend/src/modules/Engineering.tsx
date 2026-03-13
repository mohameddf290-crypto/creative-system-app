import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useStore, EngineeringNote } from '../store';

type ENDraft = Omit<EngineeringNote, 'id'>;

const STAGES = ['tracking', 'pre-production', 'mixing', 'mastering', 'post-production'];

const blank = (projectId: string): ENDraft => ({
  projectId,
  stage: 'tracking',
  notes: '',
  settings: {},
});

function Engineering() {
  const { projects, activeProjectId, engineeringNotes, addEngineeringNote, updateEngineeringNote } =
    useStore();

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<ENDraft>(blank(activeProjectId ?? ''));
  const [settingsText, setSettingsText] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = engineeringNotes.filter((en) => en.projectId === activeProjectId);

  const parseSettings = (raw: string): Record<string, string> => {
    const result: Record<string, string> = {};
    raw.split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        if (k) result[k] = v;
      }
    });
    return result;
  };

  const settingsToText = (s: Record<string, string>) =>
    Object.entries(s)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

  const handleSubmit = () => {
    if (!draft.notes.trim()) return;
    const settings = parseSettings(settingsText);
    const payload = { ...draft, settings };
    if (editId) {
      updateEngineeringNote(editId, payload);
      setEditId(null);
    } else {
      addEngineeringNote(payload);
    }
    resetForm();
  };

  const startEdit = (en: EngineeringNote) => {
    setDraft({ projectId: en.projectId, stage: en.stage, notes: en.notes, settings: en.settings });
    setSettingsText(settingsToText(en.settings));
    setEditId(en.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setDraft(blank(activeProjectId ?? ''));
    setSettingsText('');
    setEditId(null);
    setShowForm(false);
  };

  const stageColor: Record<string, string> = {
    tracking: 'purple',
    mixing: 'cyan',
    mastering: '',
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Engineering</div>
          <div className="module-subtitle">
            {activeProject ? `Active project: ${activeProject.name}` : 'Select a project from the header'}
          </div>
        </div>
        {!showForm && activeProjectId && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Note
          </button>
        )}
      </div>

      {showForm && (
        <ModuleCard className="form-panel">
          <h3>{editId ? 'Edit Engineering Note' : 'New Engineering Note'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Stage</label>
              <select
                value={draft.stage}
                onChange={(e) => setDraft({ ...draft, stage: e.target.value })}
              >
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                rows={4}
                placeholder="Describe the session, techniques, and decisions made..."
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              />
            </div>
            <div className="form-group full-width">
              <label>Settings (Key: Value, one per line)</label>
              <textarea
                rows={4}
                placeholder={'Vocal Mic: Neumann U87\nPreamp: API 1073\nSample Rate: 96kHz / 32-bit'}
                value={settingsText}
                onChange={(e) => setSettingsText(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Add Note'}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
          </div>
        </ModuleCard>
      )}

      {!activeProjectId ? (
        <div className="empty-state">
          <div className="empty-icon">⚙</div>
          <h3>No project selected</h3>
          <p>Select an active project from the header dropdown.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚙</div>
          <h3>No engineering notes yet</h3>
          <p>Log your tracking, mixing and mastering decisions here.</p>
        </div>
      ) : (
        <div className="item-list">
          {filtered.map((en) => (
            <ModuleCard key={en.id} className="item-card">
              <div className="item-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="item-card-title" style={{ textTransform: 'capitalize' }}>
                    {en.stage}
                  </div>
                  <span className={`tag ${stageColor[en.stage] ?? ''}`}>{en.stage}</span>
                </div>
                <div className="item-card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => startEdit(en)}>Edit</button>
                </div>
              </div>
              <div className="item-card-body" style={{ marginTop: 8 }}>
                <p style={{ marginBottom: 10 }}>{en.notes}</p>
                {Object.keys(en.settings).length > 0 && (
                  <table className="settings-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(en.settings).map(([k, v]) => (
                        <tr key={k}>
                          <td>{k}</td>
                          <td style={{ color: 'var(--accent-cyan)' }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </ModuleCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Engineering;
