# Bas Karo Beta (What The Hack)

> "Every reel brings you closer to getting your phone confiscated."

**Screen Time Sanskaar** is a humorous, Indian-parent-themed screen-time accountability web app built for a university hackathon. It looks like a fictional short-video app. You scroll a demo feed, and every 15 minutes of session time a pixel-art parent interrupts you with increasingly dramatic, Hinglish-flavoured messages.

The comedy and the escalation are the product. 
**Disclaimer** This is **not** a real parental-control tool.

## What it is (and is not)
- Fully fictional and deterministic: all messages, levels and rules are predefined.
- No backend, database, login, API keys, paid services or AI calls at runtime.
- No real Instagram/YouTube integration, no real device screen-time tracking, no real notifications, no audio.
- Not affiliated with any real social platform. (No real parents were notified).

## Tech stack
React 18 + Vite 5, JavaScript/JSX, plain CSS. Dependencies: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`. Icons and the parent characters are inline SVG, so there are no icon or image packages to break.

## Run locally (Windows, VS Code, Node.js 18+)
Open the folder that contains `package.json` (not a parent folder), then in the VS Code terminal:

```
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Other commands: `npm run build` (production build in `dist/`) and `npm run preview`.

Troubleshooting:
- `Missing script: "dev"` means you are in the wrong folder (often a nested copy after unzipping). Run `dir` and check that `package.json`, `index.html` and `src` are listed.
- If npm says the `esbuild` install script was blocked, run `npm install-scripts approve esbuild`, then `npm install` again.
- `npm audit` warnings in dev tooling can be ignored for a local demo.
- The feed's sample photos and the Google Fonts load from the internet. Offline, posts fall back to gradients and fonts fall back to system fonts.

## Quick demo (60-90 seconds)
1. On the landing screen, pick **Mom**, **Dad** or **Full Family Committee**.
2. Leave speed on **DEMO** (1 simulated hour in about 75 seconds) and click **Start Scrolling**.
3. Scroll, like posts and watch the chaos meter climb. A parent pops up at 15, 30, 45 and 60 simulated minutes, then every 15 after that.
4. Open the **Log** to revisit messages, then end the session to see the report card.
5. In a hurry? Hover the faint `skip` button in the bottom-left of the feed to trigger the next escalation immediately.

## Features
**Landing and setup:** name, tagline, explanation of the 15-minute rule, parent mode picker, DEMO/normal speed toggle, disclaimer, Start Scrolling.

**Feed:** 7 demo posts with username, caption and like counts. Like/unlike, next/previous (buttons, Arrow Up/Down, mouse wheel, swipe; `L` to like), session timer, "DEMO x48" badge, compact chaos meter, progress bar to the next parent message, pause/resume, End session, and a parent message log. Posts use gradients plus a photo, and fall back to a "Reel loading..." card if the image fails. `FeedPost` can also play a muted looping video if a post has a `video` URL (none of the sample posts use one).

**Corner parent:** while you scroll, Mom or Dad occasionally walks in at the bottom-right, glares with a speech bubble, then leaves. It never blocks clicks, appears more often at higher levels, and is switched off if the system asks for reduced motion.

**Parent notifications:** each popup shows an animated pixel-art parent (Mom, Dad, Aunty or Uncle depending on who is speaking) whose mood goes from idle to angry to furious as levels rise.

**Chaos dashboard** (side panel on wide screens): screen time, escalation level, parent interventions, posts viewed, chaos score, session status.

**Report card:** simulated screen time, parent warnings, highest level, posts seen/liked, "5 more minutes" excuses, chaos score, a title and a parent verdict. Everything comes from the real session state. Play again or go home.

## Screen-time engine (`src/hooks/useSessionTimer.js`)
- Elapsed time is calculated from `performance.now()` timestamps, not by counting interval ticks, so late ticks never cause drift.
- Thresholds are at 15, 30, 45, 60 minutes and every 15 after; each fires once per session.
- Pause stops accumulation, resume continues from the saved total, ending stops everything, and starting a new session resets all state and clears the interval (effect cleanup).
- Time is also frozen while a parent popup or the log is open.
- Demo speed is x48 (`DEMO_SPEED`), labeled "DEMO" and "(simulated)" in the UI. Normal speed is x1. Switching speed mid-session banks the time already elapsed.

## Escalation levels
| Level | Name | Presentation |
|---|---|---|
| 1 | Concerned | Small, polite toast |
| 2 | Guilt trip | Larger popup |
| 3 | Sharma Ji comparison | Popup with "Sharma Ji ka beta vs You" bars |
| 4 | Academic pressure | Intrusive modal |
| 5 | Emotional damage | Dark dramatic overlay with screen shake |
| 6 | Family escalation | "Papa has been informed" call sequence |
| 7 | Final warning | Countdown to a Wi-Fi password change |
| 8+ | Maximum chaos | Flashing stripes, ticker, continuous shake; extra messages after level 8 |

Every popup has **Fine, I'll stop** (ends the session and opens the report), **Just 5 more minutes** (continues without resetting time, shows a funny reply and adds to the chaos score) and **Dismiss** (also Escape).

## Parent modes
- **Mom Mode:** guilt, love and a very long memory (pink accent).
- **Dad Mode:** few words, maximum disappointment (blue accent).
- **Full Family Committee:** Mummy, Papa, Dadi, Chacha, Bua, Mausi, the family group and more, each speaking as themselves (gold accent).

Each mode has 8 levels with 2 messages per level, plus extra messages for level 9 and up. Which variant appears depends on a session counter, so replays feel different while staying fully predefined.

## Known behaviors
- **Dismiss escalates:** on level 2 and above, Dismiss immediately shows the next level's message instead of closing, so a determined user can click through the escalation. The timer's own threshold for that level can then fire again later.
- **"Just 5 more minutes" is a trap button:** it ignores clicks while the mouse is hovering over it (tooltip: "Nice try, beta!"). It works with touch and keyboard, but a mouse click will not register. Remove the `snoozeHovered` check in `ParentNotification.jsx` if you want it clickable with a mouse.

## Project structure
```
what_the_hack/
  package.json, vite.config.js, index.html
  src/
    main.jsx, App.jsx, index.css
    data/
      posts.js              demo feed posts
      parentMessages.js     levels, modes, message libraries, snooze replies
    hooks/
      useSessionTimer.js    timestamp-based timer and thresholds
    components/
      LandingScreen.jsx     landing page
      SessionSetup.jsx      mode picker and speed toggle (used inside the landing page)
      FeedScreen.jsx        feed layout, HUD, controls, navigation
      FeedPost.jsx          one post, with video/image/fallback handling
      CornerParent.jsx      parent that wanders in while you scroll
      Sprite.jsx            pixel-art characters drawn as inline SVG
      ParentNotification.jsx all escalation popups
      ChaosMeter.jsx        meter and dashboard panel
      NotificationHistory.jsx  parent message log
      FinalReport.jsx       report card
    utils/
      sessionUtils.js       formatting, chaos score, report titles and verdicts
```

## Customizing
- **Messages, levels, modes:** `src/data/parentMessages.js` (family lines use `Speaker|Message`).
- **Posts and media:** `src/data/posts.js`. Replace the placeholder `img` URLs, or add a `video` URL per post.
- **Timing:** `INTERVAL_MS` and `DEMO_SPEED` in `src/hooks/useSessionTimer.js`.
- **Chaos formula, titles, verdicts:** `src/utils/sessionUtils.js`.
- **Characters:** palettes and shapes in `src/components/Sprite.jsx`.
- **Look and feel:** CSS variables at the top of `src/index.css`.
