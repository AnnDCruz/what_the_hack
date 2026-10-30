# Bas Karo Beta

A fun, satirical screen-time awareness web app that turns endless scrolling into a chaotic experience of parental interventions.

What it does: Simulates a short-video feed where parents interrupt users every 15 minutes, with escalating levels of chaos, funny notifications, parent modes, and a final screen-time report card.

## Team Members
- Ann Maria Dcruz
- Michelle Moses

## Run on Windows (VS Code terminal)
```
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Where to edit
- `src/data/parentMessages.js` - all parent messages, modes, levels
- `src/data/posts.js` - demo feed posts
- `src/hooks/useSessionTimer.js` - timestamp-based timer (DEMO_SPEED = 48 means 1 hour in 75 s)
- `src/utils/sessionUtils.js` - chaos score, titles, verdicts

## Controls
Arrow Up/Down or mouse wheel or swipe = next/prev post. `L` = like. The tiny "skip" button bottom-left of the feed jumps to the next escalation (dev control).
Icons are inline SVG, so there is no icon dependency to break.
