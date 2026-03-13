import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../modules/Dashboard';
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
    expect(screen.getByText('Creative System')).toBeInTheDocument();
    // 'Dashboard' appears in sidebar and header — use getAllByText
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
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
});
