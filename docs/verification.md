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
