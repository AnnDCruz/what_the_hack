import { useCallback, useEffect, useRef, useState } from 'react';

export const INTERVAL_MS = 15 * 60 * 1000; // one parent check every 15 simulated minutes
export const DEMO_SPEED = 48; // 1 simulated hour in 75 real seconds

// Time is computed from timestamps (performance.now), so late interval ticks never drift.
export function useSessionTimer(onThreshold) {
  const [status, setStatus] = useState('idle'); // idle | running | paused | ended
  const [simMs, setSimMs] = useState(0);
  const [level, setLevel] = useState(0);
  const [speedMode, setSpeedModeState] = useState('demo'); // demo | normal

  const simRef = useRef(0);
  const lastRef = useRef(0);
  const firedRef = useRef(0);
  const statusRef = useRef('idle');
  const speedRef = useRef(DEMO_SPEED);
  const cbRef = useRef(onThreshold);
  cbRef.current = onThreshold;

  const changeStatus = (s) => { statusRef.current = s; setStatus(s); };

  const tick = useCallback(() => {
    if (statusRef.current !== 'running') return;
    const now = performance.now();
    simRef.current += (now - lastRef.current) * speedRef.current;
    lastRef.current = now;
    setSimMs(simRef.current);
    const due = Math.floor(simRef.current / INTERVAL_MS);
    if (due > firedRef.current) { // each threshold fires once
      firedRef.current = due;
      setLevel(due);
      cbRef.current(due);
    }
  }, []);

  useEffect(() => {
    if (status !== 'running') return undefined;
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [status, tick]);

  const start = useCallback(() => { lastRef.current = performance.now(); changeStatus('running'); }, []);
  const pause = useCallback(() => { tick(); if (statusRef.current === 'running') changeStatus('paused'); }, [tick]);
  const resume = useCallback(() => { if (statusRef.current === 'paused') start(); }, [start]);
  const end = useCallback(() => { tick(); changeStatus('ended'); return simRef.current; }, [tick]);
  const reset = useCallback(() => {
    simRef.current = 0; firedRef.current = 0;
    setSimMs(0); setLevel(0); changeStatus('idle');
  }, []);

  const setSpeedMode = useCallback((mode) => {
    tick(); // bank the time that passed at the old speed
    speedRef.current = mode === 'demo' ? DEMO_SPEED : 1;
    setSpeedModeState(mode);
  }, [tick]);

  const skipToNext = useCallback(() => {
    if (statusRef.current !== 'running') return;
    tick();
    simRef.current = (firedRef.current + 1) * INTERVAL_MS;
    tick();
  }, [tick]);

  return { status, simMs, level, speedMode, setSpeedMode, start, pause, resume, end, reset, skipToNext };
}
