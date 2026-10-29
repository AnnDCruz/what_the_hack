import SessionSetup from './SessionSetup.jsx';

export default function LandingScreen({ mode, setMode, speedMode, setSpeedMode, onStart }) {
  return (
    <main className="landing">
      <div className="landing-inner">
        <p className="pill">Screen Time Sanskaar</p>
        <h1 className="logo">Bas Karo <span>Beta.</span></h1>
        <p className="tagline">Every reel brings you closer to getting your phone confiscated.</p>
        <p className="lede">
          Scroll a fake short-video feed. Every <b>15 minutes</b> of screen time, a parent interrupts you. Eight levels of
          escalation, from a polite nudge to full family committee. Nobody is actually watching you.
        </p>
        <SessionSetup mode={mode} setMode={setMode} speedMode={speedMode} setSpeedMode={setSpeedMode} />
        <button className="btn btn-primary btn-xl" onClick={onStart}>Start Scrolling</button>
        <p className="fine">No real parents were notified in the making of this app. Not affiliated with any real social platform.</p>
      </div>
    </main>
  );
}
