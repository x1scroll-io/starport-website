# Starport — Landing Page

Static, self-contained landing page for **Starport** (`starportwallet.com`) — a
self-custody multichain wallet. No build step, no dependencies, no CDN calls.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Single-page markup (nav, hero, features, chains, roadmap, footer) |
| `styles.css` | "Orbital" dark sci-fi theme, responsive + reduced-motion friendly |
| `script.js` | ~90 lines of vanilla JS: placeholder CTA toasts + hero portal parallax |
| `vercel.json` | Static hosting config (clean URLs) |

## Run locally

```bash
python3 -m http.server 3000   # then open http://localhost:3000
```

## Deploy to Vercel

**One-liner:** `npx vercel deploy --prod` from this folder (it's a plain static site — no framework preset needed; output is the project root).

Or drag-and-drop the folder at <https://vercel.com/new>, then point the
`starportwallet.com` domain at the project.

## Notes

- Placeholder links: "Download for Chrome" and the footer Privacy/Terms links
  are stubs — wire them to the Chrome Web Store URL and real pages when live.
- Only real external reference is `mailto:support@starportwallet.xyz`.
- The hero "portal" is pure CSS (concentric rings + radial glow); reduced-motion
  users get a static version.
