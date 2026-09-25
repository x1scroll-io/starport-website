# Starport website redesign

Replacement for https://github.com/x1scroll-io/starport-website, based on main commit f5d87e87a5b084c9060f8ab850c6d3a1eaae3b78.

## Run

No installation or build step. Run `node preview.cjs`, then open http://127.0.0.1:4180. Serve only this project directory. Deploy the static files to the existing Vercel project with Framework Preset Other, no build command, and output directory `.`.

## What changed

- Approved Starport star-and-portal emblem with independent 3D motion, local assets, pause control, reduced-motion preference, visibility/intersection pause, and static fallback.
- Product-led responsive layout with interactive Assets / Swap / Activity concepts. All balances, quotes, and progress are explicitly sample data. No wallet connection or signing code.
- Real navigation, working email contact, keyboard-operable tabs, dialogs and FAQ disclosures.
- Removed placeholder Chrome Store download and legal links, unsupported universal-chain claims, and unverified 25-word recovery assertion.
- Beta contact uses support@starportwallet.xyz; no form, backend, analytics, external fonts, or tracking scripts.
- Removed the old `.app` to `.com` redirect because the owner's stated product domain is `.app`. No new domain redirects are assumed; configure aliases in Vercel after confirming DNS. `.xyz` remains the business/support domain.
- Removed one-year immutable caching for unversioned CSS/JS to avoid stale files after updates.

## Release facts to confirm before publication

The Chrome Web Store listing is not supplied. The CTA downloads the existing 0.1.0.20 release candidate packaged for experienced beta testers. Replace or supplement it with the verified store URL when ready. Mobile is described as planned. Do not claim audited, universally supported, or production-ready status based on this website. The Website privacy notice describes this static site only, not the wallet's legal terms. Final wallet privacy/terms URLs still need to be provided before distributing a public release through this page.

## Files

- `index.html`, `styles.css`, `script.js`: page, design, accessible demo interactions.
- `assets/gyroscope.html`: local Three.js animation from the approved motion study. No network requests.
- `assets/gyroscope-source.js`: readable original scene source for animation edits. Its relative imports refer to Three.js 0.180.0; rebundle after editing. The deployed gyroscope HTML is already bundled and needs no build.
- `assets/starport-mark.svg`: Starport brand mark.
- `assets/THREE-LICENSE.txt`: upstream Three.js MIT license.
- `vercel.json`: static hosting configuration.
- `preview.cjs`: localhost-only preview server.
- `CHECK_RESULTS.md`: observed validation, including limitations.

No publication or push was performed. The wallet extension itself is not modified by this website package.

## Cinematic background update

The two user-supplied videos are included locally as starport-flight.mp4 (generated_video (5)) and starport-orbit.mp4 (generated_video (7)). Both are 1280x720, approximately 10.04 seconds. Original media preserved: together about 27 MB. Playback is muted and inline, with a 1.8-second smoothstep crossfade alternating indefinitely. Incoming playback must start before opacity changes. The outgoing last frame remains visible if buffering delays the next clip.

The persistent Pause motion button controls both the background and emblem. Hidden tabs pause playback. Reduced-motion or data-saving preferences defer video downloads until an explicit Play. Static gradient remains available if playback cannot start. cinema.js controls video only; it does not connect wallets or send transactions.

Before a broad mobile launch, consider creating smaller encodes/CDN variants of these originals. No claim is made that the original files have been optimized for cellular download.

## X1 developer beta distribution

Downloads now include STARPORT_BETA_0.1.0.20.zip, START_HERE.txt, and SHA256SUMS.txt. Every extension file matches the existing 0.1.0.20 compiled archive byte for byte. The package adds installation and feedback instructions outside the extension directory; no wallet code changed. Chrome listing is labeled planned, not approved. Feedback mailto drafts include requested bug details and likes/dislikes/additions. No email was sent.
