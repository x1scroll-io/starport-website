# Validation — 2026-09-25

Browser: Codex in-app Chromium, served on localhost.

Observed passing:
- Desktop hero and wallet section visually reviewed.
- 390px phone hero and interactive swap panel visually reviewed.
- 320px narrow-phone hero visually reviewed; text wraps without horizontal page overflow.
- Assets, Swap, Activity tabs switch the visible panel.
- Keyboard ArrowRight selects the next tab and updates aria-selected.
- Sample 0.02 BTC input displays 1,200.00 using the clearly labeled illustrative rate.
- Explore the steps opens the sample activity panel.
- Receive opens the descriptive modal; Close dismisses it.
- Website privacy opens the correct notice; Escape dismisses it.
- FAQ disclosures open and show their answers.
- Pause motion switches to Play motion and sets aria-pressed=true.
- The locally bundled WebGL emblem renders; independent ring/star rotation visually observed.
- JavaScript syntax check passed.

Limitations:
- Not tested on physical iOS/Android devices, Safari, or Firefox.
- OS reduced-motion and WebGL context-loss fallback are implemented, but not manually exercised in this browser session.
- Browser console recorded an unattributed MutationObserver.observe error during loads. No MutationObserver reference exists in any delivered source or bundled animation. It may be injected by the browser environment, but its origin is unconfirmed; do not report a clean console audit.
- No live quote, signing, wallet connection, transaction, email send, store install, or deployment performed. This is a marketing website with an explicitly illustrative demo.

Before publication, verify in a clean browser, confirm current release access, supply final wallet legal URLs if distributing the wallet, and confirm the Vercel domain configuration.

## Video integration checks

- Both local MP4 files decoded in the browser at 1280x720; durations 10.041667 seconds.
- Observed transition overlap: outgoing opacity 1, incoming opacity 0.911291, both playing; following frame completed with outgoing opacity 0 and incoming opacity 1.
- Shared Pause stopped both videos, including when pressed during a transition; Play resumed.
- Alternating playback observed across repeated cycles without a blank transition.
- 390px mobile hero visually reviewed with video and readable overlay.
- Muted playback confirmed for both elements.
- cinema.js JavaScript syntax passed.
- Local preview supports MP4 byte-range requests.
- OS reduced-motion, data-saving, autoplay rejection, and network-stall handling are implemented but not manually induced. Original earlier console limitation remains; physical-device performance not measured.

## Developer beta distribution checks

Beta ZIP CRC passed; every extension file matches the original 0.1.0.19 artifact. Manifest version is unchanged. Installation link opens the correct disclosure. Beta section visually reviewed. Download served over localhost and its SHA256 matched the packaged file. No wallet installation or transaction was performed in this change.
