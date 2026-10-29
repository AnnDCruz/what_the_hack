export function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${p(m)}:${p(r)}` : `${p(m)}:${p(r)}`;
}

export function formatCount(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'K' : String(n);
}

export function chaosScore({ simMs, interventions, snoozes, likes }) {
  const minutes = simMs / 60000;
  return Math.min(100, Math.round(minutes * 0.6 + interventions * 7 + snoozes * 6 + likes * 0.5));
}

export function chaosLabel(score) {
  if (score < 20) return 'Shaant';
  if (score < 45) return 'Thoda tension';
  if (score < 70) return 'Ghar garam';
  return 'Poora ghar jaag gaya';
}

export function getReportTitle(level) {
  if (level === 0) return 'Suspiciously Well-Behaved';
  if (level <= 2) return 'Weekend Scroller';
  if (level <= 4) return 'Sharma Ji Comparison Survivor';
  if (level <= 6) return 'Certified Reel Addict';
  if (level === 7) return 'Wi-Fi Password Victim';
  return 'Family Group Chat Emergency';
}

export function getVerdict(level, snoozes) {
  let line;
  if (level === 0) line = 'Kuch nahi hua? Pakka kuch chhupa raha hai. Par chalo, shabash.';
  else if (level <= 2) line = 'Theek hai, itna chalta hai. Par agli baar jaldi uthna.';
  else if (level <= 4) line = 'Itni der reels, aur padhai? Sharma Ji ka beta yaad hai na?';
  else if (level <= 6) line = 'Ek ghanta?! Itne time mein toh poori chai-biscuit ki dukaan khul jaati.';
  else if (level === 7) line = 'Router ki chaabi ab meri jeb mein hai. Baat khatam.';
  else line = 'Poora parivaar meeting mein baitha hai. Kal subah 5 baje uthna.';
  if (snoozes > 0) line += ` Aur ${snoozes} baar "bas 5 minute" bola. Maine ginti ki hai.`;
  return line;
}
