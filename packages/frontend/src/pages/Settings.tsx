import { useStore } from '../store';
import ModuleCard from '../components/ModuleCard';

const APP_VERSION = '0.1.0';

const AUDIO_DEVICES = [
  'System Default',
  'Built-in Output',
  'Headphones',
  'External Audio Interface',
];

function Settings() {
  const { settings, updateSettings } = useStore();

  return (
    <div className="module-page">
      <div className="module-header">
        <div>
          <div className="module-title">Settings</div>
          <div className="module-subtitle">Preferences and configuration</div>
        </div>
      </div>

      {/* Appearance */}
      <div className="section-title">Appearance</div>
      <ModuleCard className="settings-section">
        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Theme</div>
            <div className="settings-row-desc">Choose between dark and light mode</div>
          </div>
          <div className="theme-toggle-group" role="group" aria-label="Theme selection">
            <button
              className={`theme-toggle-btn${settings.theme === 'dark' ? ' active' : ''}`}
              onClick={() => updateSettings({ theme: 'dark' })}
              aria-pressed={settings.theme === 'dark'}
            >
              🌙 Dark
            </button>
            <button
              className={`theme-toggle-btn${settings.theme === 'light' ? ' active' : ''}`}
              onClick={() => updateSettings({ theme: 'light' })}
              aria-pressed={settings.theme === 'light'}
            >
              ☀️ Light
            </button>
          </div>
        </div>
      </ModuleCard>

      {/* Audio */}
      <div className="section-title" style={{ marginTop: 28 }}>Audio</div>
      <ModuleCard className="settings-section">
        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Output Device</div>
            <div className="settings-row-desc">Audio device used for playback</div>
          </div>
          <select
            className="settings-select"
            value={settings.audioDevice}
            onChange={(e) => updateSettings({ audioDevice: e.target.value })}
            aria-label="Audio output device"
          >
            {AUDIO_DEVICES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </ModuleCard>

      {/* File System */}
      <div className="section-title" style={{ marginTop: 28 }}>File System</div>
      <ModuleCard className="settings-section">
        <div className="settings-row">
          <div className="settings-row-info">
            <div className="settings-row-label">Default Project Directory</div>
            <div className="settings-row-desc">Where new projects are saved by default</div>
          </div>
          <div className="settings-path-row">
            <input
              type="text"
              className="settings-path-input"
              value={settings.defaultProjectDir}
              onChange={(e) => updateSettings({ defaultProjectDir: e.target.value })}
              placeholder="~/Documents/CreativeSystem"
              aria-label="Default project directory"
            />
            <button
              className="btn btn-secondary btn-sm"
              aria-label="Browse for directory"
            >
              Browse
            </button>
          </div>
        </div>
      </ModuleCard>

      {/* About */}
      <div className="section-title" style={{ marginTop: 28 }}>About</div>
      <ModuleCard className="settings-section about-section">
        <div className="about-app-name">Creative System</div>
        <div className="about-app-tagline">Music Production Intelligence Platform</div>
        <div className="about-meta">
          <div className="about-meta-row">
            <span className="about-meta-label">Version</span>
            <span className="about-meta-value">{APP_VERSION}</span>
          </div>
          <div className="about-meta-row">
            <span className="about-meta-label">Built with</span>
            <span className="about-meta-value">Tauri · React · TypeScript</span>
          </div>
          <div className="about-meta-row">
            <span className="about-meta-label">Modules</span>
            <span className="about-meta-value">
              SoundMatch · Chords · Melody · Lyrics · Topline · Engineering
            </span>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}

export default Settings;
