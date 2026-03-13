import ModuleCard from '../components/ModuleCard';

const features = [
  {
    icon: '🎚️',
    title: 'Upload Reference Audio',
    description: 'Drag in any sound — synth, bass, lead, pad — and the system fingerprints its spectral character.',
  },
  {
    icon: '🔍',
    title: 'Preset Library Scan',
    description: 'Your personal VST preset library is searched for the closest sonic matches using AI similarity scoring.',
  },
  {
    icon: '🎛️',
    title: 'Knob-by-Knob Instructions',
    description: 'Get exact parameter values: filter cutoff, resonance, attack, release — every knob mapped to recreate the target sound.',
  },
  {
    icon: '📖',
    title: 'VST Manual Integration',
    description: "Instructions reference your specific VST's parameter names and ranges, not generic descriptions.",
  },
];

function SoundMatch() {
  return (
    <div className="module-page">
      <div className="module-hero">
        <div className="module-hero-icon">🎚️</div>
        <div className="module-hero-content">
          <h2 className="module-hero-title">SoundMatch</h2>
          <p className="module-hero-subtitle">
            Reverse-engineer any sound and recreate it with your own VST presets.
            Upload a reference, match it to your library, get exact instructions.
          </p>
          <div className="module-status-badge">
            <span className="status-dot coming-soon" />
            Coming in Module 2
          </div>
        </div>
      </div>

      <div className="section-title">What SoundMatch Does</div>

      <div className="feature-grid">
        {features.map((f) => (
          <ModuleCard key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-card-title">{f.title}</div>
            <div className="feature-card-desc">{f.description}</div>
          </ModuleCard>
        ))}
      </div>

      <ModuleCard className="coming-soon-panel">
        <div className="coming-soon-content">
          <h3>This module is being built</h3>
          <p>
            SoundMatch will let you upload any reference sound and receive precise, step-by-step
            instructions to recreate it using the VSTs and presets already in your library.
            No guesswork — exact values for every parameter.
          </p>
          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="step-number">1</span>
              <span>Upload reference audio (.wav, .mp3, .flac)</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">2</span>
              <span>System analyzes spectral profile &amp; timbre</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">3</span>
              <span>Scans your preset library for closest matches</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">4</span>
              <span>Returns exact knob values to dial in the sound</span>
            </div>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}

export default SoundMatch;
