
export function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600),
    m = Math.floor((s % 3600) / 60),
    r = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${p(m)}:${p(r)}` : `${p(m)}:${p(r)}`;
}

export function formatCount(n) {
  return n >= 1000
    ? (n / 1000).toFixed(1).replace('.0', '') + 'K'
    : String(n);
}

export function chaosScore({ simMs, interventions, snoozes, likes }) {
  const minutes = simMs / 60000;
  return Math.min(
    100,
    Math.round(minutes * 0.6 + interventions * 7 + snoozes * 6 + likes * 0.5)
  );
}

export function chaosLabel(score) {
  if (score < 20) return 'All shaant… suspiciously shaant!';
  if (score < 45) return 'Thoda drama starting!';
  if (score < 70) return 'Ghar ka temperature rising!';
  return 'Full family emergency, beta!';
}

export function getReportTitle(level) {
  if (level === 0) return 'Suspiciously Sanskaari';
  if (level <= 2) return 'Weekend Scroll Champion';
  if (level <= 4) return 'Sharma Ji Comparison Survivor';
  if (level <= 6) return 'Certified Reel Addict, Beta';
  if (level === 7) return 'Victim of the Wi-Fi Ban';
  return 'Family WhatsApp Emergency!';
}

export function getVerdict(level, snoozes) {
  let line;

  if (level === 0) {
    line = 'Not bad, beta! No drama today. Papa is proud… but slightly suspicious.';
  } else if (level <= 2) {
    line = 'Okay beta, not too bad. Next time, take a break before Mummy notices!';
  } else if (level <= 4) {
    line = 'All those reels, but what about studying? Sharma Ji’s son just came to mind.';
  } else if (level <= 6) {
    line = 'Arre beta, that much scrolling? You could have opened a chai-biscuit shop by now!';
  } else if (level === 7) {
    line = 'The Wi-Fi password is now with Papa. Discussion over. Bas!';
  } else {
    line = 'The entire family committee has met. Tomorrow, we wake up at 5 AM. No excuses!';
  }

  if (snoozes > 0) {
    line += ` And you said "just 5 more minutes" ${snoozes} time${snoozes === 1 ? '' : 's'}. Papa was counting, beta.`;
  }

  return line;
}
