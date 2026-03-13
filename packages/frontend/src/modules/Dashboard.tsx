import { useNavigate } from 'react-router-dom';
import ModuleCard from '../components/ModuleCard';
import { useStore } from '../store';

function Dashboard() {
  const navigate = useNavigate();
  const {
    projects,
    chordProgressions,
    melodyLines,
    lyrics,
    engineeringNotes,
    setActiveProject,
  } = useStore();

  const stats = [
    { label: 'Projects', value: projects.length, sub: 'active sessions' },
    { label: 'Chord Progressions', value: chordProgressions.length, sub: 'across all projects' },
    { label: 'Melody Lines', value: melodyLines.length, sub: 'recorded ideas' },
    { label: 'Lyric Entries', value: lyrics.length, sub: 'sections written' },
    { label: 'Eng. Notes', value: engineeringNotes.length, sub: 'production logs' },
  ];

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const quickActions = [
    { label: '+ New Project', path: '/projects' },
    { label: '♩ Add Chords', path: '/chords' },
    { label: '♫ Add Melody', path: '/melody' },
    { label: '✦ Write Lyrics', path: '/lyrics' },
    { label: '⚙ Engineering', path: '/engineering' },
  ];

  return (
    <div className="module-page">
      <div className="welcome-banner">
        <h2>Welcome back to Creative System</h2>
        <p>
          Your music production workspace. Brainstorm chords, craft melodies, write lyrics, and
          track your engineering sessions — all in one place.
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <ModuleCard key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </ModuleCard>
        ))}
      </div>

      <div className="section-title">Recent Projects</div>

      {recentProjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◈</div>
          <h3>No projects yet</h3>
          <p>Head to Projects to create your first session.</p>
        </div>
      ) : (
        <div className="cards-grid" style={{ marginBottom: 28 }}>
          {recentProjects.map((p) => (
            <ModuleCard
              key={p.id}
              className="project-card"
              onClick={() => {
                setActiveProject(p.id);
                navigate('/projects');
              }}
            >
              <div className="project-card-name">{p.name}</div>
              <div className="project-card-meta">
                <span className="tag purple">{p.key}</span>
                <span className="tag cyan">{p.tempo} BPM</span>
                <span className="tag">{p.genre}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Updated {new Date(p.updatedAt).toLocaleDateString()}
              </div>
            </ModuleCard>
          ))}
        </div>
      )}

      <div className="section-title">Quick Actions</div>
      <div className="quick-actions">
        {quickActions.map((qa) => (
          <button
            key={qa.path}
            className="quick-action-btn"
            onClick={() => navigate(qa.path)}
          >
            {qa.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
