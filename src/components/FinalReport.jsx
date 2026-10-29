import ChaosMeter from './ChaosMeter.jsx';
import { MODES } from '../data/parentMessages.js';
import { formatTime, getReportTitle, getVerdict } from '../utils/sessionUtils.js';

export default function FinalReport({ report, onReplay, onHome }) {
  const { simMs, interventions, level, viewed, liked, snoozes, chaos, mode } = report;
  const stats = [
    ['Simulated screen time', formatTime(simMs)],
    ['Parental interventions', interventions],
    ['Highest escalation', level === 0 ? 'None' : `Level ${level}`],
    ['Posts viewed / liked', `${viewed} / ${liked}`],
    ['"5 more minutes" used', snoozes],
  ];
  return (
    <main className="report">
      <div className="report-card">
        <p className="eyebrow">Report card &middot; {MODES[mode].label}</p>
        <h1 className="report-title">{getReportTitle(level)}</h1>
        <div className="stat-grid">
          {stats.map(([k, v]) => (<div key={k} className="stat"><b>{v}</b><span>{k}</span></div>))}
        </div>
        <ChaosMeter score={chaos} />
        <blockquote className="verdict">
          <span>{MODES[mode].speaker}'s verdict</span>
          {getVerdict(level, snoozes)}
        </blockquote>
        <div className="row">
          <button className="btn btn-primary" onClick={onReplay}>Replay</button>
          <button className="btn btn-ghost" onClick={onHome}>Back to home</button>
        </div>
      </div>
    </main>
  );
}
