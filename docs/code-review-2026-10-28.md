# Editorial redesign review

Date: 2026-10-28. Baseline: `34db6915b74575fc6c693f72f63b735b9514e3d5`.
Scope: the uncommitted redesign, its shared components, animation lifecycle,
localization, installation/start routes, tests, font assets and deployment.
Expected load: a public static SPA with independent browser sessions, no
application backend or user-data writes.

## Standards findings

1. **P2, fixed: muted text contrast on colored surfaces.**
   `src/styles.css` used `#626e67`, yielding approximately 4.47:1 on cloud,
   4.38:1 on sage and 4.39:1 on sand. Changed the shared token to `#606b64`;
   all five light surfaces now exceed 4.5:1. Added calculated contrast tests.
2. **P2, fixed: default button hover contrast.**
   `src/lib/button-variants.ts` blended the blue to 85% opacity, reducing
   white-text contrast to approximately 3.98:1 on the page background.
   Reused the opaque foreground token for hover and added a regression check.

No confirmed new injection, secret-exposure or API-contract regression was
found. Inline brand SVG is source-controlled, installation search parameters
remain validated and the new font retains its SIL Open Font License.

## Specification and release findings

1. **P1, fixed: deployment could publish an old build.**
   `cf deploy --dry-run` delegated this assets-only project to Wrangler and
   read the existing `dist/` without running the application's build script.
   `package.json` now runs `pnpm build && cf deploy`, so compilation and
   TypeScript must succeed before uploading.

The mouse follower, magnetic targets, video cursor, button rollovers, elastic
rules, SplitText, viewport entrances, metrics and service-scroll expansion
remain connected to their original shared implementations. Official media,
six locale resource sets, installation commands, touch disclosures and
reduced-motion branches remain present.

Added wrapping safeguards to narrow statistics and workflow labels. A rendered
overflow was not reproduced, so these are preventive changes, not confirmed
findings. Aligned the Cloudflare compatibility date with the existing production
version's `2026-10-20`, rather than changing its runtime baseline on release.

## Verification and limits

All 26 automated tests, ESLint and the production build including TypeScript
pass. Deployment dry-run reads 133 static files with no application bindings.
Production release results are recorded in `docs/verification.md`.

The browser-control session was unavailable for this review; no fresh browser
interaction, all-locale viewport, real-device or Safari validation is claimed.
The existing JavaScript chunk-size warning remains; a performance benchmark
and bundle refactor are outside this release.
