# Verification

## November 5, 2026 — Persistent sidebar and full section hierarchy

The sidebar keeps the same four primary entries on every article: deployment
and first steps, User guide, Administrator guide, and Developer guide. The three
guides expand to topic pages without a third menu level. The deployment entry
has a Wrench icon, and the redundant "Other guides" separator and guide switcher
are removed. Hidden deployment reference pages also retain this shared sidebar.

The earlier H2-only contents limit is removed from all 22 consolidated pages.
The right-side and mobile page contents receive the complete heading tree,
including H3, H4, and any deeper headings. The build now rejects an exported
article if any H2–H6 heading is missing from its page contents. This check failed
on the previous export at `create-and-run-写出可执行的要求` before the fix.

All 22 unit tests and the production build pass. The sidebar regression builds
the actual bilingual Fumadocs page trees and checks the four entries, two-level
limit, and absence of nested roots that could replace the shared navigation.

## November 5, 2026 — Continuous topic guides

The public documentation consolidates 116 bilingual small articles into 22 topic
pages: six user topics and five administrator topics in each language. Existing
body text is preserved under H2 topic sections and H3 subheadings. Sidebar menus
link directly to topics, and the long-page table of contents shows their H2
sections. Internal cross-references use the new page and anchor addresses.

Validation: all 21 unit tests pass, including menu targets, bilingual section
parity, relative document links, and legacy redirects. The production build
generates 154 static routes and verifies every rendered documentation link,
heading destination, and exact legacy redirect against the exported HTML.
Targeted ESLint passes for the changed TypeScript and TSX files.

The Codex browser verified the Chinese getting-started page: the sidebar contains
one link per topic, the right-side contents contains the four former article
titles, and selecting registration changes only the hash within the same page.
The local Cloudflare asset server returned direct 301 redirects from the retired
sign-in page, an English-locale task URL, and model settings to their corresponding
consolidated sections. No product installation, model call, real-device, or
screen-reader testing was performed.

## New API source migration and LinkSense blue — 2026-11-05

The previous Vite, TanStack Router, Docusaurus, GSAP/Motion components, and website CSS have been replaced with the public `QuantumNous/new-api-docs-v1` source baseline `d254f1842dc3d08d60f2269e2c9d4c9876a3dfbc`: Next.js 16.4.1, React 19.2.9, Fumadocs UI/Core 16.0.10, Fumadocs MDX 13.0.7, its home Hero/navigation, and its documentation layout. LinkSense content, six website languages, brand assets, media, and 74 Chinese/English document pairs remain. The upstream pink theme and shader palette are replaced by LinkSense blue `#1765ED`; dark mode uses lighter blue foregrounds.

`pnpm test`: 16 Node/tsx tests pass, covering language routing, installation choices, interpolation, canonical origins, and Fumadocs relative-link resolution inside locale directories. `pnpm lint` passes. The production build checks TypeScript and exports 315 routes, including 148 article pages and 148 plain-Markdown exports. A static audit of 160 unique internal link paths finds no missing destination.

`pnpm build` now generates a fresh Cloudflare Build Output using the pinned official config/build-output packages, validates the resulting configuration and website entry, and rejects unresolved MDX links or legacy `/help/` assets. This replaces the stale output left by the previous Vite toolchain. `cf deploy --prebuilt --dry-run --provision=false` reads the new 1405-file assets directory successfully, with no bindings and no upload. The existing Worker, domain, compatibility date, and observability settings remain configured.

REA browser checks against the built static site:

