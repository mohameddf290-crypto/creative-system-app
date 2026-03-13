import ModuleCard from '../components/ModuleCard';

const features = [
  {
    icon: '🎤',
    title: 'AI Voice Synthesis',
    description: 'An AI voice raps your Lyrica-generated lyrics over your full instrumental with natural flow and cadence.',
  },
  {
    icon: '🎵',
    title: 'Full Song Rendering',
    description: 'Not MIDI — full audio output. Your complete song rendered as a playable track.',
  },
  {
    icon: '🕐',
    title: 'Karaoke-Style Sync',
    description: 'Lyrics scroll in real time as the AI voice performs, word by word, perfectly synced to the beat.',
  },
  {
    icon: '🔄',
    title: 'Flow Reference Integration',
    description: 'Reference tracks shape how the AI performs — delivery, pacing, energy, and emphasis.',
  },
];

function Topline() {
  return (
    <div className="module-page">
      <div className="module-hero">
        <div className="module-hero-icon">🎤</div>
        <div className="module-hero-content">
          <h2 className="module-hero-title">Topline</h2>
          <p className="module-hero-subtitle">
            Full produced song with an AI voice rapping your lyrics over the complete instrumental.
            From chords and lyrics to a finished song — all in one flow.
          </p>
          <div className="module-status-badge">
            <span className="status-dot coming-soon" />
            Coming in Module 6
          </div>
        </div>
      </div>

      <div className="section-title">What Topline Does</div>

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
            Topline takes everything from the other modules — your chord progressions, melodies, and
            Lyrica-generated lyrics — and renders a complete song. An AI voice delivers the rap
            with natural flow, synced to your beat, giving you a full demo of your vision.
          </p>
          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="step-number">1</span>
              <span>Select project with chords, melody, and lyrics</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">2</span>
              <span>Choose AI voice style &amp; flow reference</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">3</span>
              <span>System renders full audio track</span>
            </div>
            <div className="workflow-step">
              <span className="step-number">4</span>
              <span>Review with karaoke-style lyric sync</span>
            </div>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}

export default Topline;
