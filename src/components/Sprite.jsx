// Pixel-art parents drawn as inline SVG rects: no image requests, transparent background, one shared 16x20 grid.
const K = '#1a1206';
const f = (c, n) => c.repeat(n);
const C = (s) => { const p = (16 - s.length) / 2; return f('.', p) + s + f('.', p); };
const BASE = [
  C(f('k', 8)), C('k' + f('h', 8) + 'k'), C('k' + f('h', 10) + 'k'), C('kh' + f('s', 8) + 'hk'),
  C('k' + f('s', 10) + 'k'), C('k' + f('s', 10) + 'k'), C('k' + f('s', 10) + 'k'), C('k' + f('s', 8) + 'k'), C('kk' + f('s', 6) + 'kk'),
  C('k' + f('b', 8) + 'k'), C('k' + f('b', 10) + 'k'), C('k' + f('b', 12) + 'k'), C('k' + f('b', 12) + 'k'), C('ks' + f('b', 10) + 'sk'),
  C('k' + f('b', 12) + 'k'), C('k' + f('b', 10) + 'k'), C('k' + f('b', 10) + 'k'), C('k' + f('d', 10) + 'k'), C('kddd' + f('k', 4) + 'dddk'), C(f('k', 4) + f('.', 4) + f('k', 4)),
];
const PAL = {
  mom: { b: '#FF3D81', d: '#B3124F', h: '#2b1b12', s: '#E8A87C' },
  dad: { b: '#4D8DFF', d: '#26408f', h: '#1a1206', s: '#D99A6C' },
  aunty: { b: '#19A974', d: '#0f6b4a', h: '#3a2418', s: '#E8A87C' },
  uncle: { b: '#FFB800', d: '#6b5a3a', h: '#8a8a8a', s: '#D99A6C' },
};
const GOLD = '#FFB800';
const EXTRA = {
  mom: [[6, -2, 4, 3, '#2b1b12'], [8, 3, 1, 1, '#ff2d2d'], [3, 10, 2, 7, GOLD]],
  dad: [[5, 5, 6, 1, K], [2, 12, 12, 2, '#D99A6C'], [2, 14, 12, 1, K]],
  aunty: [[5, -3, 6, 3, '#3a2418'], [2, 9, 3, 9, '#FF3D81'], [3, 6, 1, 2, GOLD], [12, 6, 1, 2, GOLD], [8, 3, 1, 1, '#ff2d2d']],
  uncle: [[5, 5, 6, 1, K], [4, 3, 3, 1, K], [9, 3, 3, 1, K], [7, 4, 2, 1, K]],
};
const FACE = {
  idle: [[5, 4, 1, 1, K], [10, 4, 1, 1, K], [6, 6, 4, 1, K]],
  angry: [[5, 4, 1, 1, K], [10, 4, 1, 1, K], [4, 3, 3, 1, K], [9, 3, 3, 1, K], [6, 6, 4, 1, K], [5, 7, 1, 1, K], [10, 7, 1, 1, K]],
  furious: [[4, 3, 3, 1, K], [9, 3, 3, 1, K], [5, 4, 1, 1, K], [10, 4, 1, 1, K], [6, 6, 4, 2, '#7a0000']],
  glare: [[4, 4, 3, 1, '#fff'], [9, 4, 3, 1, '#fff'], [5, 4, 1, 1, K], [10, 4, 1, 1, K], [4, 3, 3, 1, K], [9, 3, 3, 1, K], [6, 6, 4, 1, K]],
};
const R = ([x, y, w, h, c], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={c} />;

export const moodFor = (level) => (level <= 2 ? 'idle' : level <= 5 ? 'angry' : 'furious');

export default function Sprite({ who = 'mom', mood = 'idle', size = 96 }) {
  const p = PAL[who];
  const body = [];
  BASE.forEach((row, y) => {
    let x = 0;
    while (x < 16) {
      const c = row[x]; let n = 1;
      while (row[x + n] === c) n++;
      if (c !== '.') body.push(<rect key={`${x}-${y}`} x={x} y={y} width={n} height={1} fill={c === 'k' ? K : p[c]} />);
      x += n;
    }
  });
  return (
    <svg className={`spr spr-${mood}`} viewBox="-1 -4 18 24" width={size} height={(size * 24) / 18} shapeRendering="auto" aria-hidden="true">
      {body}{EXTRA[who].map(R)}{FACE[mood].map(R)}
      {who === 'mom' && <g className="pin"><rect x="14" y="8" width="1" height="7" fill="#8B4A1F" /><rect x="13" y="7" width="3" height="2" fill="#c98a4b" /></g>}
    </svg>
  );
}

export const Cast = ({ mood = 'idle' }) => (
  <div className="cast" aria-hidden="true">{['dad', 'mom', 'aunty', 'uncle'].map((w) => <Sprite key={w} who={w} mood={mood} size={64} />)}</div>
);
