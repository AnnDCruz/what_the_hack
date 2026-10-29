import { useEffect, useRef } from 'react';
import FeedPost from './FeedPost.jsx';
import ChaosMeter, { ChaosDashboard } from './ChaosMeter.jsx';
import { INTERVAL_MS } from '../hooks/useSessionTimer.js';
import { formatTime, formatCount } from '../utils/sessionUtils.js';

const Icon = ({ d, fill }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill={fill ? '#FF3D81' : 'none'} stroke={fill ? '#FF3D81' : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export default function FeedScreen({ timer, post, index, total, liked, onLike, onNav, onEnd, onOpenLog, interventions, viewed, score, blocked, shakeClass }) {
  const touchY = useRef(null);
  const wheelAt = useRef(0);
  const running = timer.status === 'running';

  useEffect(() => {
    if (!running) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') onNav(1);
      else if (e.key === 'ArrowUp') onNav(-1);
      else if (e.key === 'l' || e.key === 'L') onLike();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [running, onNav, onLike]);

  const onWheel = (e) => {
    if (!running || Math.abs(e.deltaY) < 20 || Date.now() - wheelAt.current < 600) return;
    wheelAt.current = Date.now();
    onNav(e.deltaY > 0 ? 1 : -1);
  };
  const onTouchEnd = (e) => {
    if (!running || touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 50) onNav(dy > 0 ? 1 : -1);
    touchY.current = null;
  };

  const untilNext = INTERVAL_MS - (timer.simMs % INTERVAL_MS);
  const progress = ((timer.simMs % INTERVAL_MS) / INTERVAL_MS) * 100;
  const isDemo = timer.speedMode === 'demo';

  return (
    <main className={`stage ${shakeClass}`}>
      <div className="phone" onWheel={onWheel} onTouchStart={(e) => { touchY.current = e.touches[0].clientY; }} onTouchEnd={onTouchEnd}>
        <FeedPost key={post.id} post={post} liked={liked} onLike={onLike} />

        <header className="hud">
          <div className="hud-row">
            <div className="chip" aria-label="Session time">
              {formatTime(timer.simMs)}
              {isDemo && <em>DEMO &times;48</em>}
            </div>
            <ChaosMeter score={score} compact />
            <button className="icon-btn" aria-label={running ? 'Pause session' : 'Resume session'} onClick={running ? timer.pause : timer.resume} disabled={blocked}>
              {running ? 'II' : '\u25B6'}
            </button>
          </div>
          <div className="next-call" aria-label="Progress to next parent message">
            <div className="next-bar"><div style={{ width: `${progress}%` }} /></div>
            <small>Next parent message in {formatTime(untilNext)}{isDemo ? ' (simulated)' : ''}</small>
          </div>
        </header>

        <nav className="rail" aria-label="Post controls">
          <button className="rail-btn" aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked} onClick={onLike}>
            <Icon fill={liked} d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" />
            <span>{formatCount(post.likes + (liked ? 1 : 0))}</span>
          </button>
          <button className="rail-btn" aria-label="Previous post" onClick={() => onNav(-1)}><Icon d="M6 15l6-6 6 6" /><span>Prev</span></button>
          <button className="rail-btn" aria-label="Next post" onClick={() => onNav(1)}><Icon d="M6 9l6 6 6-6" /><span>Next</span></button>
          <button className="rail-btn" aria-label="Open parent message log" onClick={onOpenLog}><Icon d="M4 5h16v11H8l-4 4z" /><span>Log {interventions}</span></button>
        </nav>

        <footer className="foot">
          <small>Post {index + 1} / {total}</small>
          <button className="btn btn-ghost btn-sm" onClick={onEnd}>End session</button>
        </footer>
        <button className="dev-btn" title="Dev: trigger next escalation" aria-label="Developer: trigger next escalation now" onClick={timer.skipToNext}>skip</button>

        {timer.status === 'paused' && !blocked && (
          <div className="paused">
            <h2>Session paused</h2>
            <p>Timer stopped. Parents are still watching.</p>
            <button className="btn btn-primary" onClick={timer.resume}>Resume</button>
          </div>
        )}
      </div>
      <ChaosDashboard simMs={timer.simMs} level={timer.level} interventions={interventions} viewed={viewed} score={score} status={timer.status} speedMode={timer.speedMode} />
    </main>
  );
}
