// Demo feed. If an image fails to load, the gradient behind it is shown instead.
const img = (seed) => `https://picsum.photos/seed/${seed}/720/1280`;

export const POSTS = [
  { id: 1, user: 'maggi_at_midnight', tag: 'Food', likes: 48200, grad: ['#FF8A00', '#FF3D81'], img: img('maggi'), caption: 'Hostel-room 2-minute noodles, ranked. Number 3 is illegal.' },
  { id: 2, user: 'noob_to_pro_gaming', tag: 'Gaming', likes: 31900, grad: ['#19E3C1', '#3B1C8C'], img: img('gaming'), caption: 'Won the match with 2% battery and zero shame.' },
  { id: 3, user: 'backbencher_diaries', tag: 'Student life', likes: 76500, grad: ['#FFB800', '#C2185B'], img: img('classroom'), caption: 'POV: sir says "last bench, stand up" and you were not even talking.' },
  { id: 4, user: 'shaadi_steps_daily', tag: 'Dance', likes: 90100, grad: ['#FF3D81', '#5B2BD6'], img: img('dance'), caption: 'Cousin sangeet choreography in 30 seconds. Do not skip the hook step.' },
  { id: 5, user: 'chai_pe_charcha', tag: 'Food', likes: 22800, grad: ['#8B4A1F', '#FFB800'], img: img('chai'), caption: 'Kadak chai, 4 pm, rain outside. Studying can wait. (It cannot.)' },
  { id: 6, user: 'exam_eve_energy', tag: 'Relatable', likes: 55400, grad: ['#2B6CFF', '#19E3C1'], img: img('study'), caption: 'Night before exam: suddenly the whole room needs cleaning.' },
  { id: 7, user: 'auto_bhaiya_vlogs', tag: 'City', likes: 18700, grad: ['#FFD54A', '#E64A19'], img: img('street'), caption: 'Traffic jam, full volume, one honk symphony. Bangalore edition.' },
];
