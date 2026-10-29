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
    label: 'Mom Mode', speaker: 'Mummy', blurb: 'Guilt, love and a very long memory.',
    levels: [
      ['Beta, bas 15 minute ho gaye. Ab phone rakh do.', 'Aankhein kharab ho jayengi, beta. Thoda break le lo.'],
      ['Phone ke liye time hai, lekin ghar walon ke saath baithne ka time nahi hai?', 'Main kitni der se awaaz laga rahi hoon, tumhe sunai hi nahi deta?'],
      ['Sharma Ji ka beta toh abhi tak do chapters khatam kar chuka hai.', 'Sharma Ji ke bete ne aaj subah 5 baje uthkar yoga bhi kiya.'],
      ['Kal exam hai na? Haan, toh phir ye reels kaun dega exam mein?', 'Syllabus khud ko revise nahi karega, beta.'],
      ['Humne tumhe phone diya tha padhai ke liye ya duniya bhar ke reels dekhne ke liye?', 'Itna sab kiya tumhare liye, aur tum ek reel bhi nahi chhod sakte?'],
      ['Ruko. Papa ko batati hoon.', 'Papa ko call laga diya hai. Ab dekhna kya hota hai.'],
      ['Theek hai. Ab Wi-Fi ka password change hoga.', 'Main router ki taraf ja rahi hoon. Dus tak ginti shuru.'],
      ['POORA DIN PHONE. Result aayega toh dekhte hain.', 'Rishtedaar poochenge toh kya bolun? Mera beta reels-wala hai?'],
    ],
    extra: ['Ab toh mausi ko bhi bata diya hai.', 'Phone ko mandir mein rakh diya hai, shuddh karne ke liye.', 'Dadi ne WhatsApp group mein tumhari photo daal di.', 'Society wali aunty ne bhi poocha: "Sab theek hai na?"'],
  },
  dad: {
    label: 'Dad Mode', speaker: 'Papa', blurb: 'Few words. Maximum disappointment.',
    levels: [
      ['Beta, pandrah minute ho gaye. Ab bas.', 'Screen time ka bill aata toh bhi itna nahi hota.'],
      ['Mobile ke liye time hai, lekin kaam ke liye nahi? Interesting.', 'Main tumhari umar mein poora din cricket khelta tha, par padhai bhi karta tha.'],
      ['Sharma Ji ka beta toh internship bhi kar raha hai. Tum kya kar rahe ho?', 'Verma Ji ka beta bhi abhi library gaya hai.'],
      ['Marks batao, reels nahi. Report card kab dikhaoge?', 'Scroll karne se percentage nahi badhta.'],
      ['Itna kharcha kiya, itna bharosa kiya. Aur tum? Scroll.', 'Main kuch kehta nahi, par sab dekhta hoon.'],
      ['Maine Mummy ko bata diya hai. Dinner par discussion hoga.', 'Dinner table pe baat karte hain. Sabke saamne.'],
      ['Wi-Fi ka password change ho raha hai. Aaj raat se. Final.', 'Main router ke paas khada hoon. Dus second.'],
      ['Poora din phone? Kal se savere 5 baje uthna hai. Walk pe chalenge.', 'Phone ab meri almirah mein. Chaabi meri jeb mein.'],
    ],
    extra: ['Ab main tumhare Chacha ko call kar raha hoon.', 'Naya rule: phone sirf Sunday ko, aur woh bhi Mummy ki permission se.', 'Pension ki tarah screen time bhi limit mein hona chahiye.', 'Kisi ne kaha tha "bas ek reel"? Woh ek ghanta ho gaya.'],
  },
  family: {
    label: 'Full Family Committee', speaker: 'The Committee', blurb: 'Everyone has an opinion. Everyone is in the group.',
    levels: [
      ['Mummy|Beta, bas 15 minute ho gaye. Phone rakh do.', 'Papa|Ek chhota break le lo, beta.'],
      ['Dadi|Hamare zamane mein toh sirf radio tha. Aur sab khush the.', 'Mummy|Ghar walon ke saath baithne ka time nahi hai?'],
      ['Papa|Sharma Ji ka beta do chapters khatam kar chuka hai.', 'Chacha|Mera beta bhi abhi library mein hai, bataya tha na?'],
      ['Mummy|Kal exam hai na? Ye reels exam mein kaun likhega?', 'Bua|Meri beti ne toh bina phone ke 95% laaye the.'],
      ['Mummy|Humne phone padhai ke liye diya tha, reels ke liye nahi!', 'Dadi|Hum kitna sehte hain, tum samajhte hi nahi.'],
      ['Mummy|Papa ko bata diya. Chacha ko bhi. Mausi bhi group mein aa gayi.', 'Family Group|Beta ke baare mein emergency meeting shuru ho gayi hai.'],
      ['Papa|Wi-Fi ka password change ho raha hai. Meeting mein sab sehmat hain.', 'Dadi|Vote ho chuka hai: 7-0. Phone gaya.'],
      ['Poora Parivaar|POORA DIN PHONE. Result aayega toh sab dekhenge.', 'Mausi|Maine toh Sharma Ji ko bhi invite kar diya hai.'],
    ],
    extra: ['Society Aunty|Maine bhi suna hai. Sab theek toh hai na?', 'Nani|Main video call pe aa rahi hoon. Phone neeche rakho.', 'Chacha|Maine Uncle ko bhi bata diya.', 'Family Group|Naya rule: phone sirf Diwali pe.'],
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
