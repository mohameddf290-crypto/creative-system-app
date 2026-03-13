import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../modules/Dashboard';
import SoundMatch from '../modules/SoundMatch';
import Topline from '../modules/Topline';
import Settings from '../pages/Settings';
import { useStore } from '../store';

// Helper to wrap components that need a router
function renderWithRouter(ui: React.ReactElement, { initialEntries = ['/'] } = {}) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
}

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(document.querySelector('.app-shell')).toBeInTheDocument();
  });

  it('renders the sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    // 'Creative System' now appears in titlebar + sidebar — use getAllByText
    expect(screen.getAllByText('Creative System').length).toBeGreaterThan(0);
    // 'Dashboard' appears in sidebar and header — use getAllByText
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
  });

  it('renders all 6 module links in the sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /SoundMatch/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Chords/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Melody/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Lyrics/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Topline/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Engineering/i })).toBeInTheDocument();
  });

  it('renders the Settings link in the sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();
  });

  it('renders the titlebar', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(document.querySelector('.titlebar')).toBeInTheDocument();
  });

  it('renders the sidebar collapse button', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /collapse sidebar/i })).toBeInTheDocument();
  });
});

describe('Dashboard', () => {
  it('shows stats cards with correct labels', () => {
    renderWithRouter(<Dashboard />, { initialEntries: ['/dashboard'] });
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Chord Progressions')).toBeInTheDocument();
    expect(screen.getByText('Melody Lines')).toBeInTheDocument();
    expect(screen.getByText('Lyric Entries')).toBeInTheDocument();
  });

  it('shows the welcome banner', () => {
    renderWithRouter(<Dashboard />, { initialEntries: ['/dashboard'] });
    expect(screen.getByText(/Welcome back to Creative System/i)).toBeInTheDocument();
  });

  it('shows recent projects section', () => {
    renderWithRouter(<Dashboard />, { initialEntries: ['/dashboard'] });
    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('displays mock project names', () => {
    renderWithRouter(<Dashboard />, { initialEntries: ['/dashboard'] });
    expect(screen.getByText('Midnight Resonance')).toBeInTheDocument();
  });

  it('shows quick action buttons', () => {
    renderWithRouter(<Dashboard />, { initialEntries: ['/dashboard'] });
    expect(screen.getByText('+ New Project')).toBeInTheDocument();
    expect(screen.getByText('♩ Add Chords')).toBeInTheDocument();
  });
});

describe('SoundMatch module', () => {
  it('renders the module hero', () => {
    renderWithRouter(<SoundMatch />, { initialEntries: ['/soundmatch'] });
    expect(screen.getByText('SoundMatch')).toBeInTheDocument();
    expect(screen.getByText(/Reverse-engineer any sound/i)).toBeInTheDocument();
  });

  it('shows the 4 feature cards', () => {
    renderWithRouter(<SoundMatch />, { initialEntries: ['/soundmatch'] });
    expect(screen.getByText('Upload Reference Audio')).toBeInTheDocument();
    expect(screen.getByText('Preset Library Scan')).toBeInTheDocument();
    expect(screen.getByText('Knob-by-Knob Instructions')).toBeInTheDocument();
    expect(screen.getByText('VST Manual Integration')).toBeInTheDocument();
  });

  it('shows the workflow steps', () => {
    renderWithRouter(<SoundMatch />, { initialEntries: ['/soundmatch'] });
    // Multiple elements match 'Upload reference audio' — use getAllByText
    expect(screen.getAllByText(/Upload reference audio/i).length).toBeGreaterThan(0);
  });
});

describe('Topline module', () => {
  it('renders the module hero', () => {
    renderWithRouter(<Topline />, { initialEntries: ['/topline'] });
    expect(screen.getByText('Topline')).toBeInTheDocument();
    expect(screen.getByText(/Full produced song/i)).toBeInTheDocument();
  });

  it('shows the 4 feature cards', () => {
    renderWithRouter(<Topline />, { initialEntries: ['/topline'] });
    expect(screen.getByText('AI Voice Synthesis')).toBeInTheDocument();
    expect(screen.getByText('Full Song Rendering')).toBeInTheDocument();
    expect(screen.getByText('Karaoke-Style Sync')).toBeInTheDocument();
    expect(screen.getByText('Flow Reference Integration')).toBeInTheDocument();
  });
});

describe('Settings page', () => {
  beforeEach(() => {
    useStore.setState({
      settings: { theme: 'dark', audioDevice: 'System Default', defaultProjectDir: '~/Documents/CreativeSystem' },
    });
  });

  it('renders the settings page', () => {
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Preferences and configuration')).toBeInTheDocument();
  });

  it('shows appearance section with theme toggle', () => {
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument();
  });

  it('shows audio section with device selector', () => {
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /audio output device/i })).toBeInTheDocument();
  });

  it('shows about section with version', () => {
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('0.1.0')).toBeInTheDocument();
  });

  it('toggles theme to light when light button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    const lightBtn = screen.getByRole('button', { name: /light/i });
    await user.click(lightBtn);
    expect(useStore.getState().settings.theme).toBe('light');
  });

  it('toggles theme back to dark', async () => {
    const user = userEvent.setup();
    useStore.setState({
      settings: { theme: 'light', audioDevice: 'System Default', defaultProjectDir: '~/Documents/CreativeSystem' },
    });
    renderWithRouter(<Settings />, { initialEntries: ['/settings'] });
    const darkBtn = screen.getByRole('button', { name: /dark/i });
    await user.click(darkBtn);
    expect(useStore.getState().settings.theme).toBe('dark');
  });
});

