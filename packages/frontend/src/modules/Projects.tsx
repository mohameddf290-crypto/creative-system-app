import { useState } from 'react';
import ModuleCard from '../components/ModuleCard';
import { useStore, Project } from '../store';

type ProjectDraft = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

const BLANK_DRAFT: ProjectDraft = { name: '', tempo: 120, key: 'C', genre: '' };

const KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B',
               'Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', 'F#m'];

function Projects() {
  const { projects, activeProjectId, setActiveProject, addProject, updateProject, deleteProject } =
    useStore();

  const [draft, setDraft] = useState<ProjectDraft>(BLANK_DRAFT);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!draft.name.trim()) return;
    if (editId) {
      updateProject(editId, draft);
      setEditId(null);
    } else {
      addProject(draft);
    }
    setDraft(BLANK_DRAFT);
    setShowForm(false);
  };

  const startEdit = (p: Project) => {
    setDraft({ name: p.name, tempo: p.tempo, key: p.key, genre: p.genre });
    setEditId(p.id);
    setShowForm(true);
  };

  const cancelForm = () => {
    setDraft(BLANK_DRAFT);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Projects</div>
          <div className="module-subtitle">Manage your music production sessions</div>
        </div>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + New Project
          </button>
        )}
      </div>

      {showForm && (
        <ModuleCard className="form-panel">
          <h3>{editId ? 'Edit Project' : 'New Project'}</h3>
          <div className="form-grid">
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Project Name</label>
              <input
                type="text"
                placeholder="e.g. Midnight Resonance"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
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
            <div className="form-group">
              <label>Key</label>
              <select value={draft.key} onChange={(e) => setDraft({ ...draft, key: e.target.value })}>
                {KEYS.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Genre</label>
              <input
                type="text"
                placeholder="e.g. Neo-Soul / Electronic"
                value={draft.genre}
                onChange={(e) => setDraft({ ...draft, genre: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editId ? 'Save Changes' : 'Create Project'}
            </button>
            <button className="btn btn-secondary" onClick={cancelForm}>
              Cancel
            </button>
          </div>
        </ModuleCard>
      )}

      {projects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◈</div>
          <h3>No projects yet</h3>
          <p>Create your first project to get started.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + New Project
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {projects.map((p) => (
            <ModuleCard
              key={p.id}
              className="project-card"
              active={p.id === activeProjectId}
              onClick={() => setActiveProject(p.id)}
            >
              <div className="project-card-name">{p.name}</div>
              <div className="project-card-meta">
                <span className="tag purple">{p.key}</span>
                <span className="tag cyan">{p.tempo} BPM</span>
                <span className="tag">{p.genre}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
                Created {new Date(p.createdAt).toLocaleDateString()} · Updated{' '}
                {new Date(p.updatedAt).toLocaleDateString()}
              </div>
              <div className="item-card-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProject(p.id)}
                >
                  Delete
                </button>
              </div>
            </ModuleCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