- Chinese → English homepage navigation retains dark mode; returning to System is supported by the upstream three-state theme switch. Dark English homepage Evidence: `ev_8e1d2f841274d2f1a611dbee01883d549819494796932cc5a3d1c376d78b54d3`.
- Chinese search for `知识库` returns knowledge-related results. Switching to English, searching `Core`, and selecting `Install Core` opens `/doc/en-US/deploy/core/` and renders its Linux section. Evidence: `ev_d6807d843d12c69f3a1c17913f24b9fa08aea204743509ca918f98546b050d77`.
- At 390×844, the French homepage fits the narrow layout, and the Chinese documentation renders its mobile page and opens the sidebar. Mobile sidebar Evidence: `ev_74b1045cccb4a92c6b975ef7c5a885d91511c616f7d829b497a149544a98e479`.
- Switching the installation page from English to Chinese preserves `edition=full&platform=macos`, both selected controls, the matching guide anchor, and the localized agent prompt. Evidence: `ev_c300a23557c1cd5a3cef7ef3d49d0db3dc87220af409b6f51407df25ff24de46`.
- Returning from Dark to System in a light OS context restores the blue light homepage. Evidence: `ev_34ba0686d82d6cee5caf2b81001523bc06f258f1d424276d4d980f48a20e64a6`.

These successful browser checks have no captured console or page errors, and REA terminated its owned browser processes. Direct requests to website, localized installation, both documentation languages, deployment deep links, plain Markdown, and the bilingual static search database return 200. No installer was executed, and no production release or real-device Safari check is claimed.

Earlier sections below record superseded implementations and historical releases.

## Website and documentation in one project — 2026-11-05

Public documentation is now maintained in this repository's `documentation/` directory. The initial 74 Chinese articles and their 74 English translations came from LinkSense's existing documentation package, including deployment guides. All dependencies and commands are managed from the website root; no sibling checkout is used by the build. The website and documentation share `src/site-theme.css` and one `dist/` deployment.

`pnpm build` builds both languages, the website, static installation/404 entries, and checks both TypeScript projects. Targeted installation/documentation URL tests pass (6 tests), and `pnpm lint` passes.

The built output was served through the Miniflare bundled with the installed Cloudflare CLI, using `auto-trailing-slash` and `404-page` asset handling. HTTP assertions passed for `/`, `/install?edition=full&platform=macos`, `/doc/`, `/doc/en-US/`, and deployment deep links in both languages. `/help` and `/help/en-US/deploy/core/?from=old` return 301 to the corresponding `/doc/` routes, including the query string. Missing articles and missing document JavaScript return 404. The local bundled runtime supports compatibility dates through 2026-10-19, so that date was used only in the temporary verification harness; the project's existing 2026-10-20 deployment date was retained.

REA 6.8.0 exercised the built site in isolated Chrome sessions:

- At 1280×720, searching `Core` returned `Install Core` and related deployment results under `/doc/en-US/`. Evidence: `ev_2a8731e517c3c09b2eec3daf2dc709f84b4913a3794b9bed640c60b7f0df6244`.
- At 390×844, the Chinese mobile navigation opened and displayed the complete documentation categories under `/doc/`. Evidence: `ev_4a0ed29d794a66c5546a141cfa9da1d5ed96422d1657e8d37f4f385f68e894d2`.

Both browser scenarios completed without captured console or page errors, and REA terminated its owned browser processes. No installer was executed. No production deployment, real-device Safari verification, or screen-reader certification is included in this revision.

New API source and shipped-frontend research, including its remaining source-availability boundary, is recorded in [newapi-reference.md](newapi-reference.md).

## Mobile documentation controls — 2026-11-04

The public documentation's mobile table of contents now opens an absolutely positioned, scrollable panel below a native `details` / `summary` control. Opening it leaves the document heading at exactly the same vertical position. Selecting a heading, tapping outside, pressing Escape, or moving keyboard focus outside closes the panel. The existing translated label is reused, and navigation to another document resets the disclosure.

The mobile header keeps its logo, search field, and menu button in stable flex columns. Focusing search no longer changes its width or hides the logo, including at 320px. Search and menu controls use 44px touch targets. The menu drawer is bounded to `min(88vw, 22rem)`; explicit stacking and an isolated header prevent the underlying search icon from painting through it. Drawer controls share the header's height, and long inline code wraps on mobile. These overrides are limited to public documentation; bundled product help retains its existing TOC component.

