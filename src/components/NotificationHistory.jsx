import { useEffect, useRef } from 'react';
import { formatTime } from '../utils/sessionUtils.js';
import { INTERVAL_MS } from '../hooks/useSessionTimer.js';

export default function NotificationHistory({ items, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="log-backdrop" role="dialog" aria-modal="true" aria-label="Parent message log">
      <div className="log">
        <div className="log-head">
          <h2>Parent message log</h2>
          <button ref={closeRef} className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>
        {items.length === 0 ? (
          <p className="muted">Abhi tak koi message nahi. Scroll karte raho...</p>
        ) : (
          <ol>
            {items.map((m) => (
              <li key={m.level}>
                <small>Level {m.level} &middot; {m.label} &middot; at {formatTime(m.level * INTERVAL_MS)}</small>
                <strong>{m.from}</strong>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
