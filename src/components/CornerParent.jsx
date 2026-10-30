import { useEffect, useState } from 'react';
import Sprite from './Sprite.jsx';

const LINES = ['Kya chal raha hai idhar?', 'Bas, phone rakh do.', 'Mummy dekh rahi hai...', 'Hmm. Padhai ho gayi?'];
const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Mom/Dad occasionally walk in at the bottom-right, glare, then leave. Never blocks clicks (pointer-events: none).
export default function CornerParent({ mode, level, active }) {
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (!active || reduced) { setShow(null); return undefined; }
    let t;
    const loop = () => {
      t = setTimeout(() => {
        if (Math.random() < 0.3 + Math.min(level, 8) * 0.08) {
          const who = mode === 'mom' ? 'mom' : mode === 'dad' ? 'dad' : Math.random() < 0.5 ? 'mom' : 'dad';
          setShow({ id: Date.now(), who, line: LINES[Math.floor(Math.random() * LINES.length)] });
          t = setTimeout(() => { setShow(null); loop(); }, 6000);
        } else loop();
      }, 6000 + Math.random() * 5000);
    };
    loop();
    return () => clearTimeout(t);
  }, [active, mode, level]);

  if (!show) return null;
  return (
    <div className="corner" key={show.id} aria-hidden="true">
      <div className="bubble">{show.line}</div>
      <Sprite who={show.who} mood="glare" size={80} />
    </div>
  );
}
