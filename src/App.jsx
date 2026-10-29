import { useEffect, useRef, useState } from 'react';
import { useSessionTimer } from './hooks/useSessionTimer.js';
import { POSTS } from './data/posts.js';
import { pickMessage, SNOOZE_REPLIES } from './data/parentMessages.js';
import { chaosScore } from './utils/sessionUtils.js';
import LandingScreen from './components/LandingScreen.jsx';
import FeedScreen from './components/FeedScreen.jsx';
import ParentNotification from './components/ParentNotification.jsx';
import NotificationHistory from './components/NotificationHistory.jsx';
import FinalReport from './components/FinalReport.jsx';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [mode, setMode] = useState('mom');
  const [index, setIndex] = useState(0);
  const [viewed, setViewed] = useState(1);
  const [liked, setLiked] = useState({});
  const [snoozes, setSnoozes] = useState(0);
  const [history, setHistory] = useState([]);
  const [notif, setNotif] = useState(null);
  const [logOpen, setLogOpen] = useState(false);
  const [flash, setFlash] = useState('');
  const [report, setReport] = useState(null);
  const sessionNo = useRef(0);

  // Called by the timer exactly once per 15-minute threshold.
  function onThreshold(level) {
    const msg = pickMessage(mode, level, sessionNo.current);
    setHistory((h) => [...h, msg]);
    setNotif(msg);
    timer.pause(); // freeze time while the parent is talking
  }
  const timer = useSessionTimer(onThreshold);

  const likedCount = Object.values(liked).filter(Boolean).length;
  const interventions = history.length;
  const score = chaosScore({ simMs: timer.simMs, interventions, snoozes, likes: likedCount });

  useEffect(() => {
    if (!flash) return undefined;
    const id = setTimeout(() => setFlash(''), 3500);
    return () => clearTimeout(id);
  }, [flash]);

  function startSession() {
    timer.reset();
    sessionNo.current += 1;
    setIndex(0); setViewed(1); setLiked({}); setSnoozes(0);
    setHistory([]); setNotif(null); setLogOpen(false); setReport(null); setFlash('');
    timer.start();
    setScreen('feed');
  }

  function finishSession() {
    const simMs = timer.end();
    setNotif(null); setLogOpen(false);
    setReport({ simMs, interventions, level: timer.level, viewed, liked: likedCount, snoozes, mode,
      chaos: chaosScore({ simMs, interventions, snoozes, likes: likedCount }) });
    setScreen('report');
  }

  function goHome() { timer.reset(); setScreen('landing'); }

  function snooze() {
    setFlash(SNOOZE_REPLIES[snoozes % SNOOZE_REPLIES.length]);
    setSnoozes((n) => n + 1);
    setNotif(null);
    timer.resume();
  }
  function dismiss() { setNotif(null); timer.resume(); }

  function openLog() { if (timer.status === 'running') timer.pause(); setLogOpen(true); }
  function closeLog() { setLogOpen(false); if (!notif) timer.resume(); }

  function navigate(dir) {
    setIndex((i) => (i + dir + POSTS.length) % POSTS.length);
    setViewed((v) => v + 1);
  }
  const post = POSTS[index];
  const toggleLike = () => setLiked((l) => ({ ...l, [post.id]: !l[post.id] }));

  const shakeClass = notif ? (notif.level >= 8 ? 'chaos' : notif.level >= 5 ? 'shake' : '') : '';

  return (
    <div className={`app mode-${mode}`}>
      {screen === 'landing' && (
        <LandingScreen mode={mode} setMode={setMode} speedMode={timer.speedMode} setSpeedMode={timer.setSpeedMode} onStart={startSession} />
      )}
      {screen === 'feed' && (
        <FeedScreen timer={timer} mode={mode} post={post} index={index} total={POSTS.length}
          liked={!!liked[post.id]} onLike={toggleLike} onNav={navigate} onEnd={finishSession}
          onOpenLog={openLog} interventions={interventions} viewed={viewed} score={score}
          blocked={!!notif || logOpen} shakeClass={shakeClass} />
      )}
      {screen === 'report' && report && <FinalReport report={report} onReplay={startSession} onHome={goHome} />}
      {notif && screen === 'feed' && (
        <ParentNotification key={notif.level} notif={notif} viewed={viewed} onStop={finishSession} onSnooze={snooze} onDismiss={dismiss} />
      )}
      {logOpen && <NotificationHistory items={history} onClose={closeLog} />}
      {flash && <div className="flash" role="status">{flash}</div>}
    </div>
  );
}
