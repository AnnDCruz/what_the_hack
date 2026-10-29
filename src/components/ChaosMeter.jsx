import { chaosLabel, formatTime } from '../utils/sessionUtils.js';

export default function ChaosMeter({ score, compact }) {
  const tone = score < 35 ? 'low' : score < 70 ? 'mid' : 'high';
  return (
    <div className={`meter ${compact ? 'compact' : ''}`}>
      <div className="meter-top"><span>Chaos meter</span><b>{score}%</b></div>
      <div className="meter-bar" role="progressbar" aria-label="Chaos meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className={`meter-fill ${tone}`} style={{ width: `${score}%` }} />
      </div>
      {!compact && <small>{chaosLabel(score)}</small>}
    </div>
  );
}

const STATUS_TEXT = { idle: 'Not started', running: 'Scrolling', paused: 'Paused', ended: 'Ended' };

export function ChaosDashboard({ simMs, level, interventions, viewed, score, status, speedMode }) {
  const items = [
    ['Screen time', formatTime(simMs) + (speedMode === 'demo' ? ' (simulated)' : '')],
    ['Escalation level', level === 0 ? 'None yet' : `Level ${level}`],
    ['Parent interventions', interventions],
    ['Posts viewed', viewed],
    ['Session status', STATUS_TEXT[status]],
  ];
  return (
    <aside className="dashboard" aria-label="Chaos dashboard">
      <h2>Ghar ka Mausam</h2>
      <ChaosMeter score={score} />
      <dl>
        {items.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
    </aside>
  );
}
