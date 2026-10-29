import { MODES } from '../data/parentMessages.js';

export default function SessionSetup({ mode, setMode, speedMode, setSpeedMode }) {
  return (
    <section className="setup" aria-label="Session setup">
      <h2 className="setup-h">Choose your parent</h2>
      <div className="mode-grid" role="radiogroup" aria-label="Parent mode">
        {Object.entries(MODES).map(([key, m]) => (
          <button key={key} role="radio" aria-checked={mode === key}
            className={`mode-card mode-${key} ${mode === key ? 'on' : ''}`} onClick={() => setMode(key)}>
            <strong>{m.label}</strong>
            <span>{m.blurb}</span>
          </button>
        ))}
      </div>
      <div className="speed-row">
        <div>
          <strong>Speed: {speedMode === 'demo' ? 'DEMO (simulated)' : 'Normal (real time)'}</strong>
          <small>{speedMode === 'demo' ? '1 hour of screen time passes in about 75 seconds.' : 'First parent message arrives after a real 15 minutes.'}</small>
        </div>
        <button className="btn btn-ghost" onClick={() => setSpeedMode(speedMode === 'demo' ? 'normal' : 'demo')}>
          Switch to {speedMode === 'demo' ? 'normal' : 'demo'}
        </button>
      </div>
    </section>
  );
}
