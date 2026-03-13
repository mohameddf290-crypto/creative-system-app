import { useLocation } from 'react-router-dom';
import { useStore } from '../store';

const VIEW_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/soundmatch': 'SoundMatch',
  '/chords': 'Chords',
  '/melody': 'Melody',
  '/lyrics': 'Lyrics',
  '/topline': 'Topline',
  '/engineering': 'Engineering',
  '/settings': 'Settings',
};

function Header() {
  const location = useLocation();
  const { projects, activeProjectId, setActiveProject } = useStore();

  const activeProject = projects.find((p) => p.id === activeProjectId);
  const viewLabel = VIEW_LABELS[location.pathname] ?? 'Creative System';

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-view-title">{viewLabel}</span>
        {activeProject && (
          <>
            <span className="header-separator">›</span>
            <span className="active-project-badge">{activeProject.name}</span>
          </>
        )}
      </div>

      <div className="header-right">
        <select
          className="project-selector"
          value={activeProjectId ?? ''}
          onChange={(e) => setActiveProject(e.target.value)}
          aria-label="Select active project"
        >
          {projects.length === 0 && (
            <option value="" disabled>
              No projects
            </option>
          )}
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
