import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './modules/Dashboard';
import Projects from './modules/Projects';
import Chords from './modules/Chords';
import Melody from './modules/Melody';
import Lyrics from './modules/Lyrics';
import Engineering from './modules/Engineering';

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="module-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/melody" element={<Melody />} />
            <Route path="/lyrics" element={<Lyrics />} />
            <Route path="/engineering" element={<Engineering />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
