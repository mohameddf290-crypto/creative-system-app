import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useStore, LyricEntry } from '../store';

type LEDraft = Omit<LyricEntry, 'id'>;

const SECTIONS = ['verse', 'chorus', 'bridge', 'pre-chorus', 'outro', 'intro', 'hook'];

const blank = (projectId: string): LEDraft => ({
  projectId,
  section: 'verse',
  lines: [],
  theme: '',
});

function Lyrics() {
  const { projects, activeProjectId, lyrics, addLyricEntry, updateLyricEntry } = useStore();

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<LEDraft>(blank(activeProjectId ?? ''));
  const [linesText, setLinesText] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const filtered = lyrics.filter((ly) => ly.projectId === activeProjectId);

  const handleSubmit = () => {
    const lines = linesText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) return;
    const payload = { ...draft, lines };
    if (editId) {
      updateLyricEntry(editId, payload);
      setEditId(null);
    } else {
      addLyricEntry(payload);
    }
    resetForm();
  };

  const startEdit = (le: LyricEntry) => {
    setDraft({ projectId: le.projectId, section: le.section, lines: le.lines, theme: le.theme });
    setLinesText(le.lines.join('\n'));
    setEditId(le.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setDraft(blank(activeProjectId ?? ''));
    setLinesText('');
    setEditId(null);
    setShowForm(false);
  };

  const sectionColor = (section: string) => {
    const map: Record<string, string> = {
      verse: 'purple',
      chorus: 'cyan',
      bridge: '',
      'pre-chorus': '',
    };
    return map[section] ?? '';
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Lyrics</div>
          <div className="module-subtitle">
            {activeProject ? `Active project: ${activeProject.name}` : 'Select a project from the header'}
          </div>
        </div>
        {!showForm && activeProjectId && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Entry
          </button>
        )}
      </div>

      {showForm && (
        <ModuleCard className="form-panel">
          <h3>{editId ? 'Edit Lyric Entry' : 'New Lyric Entry'}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Section</label>
              <select
                value={draft.section}
                onChange={(e) => setDraft({ ...draft, section: e.target.value })}
              >
                {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Theme / Concept</label>
              <input
                type="text"
                placeholder="e.g. isolation / searching"
                value={draft.theme}
                onChange={(e) => setDraft({ ...draft, theme: e.target.value })}
              />
            </div>
            <div className="form-group full-width">
              <label>Lines (one per line)</label>
              <textarea
                rows={6}
                placeholder={'Moving through the static noise\nSearching for a clearer voice'}
                value={linesText}
                onChange={(e) => setLinesText(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Add Entry'}
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>Cancel</button>
          </div>
        </ModuleCard>
      )}

      {!activeProjectId ? (
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>No project selected</h3>
          <p>Select an active project from the header dropdown.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>No lyrics yet</h3>
          <p>Start writing sections for this project.</p>
        </div>
      ) : (
        <div className="item-list">
          {filtered.map((le) => (
            <ModuleCard key={le.id} className="item-card">
              <div className="item-card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <div className="item-card-title" style={{ textTransform: 'capitalize' }}>
                      {le.section}
                    </div>
                    {le.theme && (
                      <span className={`tag ${sectionColor(le.section)}`}>{le.theme}</span>
                    )}
                  </div>
                </div>
                <div className="item-card-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => startEdit(le)}>Edit</button>
                </div>
              </div>
              <div className="item-card-body">
                {le.lines.map((line, i) => (
                  <div key={i} style={{ padding: '2px 0' }}>
                    {line}
                  </div>
                ))}
              </div>
            </ModuleCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Lyrics;
