// All content is predefined. Family-mode lines use "Speaker|Message".
export const LEVELS = [
  { n: 1, label: 'Concerned', kind: 'toast' },
  { n: 2, label: 'Guilt trip', kind: 'popup' },
  { n: 3, label: 'Sharma Ji comparison', kind: 'compare' },
  { n: 4, label: 'Academic pressure', kind: 'modal' },
  { n: 5, label: 'Emotional damage', kind: 'shake' },
  { n: 6, label: 'Family escalation', kind: 'papa' },
  { n: 7, label: 'Final warning', kind: 'countdown' },
  { n: 8, label: 'Maximum chaos', kind: 'chaos' },
];

export const MODES = {
  mom: {
    label: 'Mom Mode',
    speaker: 'Mummy',
    blurb: 'Guilt, love and a very long memory.',
    levels: [
      [
        'Beta, it has been 15 minutes. Put the phone down for a little break.',
        'Your eyes need a break too, beta. Chalo, look away from the screen for a bit.',
      ],
      [
        'You have time for your phone, but no time to sit with your own family?',
        'I have been calling you for ages, beta! Is this phone the only thing you can hear?',
      ],
      [
        'Sharma Ji’s son has already finished two chapters. Just saying, beta.',
        'Sharma Ji’s son woke up at 5 AM and did yoga too. I am not comparing, okay?',
      ],
      [
        'Your exam is tomorrow, right? Tell me, beta, will they ask you to write Instagram Reels?',
        'Your syllabus is not going to revise itself. Phone down, books out!',
      ],
      [
        'Did we buy you a phone for studying or for watching reels all day?',
        'We do so much for you, beta. And you cannot even give up one little reel?',
      ],
      [
        'Fine. I am telling Papa. You explain this to him.',
        'I am calling Papa right now. Arre, now let us see what happens.',
      ],
      [
        'That is it. The Wi-Fi password is getting changed. No more discussions.',
        'I am walking towards the router, beta. You have ten seconds to make a good decision.',
      ],
      [
        'PHONE ALL DAY! When the results come, we will have a family discussion.',
        'What am I supposed to tell the relatives? My child has a PhD in scrolling?',
      ],
    ],
    extra: [
      'I have told Mausi too. Now the entire family knows, beta.',
      'I am this close to putting your phone in the temple for some purification.',
      'Dadi has posted about your screen time in the family WhatsApp group. Good luck.',
      'Even the society aunty asked if everything is okay at home. Arre, wonderful!',
    ],
  },

  dad: {
    label: 'Dad Mode',
    speaker: 'Papa',
    blurb: 'Few words. Maximum disappointment.',
    levels: [
      [
        'Beta, 15 minutes are up. Phone down. Bas.',
        'If screen time had a bill, yours would be higher than the electricity bill.',
      ],
      [
        'Time for mobile, but no time for responsibilities? Interesting.',
        'When I was your age, beta, I played cricket and still finished my homework.',
      ],
      [
        'Sharma Ji’s son has an internship already. What is your current achievement, beta?',
        'Even Verma Ji’s son is at the library right now. Just thought you should know.',
      ],
      [
        'Tell me your marks, not your reel count. When am I seeing that report card?',
        'Scrolling does not increase your percentage, beta. I checked.',
      ],
      [
        'We invested so much in you. So much trust. And all I see is scrolling.',
        'I may not say much, beta, but I notice everything. Everything.',
      ],
      [
        'I have informed Mummy. We will discuss this at dinner. Face to face.',
        'Family meeting at dinner, beta. And yes, everyone will be attending.',
      ],
      [
        'The Wi-Fi password is changing tonight. Final decision.',
        'I am standing next to the router. Ten seconds, beta. Choose wisely.',
      ],
      [
        'Phone all day? Tomorrow we wake up at 5 AM. We are going for a walk.',
        'Your phone is going in my cupboard. The key is staying in my pocket. Bas.',
      ],
    ],
    extra: [
      'I am calling your Chacha now. He has some excellent advice about discipline.',
      'New rule: phone only on Sundays, and even then, ask Mummy first.',
      'Even retirement savings have limits, beta. So should your screen time.',
      'You said “just one reel.” That was an hour ago. Explain the mathematics.',
    ],
  },

  family: {
    label: 'Full Family Committee',
    speaker: 'The Committee',
    blurb: 'Everyone has an opinion. Everyone is in the group.',
    levels: [
      [
        'Mummy|Beta, 15 minutes are up. Put the phone down and take a break.',
        'Papa|Just a little break, beta. Your phone will still be there.',
      ],
      [
        'Dadi|In our time, we only had the radio. And somehow, we survived happily.',
        'Mummy|You have no time to sit with the family anymore? Arre, beta!',
      ],
      [
        'Papa|Sharma Ji’s son has already finished two chapters.',
        'Chacha|My son is at the library too. I told you about him, remember?',
      ],
      [
        'Mummy|Your exam is tomorrow! Will you write these reels in the exam?',
        'Bua|My daughter scored 95% without spending all day on her phone. Just saying.',
      ],
      [
        'Mummy|We bought you a phone for studying, not for endless reels!',
        'Dadi|We do everything for you, beta, and this is what we get?',
      ],
      [
        'Mummy|I told Papa, Chacha, and now Mausi has joined the group too.',
        'Family Group|Emergency meeting about beta has officially started. Attendance is compulsory.',
      ],
      [
        'Papa|The Wi-Fi password is changing. The committee has approved it.',
        'Dadi|The vote is complete: 7–0. Phone privileges suspended. Bas!',
      ],
      [
        'Entire Family|PHONE ALL DAY! When the results come, the whole family will see.',
        'Mausi|I have invited Sharma Ji to the discussion too. This should be interesting.',
      ],
    ],
    extra: [
      'Society Aunty|I heard about the screen time. Sab theek hai na, beta?',
      'Nani|I am joining on video call. Now put the phone down and talk to me!',
      'Chacha|I have informed Uncle as well. The committee is growing, beta.',
      'Family Group|New rule: phone only on Diwali. The committee has spoken.',
    ],
  },
};

export const SNOOZE_REPLIES = [
  'Theek hai, paanch minute. Ghadi dekh rahi hoon.',
  'Paanch minute matlab paanch. Ek second zyada nahi.',
  'Ye "bas paanch minute" maine pehle bhi suna hai...',
  'Tum paanch minute bolte ho, hum sab kuch note karte hain.',
  'Paanch minute? Chalo. Par ab dil pe pathar rakh ke.',
];

export function levelMeta(level) {
  return LEVELS[Math.min(level, LEVELS.length) - 1] || LEVELS[0];
}

// sessionNo makes repeated sessions feel different, but it is still fully predefined.
export function pickMessage(modeKey, level, sessionNo) {
  const mode = MODES[modeKey];
  const meta = levelMeta(level);
  let raw;
  if (level <= LEVELS.length) raw = mode.levels[level - 1][(sessionNo + level) % 2];
  else raw = mode.extra[(level - LEVELS.length - 1 + sessionNo) % mode.extra.length];
  let from = mode.speaker;
  let text = raw;
  if (raw.includes('|')) [from, text] = raw.split('|');
  return {
    level, from, text, mode: modeKey,
    label: level > LEVELS.length ? 'Beyond chaos' : meta.label,
    kind: level >= LEVELS.length ? 'chaos' : meta.kind,
  };
}