Product commit `f74deb2` was pushed to `origin/feat-computer-use` through the local proxy. The website remains on `main`, with application source `96795f5`. `pnpm run deploy` rebuilt the documentation from the product checkout and deployed Cloudflare version `94b08b4f-b712-4b52-99aa-636584e4f2b4` to the existing `linksense-site` Worker on 2026-11-04 at approximately 20:46 Asia/Shanghai, uploading 161 changed assets.

All 27 documentation tests, documentation TypeScript checking, both Chinese and English public and bundled documentation builds, the website production build, and `git diff --check` pass. Chrome assertions on local and production pages at 320, 390, 592, 768, and 996px confirm stable header geometry, zero document displacement on TOC expansion, bounded TOC scrolling, Escape/outside-click/link dismissal, working anchor navigation, and correct drawer hit testing. At 1303px the desktop TOC remains visible and the mobile control is hidden. The Chinese label renders correctly, and no browser page errors were recorded.

The homepage and both language versions of the interactive-application guide return HTTP 200. Their deployed stylesheet SHA-256 hashes match the local `dist/` build. Production screenshots are saved at `/tmp/linksense-mobile-toc-overlay.png` and `/tmp/linksense-mobile-drawer.png`. Safari, Firefox, and physical mobile devices remain unverified.

## Navigation and TOC refinement — 2026-11-04

The shared website and documentation header now uses Documentation and Community as its only main navigation items. Developers remains available from the documentation sidebar but is no longer duplicated in the top navigation.

The desktop documentation TOC keeps the existing scroll tracking and normal-weight active link. Its active marker is now an L-shaped path: it follows the left rail, angles toward the active heading's indentation, then continues beside that heading. The offset and arm width are recalculated when scroll tracking changes or the TOC resizes, so both top-level and nested headings use the correct bend.

Below 997px, the navbar search now stays in normal flex layout instead of Docusaurus's absolute mobile position, which had placed it over the menu button. At 577px and wider, Logo, search, and menu remain side by side. Below 577px, focusing the collapsed search temporarily hides the Logo so the expanded field and menu keep separate hit targets without horizontal overflow.

Chrome checks at 390×948, 576×948, 592×948, 768×948, 1094×986, and 1303×986 covered the two-link header, idle and focused mobile search layouts, top-level and nested TOC states, and normal active text weight. `pnpm test` (19 tests), `pnpm lint`, the website production build, 27 documentation tests, documentation TypeScript checking, and both public and bundled documentation builds pass.

Website commit `8ce750e` and product commit `aa75444` were deployed to the existing `linksense-site` Worker. Cloudflare version `4dd6e9b0-936a-419a-8bc6-04107674c562` completed deployment on 2026-11-04 at approximately 20:21 Asia/Shanghai. The build read 863 assets and uploaded 165 changed files.

Production checks returned HTTP 200 for the homepage, documentation root, and interactive-application guide. Website JavaScript and CSS hashes match the local build. Production browser checks at 592×948 and 1303×986 confirmed the two-link header, separate idle and focused search/menu hit targets, the folded nested TOC marker, normal active text weight, and no page errors.

## Public documentation and README migration — 2026-11-04

The homepage body is retained. The header links to the local bilingual documentation and renders the Explore LinkSense wrapper only while its CTA belongs in the header, so an invisible CTA no longer reserves a fixed-width slot. `/install` now selects the edition and platform, links to the corresponding documentation anchor, and offers a short coding-agent prompt backed by the repository's canonical `Install.md`. Installer commands and resource guidance are maintained in the documentation rather than repeated in the website UI.

The product repository's existing Docusaurus source is compiled into the ignored `public/help/` directory with `LINKSENSE_REPO=<product-checkout> pnpm docs:build`. Vite serves its directory indexes during development and preview; the website deployment command builds documentation before the SPA. The public build merges seven Chinese/English deployment and development guides with the original help into an ignored `.public-docs/` tree and one docs instance. A single complete sidebar is shared across all sections. Inactive categories start collapsed; active-page ancestors open normally, and user-expanded categories remain open across client-side navigation. The normal product help build excludes the additional public guides, and its existing Markdown/Skill content is unchanged.

