import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '../store';

const moduleItems = [
  { path: '/soundmatch', label: 'SoundMatch', icon: '🎚️', description: 'Reverse-engineer sounds' },
  { path: '/chords', label: 'Chords', icon: '♩', description: 'Extract chord progressions' },
  { path: '/melody', label: 'Melody', icon: '♫', description: 'Generate melodies' },
  { path: '/lyrics', label: 'Lyrics', icon: '✦', description: 'Write rap lyrics' },
  { path: '/topline', label: 'Topline', icon: '🎤', description: 'Full song with AI voice' },
  { path: '/engineering', label: 'Engineering', icon: '⚙', description: 'Mix & mastering guidance' },
];

const workspaceItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { path: '/projects', label: 'Projects', icon: '◈' },
];

const bottomItems = [
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();

  return (
    <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`} aria-label="Main navigation">
      {/* Collapse toggle */}
      <button
        className="sidebar-collapse-btn"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={sidebarCollapsed ? 'Expand' : 'Collapse'}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 250ms ease' }}
        >
          <polyline points="9 2 4 7 9 12" />
        </svg>
      </button>

      {/* Logo */}
      <div className="sidebar-logo" aria-hidden={sidebarCollapsed}>
        <h1>Creative System</h1>
        {!sidebarCollapsed && <p>Music Production</p>}
      </div>

      {/* Workspace */}
      {!sidebarCollapsed && <span className="sidebar-section-label">Workspace</span>}
      <nav className="sidebar-nav" aria-label="Workspace">
        {workspaceItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={() =>
              `sidebar-link${location.pathname === path ? ' active' : ''}`
            }
            title={sidebarCollapsed ? label : undefined}
            aria-label={label}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            {!sidebarCollapsed && <span className="nav-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Modules */}
      {!sidebarCollapsed && <span className="sidebar-section-label">Modules</span>}
      <nav className="sidebar-nav" aria-label="Modules">
        {moduleItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={() =>
              `sidebar-link${location.pathname === path ? ' active' : ''}`
            }
            title={sidebarCollapsed ? label : undefined}
            aria-label={label}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            {!sidebarCollapsed && <span className="nav-label">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Settings */}
      <div className="sidebar-bottom">
        {bottomItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={() =>
              `sidebar-link${location.pathname === path ? ' active' : ''}`
            }
            title={sidebarCollapsed ? label : undefined}
            aria-label={label}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            {!sidebarCollapsed && <span className="nav-label">{label}</span>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
