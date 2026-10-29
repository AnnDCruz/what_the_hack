
import { useEffect, useRef, useState } from 'react';
import Sprite from './Sprite.jsx';



function Compare({ viewed }) {
  return (
    <div className="compare" aria-hidden="true">
      <div>
        <span>Sharma Ji ka beta: 2 chapters</span>
        <i style={{ width: '90%' }} />
      </div>
      <div>
        <span>Tum: {viewed} reels</span>
        <i
          className="you"
          style={{ width: `${Math.min(100, 12 + viewed * 6)}%` }}
        />
      </div>
    </div>
  );
}

function PapaStatus() {
  return (
    <ul className="papa">
      <li>Papa ko call lag rahi hai...</li>
      <li>Papa ne phone utha liya.</li>
      <li>Papa: "Ghar aake baat karte hain."</li>
    </ul>
  );
}

function Countdown() {
  const [n, setN] = useState(10);

  useEffect(() => {
    const id = setInterval(
      () => setN((v) => Math.max(0, v - 1)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown">
      {n > 0
        ? `Wi-Fi password badalne mein ${n}...`
        : 'Wi-Fi password change ho gaya.'}
    </div>
  );
}

function characterFor(from, mode) {
  const name = `${from || ''} ${mode || ''}`.toLowerCase();

  if (name.includes('aunty')) return 'aunty';
  if (name.includes('uncle')) return 'uncle';
  if (name.includes('dad') || name.includes('papa')) return 'dad';

  return 'mom';
}

export default function ParentNotification({
  notif,
  viewed,
  onStop,
  onSnooze,
  onDismiss,
  mode,
}) {
  const { level, from, text, label, kind } = notif;
  const firstBtn = useRef(null);
  const canDismiss = true;
  const toast = kind === 'toast';
  const [snoozeHovered, setSnoozeHovered] = useState(false);
  const who = characterFor(from, mode);
  const mood =
    level <= 2 ? 'idle' : level <= 5 ? 'angry' : 'furious';

  useEffect(() => {
    firstBtn.current?.focus();
  }, []);

  useEffect(() => {
    if (!canDismiss) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onDismiss();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [canDismiss, onDismiss]);

  return (
    <div
      className={`notif notif-${kind} lvl-${Math.min(level, 8)}`}
      role={toast ? 'alert' : 'alertdialog'}
      aria-modal={!toast}
      aria-label={`Parent message, level ${level}`}
    >
      <div className="notif-card">
        <div className="notif-tag">
          <span>{from}</span>
          <span>Level {level} &middot; {label}</span>
        </div>


        {/* Animated pixel-art parent portrait */}
        <div
          className={`notif-character character-${who} parent-scold`}
          key={`${who}-${level}`}
        >
          <Sprite who={who} mood={mood} size={112} />

          <span className="anger-mark" aria-hidden="true">!</span>

          <span className="character-caption">
            {who === 'mom' && 'Mummy dekh rahi hai!'}
            {who === 'dad' && 'Papa is watching.'}
            {who === 'aunty' && 'Aunty ko sab pata hai.'}
            {who === 'uncle' && 'Uncle ki advice incoming.'}
          </span>
        </div>


        <p className="notif-text">{text}</p>

        {kind === 'compare' && <Compare viewed={viewed} />}
        {kind === 'papa' && <PapaStatus />}
        {kind === 'countdown' && <Countdown />}

        {kind === 'chaos' && (
          <div className="ticker" aria-hidden="true">
            <span>{'POORA DIN PHONE · '.repeat(12)}</span>
          </div>
        )}

        <div className="notif-actions">
          <button
            ref={firstBtn}
            className="btn btn-primary"
            onClick={onStop}
          >
            Fine, I'll stop
          </button>

          <button
            className="btn btn-ghost snooze-trap"
            onMouseEnter={() => setSnoozeHovered(true)}
            onMouseLeave={() => setSnoozeHovered(false)}
            onClick={() => {
              if (!snoozeHovered) onSnooze();
            }}
            aria-disabled={snoozeHovered}
            title={snoozeHovered ? 'Nice try, beta!' : 'Just 5 more minutes'}
          >
            Just 5 more minutes
          </button>

          {canDismiss && (
            <button
              className="btn btn-link"
              onClick={onDismiss}
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