At 1094×986, Chrome checks verified the three-column layout, the moving TOC marker through intermediate animation frames, scroll tracking with `aria-current="location"`, anchor navigation and reload, navigation back to `/install`, and the Full/macOS deep link. At 390×844, the page stayed 390px wide, the page TOC expanded, and the documentation sidebar was reachable. Reduced motion disables smooth scrolling and removes the marker's visible transition. The header CTA has no element or fixed-width placeholder at the top, and appears after the hero CTA leaves the viewport. No page errors were observed. Public deployment guides were also found in the English local search index.

The latest sidebar check used the Codex browser on the English user-guide overview. Self-hosting, Administrator guide, and Developer guide all started with `aria-expanded="false"`; only the current User guide was open. Manually opening Self-hosting revealed its four deployment guides. Selected leaf and category links both measured `font-weight: 400`; the active category keeps its gray row background. The left search popover now aligns with its input and renders above the article instead of being clipped by the sidebar. The public headers now expose Documentation, Developers, and Community, with Explore kept as a separate CTA. Public documentation and the website import the same `src/site-theme.css` entry, including the original button fill/text-rollover animation.

Validation: 19 website tests, 27 documentation tests, and 2 bilingual README/link checks pass. Website lint/build and documentation TypeScript checks pass; both public and bundled documentation build in Chinese and English. The latest bundled build also confirms that public deployment guides remain excluded. The existing large website JavaScript chunk warning remains. No installer or model task was performed. README links require publication of the matching website documentation before they work online.

### Production release

Website commit `e5724ec` (code at `43d49ae`) was deployed with `LINKSENSE_REPO=/Users/bryceloskie/c/linksense pnpm run deploy` to the existing `linksense-site` Worker. The documentation was built from product branch `feat-computer-use` at commit `1f15460`. Cloudflare version `0265984a-d0e3-4329-9261-16c897669c29` completed deployment on 2026-11-04 at approximately 19:24 Asia/Shanghai. The upload read 863 assets, uploaded 432 changed files, and retained the custom domain and single-page-application fallback.

Production checks returned HTTP 200 for `/`, `/install`, the Full/macOS install link, both documentation roots, both deployment roots, source development, and the English user-guide overview. The deployed website JavaScript, website CSS, and English documentation CSS match the local build byte for byte. Browser checks at 1440×1000 and 390×844 confirmed the three navigation menus, the separate Explore CTA, collapsed inactive documentation categories, normal-weight active category and TOC links, the full-width left search popover, working locale switching, and a full-height mobile menu with no page errors.

## Cuberto alignment — 2026-10-28

The homepage now follows the Cuberto reference structure: a centered white opening, a full-width rounded showreel, an integrations row, a dark infrastructure panel, a FAQ and a centered dark contact outro. The hero copy is restored to the product statement, and the page returns to the existing Inter/Noto Sans SC font pipeline rather than the previous editorial display face.

The existing motion system is retained: the contextual mouse follower and magnetic logo targets, video play cursor, button fill/text rollovers, elastic rules, SplitText reveals, viewport video entrance and batch reveals. The showreel keeps its viewport entrance and explicit controls without an inner crop. Reduced-motion users keep static fallbacks.

## Homepage corrections — 2026-11-04

The showreel now uses `object-contain` without an inner crop, so the 30-second film remains complete at every viewport. The hero CTA shares a Motion `layoutId` with the header CTA: it remains in the hero until the first screen scrolls out, then flips into the navbar; the header stays available while that navbar CTA is active. Secondary section headings use a slightly smaller wide-screen scale. The standalone guide cards, three-step method list, secondary feature grid, capability map and organization metric tiles are removed. The footer separator above the brand/navigation row is removed.

