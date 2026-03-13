import { useStore } from '../store';

declare global {
  interface Window {
    __TAURI__?: {
      window: {
        appWindow: {
          minimize: () => Promise<void>;
          toggleMaximize: () => Promise<void>;
          close: () => Promise<void>;
        };
      };
    };
  }
}

async function minimizeWindow() {
  try {
    const { appWindow } = await import('@tauri-apps/api/window');
    await appWindow.minimize();
  } catch {
    // Running in browser mode — no-op
  }
}

async function maximizeWindow() {
  try {
    const { appWindow } = await import('@tauri-apps/api/window');
    await appWindow.toggleMaximize();
  } catch {
    // Running in browser mode — no-op
  }
}

async function closeWindow() {
  try {
    const { appWindow } = await import('@tauri-apps/api/window');
    await appWindow.close();
  } catch {
    // Running in browser mode — no-op
  }
}

function Titlebar() {
  const { activeProjectId, projects } = useStore();
  const activeProject = projects.find((p) => p.id === activeProjectId);

  return (
    <div className="titlebar" data-tauri-drag-region>
      <div className="titlebar-left" data-tauri-drag-region>
        <div className="titlebar-logo" data-tauri-drag-region>
          <span className="titlebar-logo-mark">◈</span>
          <span className="titlebar-logo-text">Creative System</span>
        </div>
        {activeProject && (
          <span className="titlebar-project-badge" aria-label={`Active project: ${activeProject.name}`}>
            {activeProject.name}
          </span>
        )}
      </div>

      <div className="titlebar-controls" role="group" aria-label="Window controls">
        <button
          className="titlebar-btn minimize"
          onClick={minimizeWindow}
          aria-label="Minimize window"
          title="Minimize"
        >
          <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor" aria-hidden="true">
            <rect width="10" height="1" rx="0.5" />
          </svg>
        </button>
        <button
          className="titlebar-btn maximize"
          onClick={maximizeWindow}
          aria-label="Maximize window"
          title="Maximize"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <rect x="1" y="1" width="8" height="8" rx="1.5" />
          </svg>
        </button>
        <button
          className="titlebar-btn close"
          onClick={closeWindow}
          aria-label="Close window"
          title="Close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
            <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
            <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Titlebar;
