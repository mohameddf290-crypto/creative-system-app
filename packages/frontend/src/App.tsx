import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Titlebar from './components/Titlebar';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './modules/Dashboard';
import Projects from './modules/Projects';
import SoundMatch from './modules/SoundMatch';
import Chords from './modules/Chords';
import Melody from './modules/Melody';
import Lyrics from './modules/Lyrics';
import Topline from './modules/Topline';
import Engineering from './modules/Engineering';
import Settings from './pages/Settings';
import { useStore } from './store';

function App() {
  const { settings } = useStore();

  return (
    <div className={`app-root theme-${settings.theme}`}>
      <Titlebar />
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="module-container">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ErrorBoundary moduleName="Dashboard">
                    <Dashboard />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/projects"
                element={
                  <ErrorBoundary moduleName="Projects">
                    <Projects />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/soundmatch"
                element={
                  <ErrorBoundary moduleName="SoundMatch">
                    <SoundMatch />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/chords"
                element={
                  <ErrorBoundary moduleName="Chords">
                    <Chords />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/melody"
                element={
                  <ErrorBoundary moduleName="Melody">
                    <Melody />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/lyrics"
                element={
                  <ErrorBoundary moduleName="Lyrics">
                    <Lyrics />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/topline"
                element={
                  <ErrorBoundary moduleName="Topline">
                    <Topline />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/engineering"
                element={
                  <ErrorBoundary moduleName="Engineering">
                    <Engineering />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/settings"
                element={
                  <ErrorBoundary moduleName="Settings">
                    <Settings />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