Static Chrome-headless checks at 1440×1000 confirmed the hero CTA has a zero visible header counterpart at the top, then moves to the header at scroll 600px and back on scroll-up. The document remains 1440px wide.

Checks: all 20 tests, ESLint and the production build including TypeScript pass. Calculated contrast checks cover muted text on all five light surfaces and default/hover button text. Static Chrome headless screenshots at 1440×1000 and emulated 390×844 confirmed the centered desktop opening, left-aligned mobile opening and in-viewport header controls without horizontal overflow. Review findings and fixes are in `code-review-2026-10-28.md`. The CTA transition was sampled during normal motion; other normal-motion interactions, real-device and cross-browser motion results remain unverified.

### Production release

Application commit `9d52192` was pushed to `origin/main` and deployed with `pnpm run deploy` to the existing `linksense-site` Worker. Cloudflare version `dfa869ad-f545-45c2-8b35-fba3782e5f49` completed deployment on 2026-11-04 at approximately 11:54 Asia/Shanghai. The build read 132 assets and uploaded 11 changed files. The custom domain, compatibility date `2026-10-20`, asset base `/`, `auto-trailing-slash` HTML handling and `single-page-application` fallback remain intact.

Ten production route and asset checks pass. `/`, `/start` and `/install?edition=full&platform=macos` return HTTP 200 HTML referencing the current main script and stylesheet. The main JavaScript, CSS, the three generated guide images, introduction poster and video return HTTP 200 and match the local build's SHA-256 hashes. The main script hash is `26c2d1e22b2dd14a246e949eacc3bc65f2bdeba94091a2aa965cc742d9b4ed01`; the CSS hash is `9a07a51b0c071938922394e45deba7c7a7b22c75ca0ffd856b5fcca98e460bf0`.

### Previous production release (Cuberto alignment)

Application commit `2dbf9ca` was pushed to `origin/main` and deployed with `pnpm run deploy` to the existing `linksense-site` Worker. Cloudflare version `fec29c10-5617-4260-a4fa-e2df11916321` completed deployment on 2026-11-04 at approximately 11:04 Asia/Shanghai. The build read 130 assets and uploaded 9 changed files; the existing custom domain, compatibility date `2026-10-20`, asset base `/`, `auto-trailing-slash` HTML handling and `single-page-application` fallback remain intact.

Ten production route and asset checks pass. `/`, `/start` and `/install?edition=full&platform=macos` return HTTP 200 HTML referencing the current main script and stylesheet. The main JavaScript, CSS, route/start/install chunks, approved introduction poster and video return HTTP 200 and match the local build's SHA-256 hashes. The main script hash is `ca1d7f76fc2316e713922d4c661c0efc305f593201a822fbbf738249f16f0c8f`; the CSS hash is `c6c28b69d6e7b9cdf28cd818b96fb346ff0587076cb286f01d10e136d664c222`. A reduced-motion production screenshot confirmed the deployed centered opening.

### Earlier production release

Application commit `4a05aaa` was pushed to `origin/main` and deployed using `pnpm run deploy` to the existing `linksense-site` Worker. Cloudflare version `dfb38c6a-4fd6-4efb-9f93-1e3c46c2d389` completed deployment on 2026-10-28 at approximately 18:32 Asia/Shanghai. The CLI uploaded 129 changed assets from the 133-file build output. The existing custom domain, compatibility date `2026-10-20`, asset base `/`, `auto-trailing-slash` HTML handling and `single-page-application` fallback are preserved.

Fourteen production checks passed for that earlier editorial build: `/`, `/start` and `/install?edition=full&platform=macos` returned HTTP 200 HTML referencing its main script, and all checked JavaScript, CSS, font, license, video and poster assets matched the local build. The main script hash was `e76f377be1822d9c650108bba04220359ea7b3e374fedcb5a92b3f26d56b5611`; video hash remains `121641edb22fd618b3a36cd2faf82e4257e3ae930b321753ef7cfa3aebaa3058`.

