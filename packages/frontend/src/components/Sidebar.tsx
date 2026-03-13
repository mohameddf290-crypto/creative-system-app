import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { path: '/projects', label: 'Projects', icon: '◈' },
  { path: '/chords', label: 'Chords', icon: '♩' },
  { path: '/melody', label: 'Melody', icon: '♫' },
  { path: '/lyrics', label: 'Lyrics', icon: '✦' },
  { path: '/engineering', label: 'Engineering', icon: '⚙' },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Creative System</h1>
        <p>Music Brainstorming</p>
      </div>

      <span className="sidebar-section-label">Workspace</span>

      <nav className="sidebar-nav">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={() =>
              `sidebar-link${location.pathname === path ? ' active' : ''}`
            }
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
