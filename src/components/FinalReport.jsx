
import ChaosMeter from './ChaosMeter.jsx';
import { MODES } from '../data/parentMessages.js';
import { formatTime, getReportTitle, getVerdict } from '../utils/sessionUtils.js';

export default function FinalReport({ report, onReplay, onHome }) {
  const {
    simMs,
    interventions,
    level,
    viewed,
    liked,
    snoozes,
    chaos,
    mode,
  } = report;

  const stats = [
    ['Total screen time', formatTime(simMs)],
    ['Parent warnings', interventions],
    ['Highest drama level', level === 0 ? 'Abhi tak none!' : `Level ${level}`],
    ['Posts seen / liked', `${viewed} / ${liked}`],
    ['"5 more minutes" excuses', snoozes],
  ];

  return (
    <main className="report">
      <div className="report-card">
        <p className="eyebrow">
          Sanskaar Report Card · {MODES[mode].label}
        </p>

        <h1 className="report-title">{getReportTitle(level)}</h1>

        <div className="stat-grid">
          {stats.map(([k, v]) => (
            <div key={k} className="stat">
              <b>{v}</b>
              <span>{k}</span>
            </div>
          ))}
        </div>

        <ChaosMeter score={chaos} />

        <blockquote className="verdict">
          <span>{MODES[mode].speaker}'s final verdict</span>
          {getVerdict(level, snoozes)}
        </blockquote>

        <div className="row">
          <button className="btn btn-primary" onClick={onReplay}>
            Play Again, Beta!
          </button>

          <button className="btn btn-ghost" onClick={onHome}>
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