Reviewed on 2026-10-16. Reference: https://cuberto.com/. LinkSense keeps its own copy, fonts, footage and native scrolling. This is an adaptation, not a claim of frame-perfect parity.

| Effect                               | Owner and trigger                         | Evidence and fallback                                                                                                                                                                            | Status      |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Masked headings and supporting copy  | GSAP SplitText, initial/route entry       | Entry coordinated with route cover; CJK uses line masks. Reduced motion retains readable text.                                                                                                   | adapted     |
| Video hover                          | Persistent cursor, fine pointer over reel | Captured circle growth from 10 to 49 to 65px, final 72px at 1440px viewport; exclusion blending, outline play icon and native pointer. Exit captured 72 to 29 to 12px.                           | implemented |
| Reel playback                        | ProductReel, viewport and explicit click  | Click opens native dialog, Close releases it. Preview pauses on hidden/offscreen/reduced motion; poster and explicit controls remain.                                                            | adapted     |
| Contextual pointer and elastic rules | Cursor and ElasticRule, fine pointer      | Link/project/media/stick modes, lag/skew, press/release and elastic recovery. Disabled for reduced motion/coarse pointers.                                                                       | adapted     |
| Header navigation                    | Header, hover/focus                       | Black underline scales horizontally; reduced motion removes transition. Normal link and keyboard semantics retained.                                                                             | implemented |
| Language menu                        | Base UI Select                            | Six options visible; Spanish selection survives reload, then restored to English. Base UI owns focus, keyboard and popup behavior.                                                               | implemented |
| Agent install                        | InstallPage, edition/platform selection   | Full/macOS selection updates prompt and official command; copy control reports success. Six locales are covered by translation/interpolation checks. Browser clipboard readback was unavailable. | implemented |
| SPA routes                           | SiteShell and TanStack Router             | Home to install navigation completes with cover reset; installation options remain in query parameters.                                                                                          | adapted     |

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

## Complete video frame and default mute — 2026-10-19

The previous Hero inherited the shared 1.12× media parallax transform. Production measurements reproduced overflow beyond the video frame. Commit `f7d69f8` removes only the Hero's internal parallax and inset entrance mask, keeps its scale/opacity entrance and hover behavior, and uses `object-contain`. The gray theme border is preserved. The full player uses a dynamic-viewport maximum height so its entire picture fits short screens. Commit `6b3ccdb` makes the full player muted by default, matching the existing muted preview; native audio controls remain available.

`pnpm build` passed with TypeScript checking. Browser assertions confirmed no video overflow, scale 1 and no inset clipping before/after scrolling, plus a complete 16:9 preview at 390px. At an emulated 844×390 landscape viewport, the full video measured 262px high and fit inside the visible dialog. Emulation was reset. Cloudflare production version `3203adfe` is Ready; the production preview uses `contain` with no overflow and the 30-second full player is playing with `muted: true` and controls enabled. Source changes are pushed to `main`. Real-device verification was not performed.

## Connected product direction — 2026-10-20

The 2026-11-04 simplification removed the scheduled-work, planning, goals, project-context and creation feature grid, the `/start` route and its entry points, the complete product section with its service disclosures and workflow demos, and the Knowledge / Skill / MCP capability diagram. Gray surfaces and brand blue replace the previous lilac/mint mix. The installation page keeps the compact title scale, neutral controls and clear command surfaces.

