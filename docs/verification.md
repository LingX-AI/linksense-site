# Verification

Reviewed on 2026-10-16. Reference: https://cuberto.com/. LinkSense keeps its own copy, fonts, footage and native scrolling. This is an adaptation, not a claim of frame-perfect parity.

| Effect                               | Owner and trigger                          | Evidence and fallback                                                                                                                                                                            | Status      |
| ------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Masked headings and supporting copy  | GSAP SplitText, initial/route entry        | Entry coordinated with route cover; CJK uses line masks. Reduced motion retains readable text.                                                                                                   | adapted     |
| Video hover                          | Persistent cursor, fine pointer over reel  | Captured circle growth from 10 to 49 to 65px, final 72px at 1440px viewport; exclusion blending, outline play icon and native pointer. Exit captured 72 to 29 to 12px.                           | implemented |
| Reel playback                        | ProductReel, viewport and explicit click   | Click opens native dialog, Close releases it. Preview pauses on hidden/offscreen/reduced motion; poster and explicit controls remain.                                                            | adapted     |
| Media, cards and services            | ScrollScenes and Services, scrolling/hover | Separate entrance, parallax and hover owners. Stable service geometry has a reversible-progress regression test. Native scroll replaces reference Lenis.                                         | adapted     |
| Contextual pointer and elastic rules | Cursor and ElasticRule, fine pointer       | Link/project/media/stick modes, lag/skew, press/release and elastic recovery. Disabled for reduced motion/coarse pointers.                                                                       | adapted     |
| Header navigation                    | Header, hover/focus                        | Black underline scales horizontally; reduced motion removes transition. Normal link and keyboard semantics retained.                                                                             | implemented |
| Language menu                        | Base UI Select                             | Six options visible; Spanish selection survives reload, then restored to English. Base UI owns focus, keyboard and popup behavior.                                                               | implemented |
| Metrics                              | NumberFlow, first viewport entry           | Three real metrics render custom-element digit parts and settle at 6/2/5. Locale formatting and reduced-motion static values are preserved.                                                      | implemented |
| Agent install                        | InstallPage, edition/platform selection    | Full/macOS selection updates prompt and official command; copy control reports success. Six locales are covered by translation/interpolation checks. Browser clipboard readback was unavailable. | implemented |
| SPA routes                           | SiteShell and TanStack Router              | Home to install navigation completes with cover reset; installation options remain in query parameters.                                                                                          | adapted     |

## Automated checks

- `pnpm test`: 14 tests pass, covering installation commands/query validation, six-language key/interpolation/fallback coverage and service geometry.
- `pnpm lint`: passes.
- `pnpm build`: passes, including TypeScript checking.
- `pnpm exec cf deploy --dry-run`: passes; reads static assets without uploading.

No product installation scripts were executed. No performance score, real-device Safari/Android/iOS check, or screen-reader certification is claimed. Vite reports a JavaScript chunk above 500kB; production transfer and interaction performance have not been benchmarked.

At a simulated 390px viewport with reduced motion enabled, the document width remains 390px, the custom cursor is hidden, the decorative preview is paused, and the explicit play hint remains visible. Temporary browser emulation was reset after checking.

## Production deployment

On 2026-10-16, built locally from source commit `906b50f` and uploaded `dist/` through the Cloudflare Dashboard to the assets-only `linksense-site` Worker. Dashboard version `c9e3db78` is marked Ready at 100%. Git integration is not configured; commits do not trigger deployment.

The asset root is `/`, HTML handling is `auto-trailing-slash`, and not-found handling is `single-page-application`. The custom domain `https://linksense.guygubaby.top` is bound to production.

Verified over HTTPS: `/`, `/install?edition=full&platform=macos` and `/start` return 200 HTML; the product poster returns 200 JPEG. The deployed JavaScript and MP4 return the correct media types and match the local build's SHA-256 hashes. The MP4 responded with the full file (200) to a Range request. In Chrome, the installation deep link renders Agent install for Full/macOS, the product video plays to its end with no media error, and no browser console errors were recorded.

## Hero introduction video — 2026-10-19

Source commit `e15a9a0` replaces only the Hero preview and its full player with the approved v6 introduction film and matching poster. The existing hover/cursor behavior is retained. Feature-card previews still use the product recording. The Hero stays 16:9 on mobile so the film's titles are not cropped; both video elements declare 1920×1080 intrinsic dimensions. The preview remains muted and viewport-controlled, while the explicit full player includes the selected Sonor #2 music and quiet UI accents. Media credits and the Mixkit license are recorded in `public/media/README.md`.

`pnpm build` passed, including TypeScript checking. In the Codex browser, the new preview loads as muted and the full dialog plays the 30-second video with audio enabled and no media or console error. At an emulated 390px width the Hero measured approximately 338×190px and the document width remained 390px. Browser emulation was reset after verification. Real-device Safari/iOS/Android playback was not tested.

Built locally and uploaded through the Cloudflare Dashboard to the existing `linksense-site` Worker. Production version `900b0694` is Ready at 100%, with asset root `/`, `auto-trailing-slash` HTML handling and `single-page-application` fallback preserved. The custom domain remains `https://linksense.guygubaby.top`.

Production `/` and `/install?edition=full&platform=macos` return 200 HTML. The new MP4 and JPEG return their correct media types and match the local build byte for byte. Video SHA-256: `121641edb22fd618b3a36cd2faf82e4257e3ae930b321753ef7cfa3aebaa3058`. The production full player was observed at 15.7 seconds of 30, unmuted and playing, with no media or console error. No unrelated test suites or performance benchmarks were run for this media replacement; the existing large JavaScript chunk warning remains.