describe('Store actions', () => {
  beforeEach(() => {
    // Reset store to initial mock state for each test
    useStore.setState({
      projects: [
        {
          id: 'test-proj-1',
          name: 'Test Project',
          tempo: 120,
          key: 'C',
          genre: 'Test',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      activeProjectId: 'test-proj-1',
    });
  });

  it('addProject creates a new project with id and timestamps', () => {
    const { addProject } = useStore.getState();
    addProject({ name: 'New Track', tempo: 140, key: 'Am', genre: 'Hip-Hop' });
    const projects = useStore.getState().projects;
    expect(projects).toHaveLength(2);
    const added = projects.find((p) => p.name === 'New Track');
    expect(added).toBeDefined();
    expect(added?.id).toBeTruthy();
    expect(added?.createdAt).toBeTruthy();
  });

  it('updateProject updates fields and updatedAt', () => {
    const { updateProject } = useStore.getState();
    updateProject('test-proj-1', { name: 'Renamed Project', tempo: 95 });
    const p = useStore.getState().projects.find((p) => p.id === 'test-proj-1');
    expect(p?.name).toBe('Renamed Project');
    expect(p?.tempo).toBe(95);
  });

  it('deleteProject removes the project and its related data', () => {
    const { addChordProgression, deleteProject } = useStore.getState();
    addChordProgression({
      projectId: 'test-proj-1',
      name: 'Test Chords',
      chords: ['C', 'G'],
      key: 'C',
      mode: 'major',
    });
    deleteProject('test-proj-1');
    const { projects, chordProgressions } = useStore.getState();
    expect(projects.find((p) => p.id === 'test-proj-1')).toBeUndefined();
    expect(chordProgressions.filter((cp) => cp.projectId === 'test-proj-1')).toHaveLength(0);
  });

  it('setCurrentView updates the currentView', () => {
    const { setCurrentView } = useStore.getState();
    setCurrentView('chords');
    expect(useStore.getState().currentView).toBe('chords');
  });

  it('addChordProgression creates a progression', () => {
    const { addChordProgression } = useStore.getState();
    addChordProgression({
      projectId: 'test-proj-1',
      name: 'My Progression',
      chords: ['Am', 'F', 'C', 'G'],
      key: 'Am',
      mode: 'natural minor',
    });
    const cps = useStore.getState().chordProgressions.filter((cp) => cp.projectId === 'test-proj-1');
    expect(cps.some((cp) => cp.name === 'My Progression')).toBe(true);
  });

  it('setSidebarCollapsed toggles sidebar state', () => {
    const { setSidebarCollapsed } = useStore.getState();
    setSidebarCollapsed(true);
    expect(useStore.getState().sidebarCollapsed).toBe(true);
    setSidebarCollapsed(false);
    expect(useStore.getState().sidebarCollapsed).toBe(false);
  });

  it('updateSettings merges partial settings', () => {
    useStore.setState({
      settings: { theme: 'dark', audioDevice: 'System Default', defaultProjectDir: '~/Documents/CreativeSystem' },
    });
    const { updateSettings } = useStore.getState();
    updateSettings({ theme: 'light' });
    const { settings } = useStore.getState();
    expect(settings.theme).toBe('light');
    expect(settings.audioDevice).toBe('System Default');
  });
});

describe('Navigation', () => {
  it('renders dashboard when navigating to /dashboard', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome back to Creative System/i)).toBeInTheDocument();
  });

  it('navigates to projects page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    const projectsLinks = screen.getAllByText('Projects');
    await user.click(projectsLinks[0]);
    expect(screen.getByText('Manage your music production sessions')).toBeInTheDocument();
  });

  it('navigates to SoundMatch page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByRole('link', { name: /SoundMatch/i }));
    expect(screen.getByText(/Reverse-engineer any sound/i)).toBeInTheDocument();
  });

  it('navigates to Topline page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByRole('link', { name: /Topline/i }));
    expect(screen.getByText(/Full produced song/i)).toBeInTheDocument();
  });

  it('navigates to Settings page', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByRole('link', { name: /Settings/i }));
    expect(screen.getByText('Preferences and configuration')).toBeInTheDocument();
  });

  it('collapses the sidebar', async () => {
    const user = userEvent.setup();
    useStore.setState({ sidebarCollapsed: false });
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    const collapseBtn = screen.getByRole('button', { name: /collapse sidebar/i });
    await user.click(collapseBtn);
    expect(useStore.getState().sidebarCollapsed).toBe(true);
  });
});