| Effect                       | Owner / trigger                        | Behavior and verification                                                                                                                                                                                                                                                                                                                                                                                                                                          | Status      |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| Capability selection         | React button state                     | All three cards and input paths stay active. Explanations rotate every 4s and remain manually selectable, with natural maximum height reserved. Pause/resume stops automatic changes and motion; auto mode does not make live announcements                                                                                                                                                                                                                        | implemented |
| Connection drawing / packets | Scoped GSAP timeline on entry or click | Three input paths draw together in 0.65s and send three simultaneous packets to the application, followed by one output packet to the team. The graphite core responds. Each 2.35s sequence repeats through the 4s explanation cycle (initial entry adds 0.5s). Three packets were observed mid-path at opacity 1. Offscreen/background/reduced-motion and pause states stop the timer/timeline; cleanup releases both. The unconnected fixed side dot was removed | implemented |
| Diagram geometry             | ResizeObserver / locale changes        | Paths follow measured source/app/team bounds rather than fixed translated coordinates                                                                                                                                                                                                                                                                                                                                                                              | implemented |
| Workflow steps               | React state / Motion entrance          | Each example has three independent pressed-state controls, polite output and a short 0.3s content entrance; rapid selection retains the latest step                                                                                                                                                                                                                                                                                                                | implemented |
| Services                     | Existing GSAP expansion                | Desktop scrolling retains the measured expansion; mobile and reduced-motion users use explicit disclosures                                                                                                                                                                                                                                                                                                                                                         | adapted     |
| Hero video                   | Existing ProductReel                   | Approved v6 media, full frame, gray outline and default mute retained                                                                                                                                                                                                                                                                                                                                                                                              | retained    |
| Installation controls        | Existing Motion layout compensation    | Core/Full and Linux/macOS still synchronize URL, requirements, command and Agent install prompt; each segmented indicator keeps its local layout owner                                                                                                                                                                                                                                                                                                             | retained    |
| Live motion preference       | Shared useSyncExternalStore hook       | The installed Motion hook only snapshots the setting; the new subscription responds in both directions. Browser verification confirmed the cursor becomes hidden and video/packets stop on a live change                                                                                                                                                                                                                                                           | implemented |

The six locale resource sets pass key/interpolation/fallback checks. At an emulated 390px viewport all six languages were exercised on home, install and start; page width stayed 390px and diagram labels did not overflow. Workflow review, original source and authorized sharing states were selected in the browser. Full/macOS installation still produced the correct non-sudo installer command and corresponding agent prompt. No installer or live AI operation was executed. All emulation and language selections are restored after checks.

Automated validation: 19 tests pass (including automatic three-capability cycling, pause/background/unmount cancellation, capability explanations, rapid independent workflow changes, measured path geometry and live preference subscription); lint and production build/TypeScript pass. Testing Library and a Node-compatible JSDOM are development-only dependencies. No runtime dependency or base framework was added. The existing large JavaScript chunk warning remains; no new performance score, real-device or screen-reader certification is claimed.

Released application source `87b2def` to the existing Worker via Dashboard upload. Production version `93205c52` is Ready, preserving `/` assets, `auto-trailing-slash` HTML handling and `single-page-application` fallback. `/`, `/install?edition=full&platform=macos` and `/start` return 200 HTML. Production main and route JavaScript match the built files byte for byte. The production diagram was observed rotating its explanation automatically from MCP to Knowledge over 4.3 seconds; all three source cards have the same blue border/text and all three input packets were visible mid-path together. The fixed side dot is absent. The full 30-second player remains muted with `object-fit: contain`, and the Full/macOS deep link still shows the non-sudo command. No production-origin console errors were recorded. Static screenshots were captured through the reduced-motion fallback; normal motion and default browser sizing were restored afterward.

## 2026-10-20 — Cuberto service composition

Scoped to the three product workflow panels. Cuberto's current homepage was inspected in the Codex browser: light collapsed rows become dark, image-backed panels, with left-aligned headings/copy, a small upper-right number and a circular arrow beside the action. The LinkSense adaptation uses the existing graphite theme, authored SVG planes/rings and interactive product examples instead of Cuberto's media. Title icons and the nested application-window chrome are removed; all existing copy, routes, six languages and three-step demonstrations remain.

