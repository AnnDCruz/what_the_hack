import avengers from '../videos/avengers.mp4';
import catMemes1 from '../videos/cat_memes_1.mp4';
import catMemes from '../videos/cat_memes.mp4';
import dogMemes from '../videos/dog_memes.mp4';
import dogVideo from '../videos/dog_video.mp4';
import minecraft from '../videos/minecraft.mp4';
import rickroll from '../videos/rickroll.mp4';

export const POSTS = [
  {
    id: 1,
    user: 'avengers_assemble_lol',
    tag: 'Marvel',
    likes: 48200,
    grad: ['#FF8A00', '#FF3D81'],
    video: avengers,
    caption: 'Avengers assemble to save the universe. Me assembling the courage to reply to one email 💀'
  },
  {
    id: 2,
    user: 'cat.exe',
    tag: 'Cat memes',
    likes: 31900,
    grad: ['#19E3C1', '#3B1C8C'],
    video: catMemes1,
    caption: 'Bro pays zero rent, contributes zero chores, and STILL has attitude 😭🐈'
  },
  {
    id: 3,
    user: 'certified_cat_loser',
    tag: 'Cats',
    likes: 76500,
    grad: ['#FFB800', '#C2185B'],
    video: catMemes,
    caption: 'My cat at 3 AM: parkour champion. My cat when I call its name: who even are you? 💀'
  },
  {
    id: 4,
    user: 'doggo_daily',
    tag: 'Dog memes',
    likes: 90100,
    grad: ['#FF3D81', '#5B2BD6'],
    video: dogMemes,
    caption: 'One brain cell. Zero thoughts. Infinite zoomies. 100% good boy energy 🐶😂'
  },
  {
    id: 5,
    user: 'doggo_unfiltered',
    tag: 'Dogs',
    likes: 22800,
    grad: ['#8B4A1F', '#FFB800'],
    video: dogVideo,
    caption: 'POV: you said “walk” and bro just unlocked 300% speed 🏃🐕'
  },
  {
    id: 6,
    user: 'crafting_my_own_problems',
    tag: 'Minecraft',
    likes: 55400,
    grad: ['#2B6CFF', '#19E3C1'],
    video: minecraft,
    caption: 'Spent 3 hours building a house. Creeper pulls up and suddenly I’m homeless 💀⛏️'
  },
  {
    id: 7,
    user: 'totally_not_a_rickroll',
    tag: 'Internet classics',
    likes: 18700,
    grad: ['#FFD54A', '#E64A19'],
    video: rickroll,
    caption: 'You thought this was a normal video? NEVER GONNA GIVE YOU UP 🎶😂'
  },
];