| Effect             | Owner / trigger                                      | Motion and responsive branch                                                                                                                                                                                                           | Verification / status                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Service expansion  | Existing scoped GSAP / measured desktop scroll range | First panel open; later panels expand independently. Gray → graphite, body height → measured content, opacity enters over the latter half, artwork opacity 0 → 1, visual y 24 → 0; scrub 1. Stable list anchors and 16px gaps retained | Adapted. Forward intermediate body heights 33px / 211px and reverse 267px observed; multiple expanded panels and desktop/mobile breakpoint changes inspected                                                             |
| Mobile disclosure  | Existing button / GSAP height owner                  | Height 0 ↔ measured content in 0.5s `power3.out`; surface/artwork 0.4s. Current tweens are overwritten on reversal; expanded height returns to auto. Plus rotates to a cross. Reduced motion uses duration 0                           | Implemented. Pointer close, keyboard open/close/open and non-endpoint heights in both directions checked. Live reduced-motion change produced equal rendered/natural heights (582.25px), with visible, non-inert content |
| Workflow steps     | Existing React state / Motion content entrance       | Existing 0.3s opacity/y entrance, direct reduced-motion state. Three compact monochrome pills replace the boxed step footer                                                                                                            | Adapted. Request/review/refine regression passes; knowledge source selected in the browser. No automatic loop added                                                                                                      |
| Focus and fallback | Semantic buttons/links / media-query cleanup         | Explicit toggle selectors, `aria-expanded`, unique panel IDs and inert collapsed content retained. Default unenhanced panels remain readable on graphite; matchMedia and listeners revert on unmount                                   | Retained. Keyboard reversal and hidden/expanded panel attributes inspected; no screen-reader certification claimed                                                                                                       |

At 390×844 all six locale selections kept the document width at 390px and produced no overflowing workflow-step buttons. English, default viewport sizing and normal motion were restored. Targeted `pnpm test src/components/product-experience.test.tsx src/lib/motion-geometry.test.ts`: 3 tests pass. `pnpm lint` and final `pnpm build` (including TypeScript) pass. The existing main-chunk size warning remains. No new dependency, real-device/Safari check or performance score is included in this revision.

Released application source `753f1b9` to the existing `linksense-site` Worker through Dashboard upload. Production version `63c0a21f` is Ready at 100%. The 127-file upload preserves asset root `/`, `auto-trailing-slash` HTML handling and `single-page-application` fallback. `/`, `/start` and `/install?edition=full&platform=macos` return 200 HTML referencing the current build. Production main JavaScript, route JavaScript and CSS match the local build's SHA-256 hashes. The production browser renders all three authored service backgrounds; selecting Review displays `Analysis.xlsx`, and Request restores the first step. No production browser console errors were recorded. Existing domain `https://linksense.guygubaby.top` is retained.

## November 5, 2026 — English default, motion and control polish

The Next.js/Fumadocs replacement now defaults to English on `/` and `/doc/`. Chinese documentation is `/doc/zh-CN/`; old `/doc/en-US/` URLs remain compatible. LinkSense blue and the bilingual content are retained. The desktop documentation menu uses a large first card and four cards in a two-by-two grid. Text navigation links show an external-link icon; the GitHub icon does not. Enabled buttons, navigation and disclosure controls use a pointer cursor.

The installer uses native radio inputs in pill-shaped segmented controls with one persistent indicator per group. Browser checks covered pointer selection, arrow-key navigation, URL state and the corresponding installation prompt and guide.

The homepage adds Cuberto-inspired masked word/character entrances, staggered content and a rounded media reveal using GSAP. Captured heading transforms included intermediate offsets of approximately 58–116 percent before settling at zero. The existing LinkSense film has a custom player, muted autoplay when visible, pause/resume, mute, keyboard seeking and fullscreen. Reduced-motion checks show a still preview until the user explicitly plays it. Playback pauses offscreen and in hidden documents.

Validation: 16 unit tests, ESLint, TypeScript and the production build passed; 389 static routes were generated and 234 internal link destinations resolved. Chrome browser scenarios passed at 1440×1000 and 390×844, including the wide navigation menu, player controls and reduced-motion behavior, with no captured page or console errors. These viewport checks do not establish iOS/Safari or screen-reader behavior.
