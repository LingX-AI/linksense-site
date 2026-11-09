# Content sources

## Content preserved during the Next.js/Fumadocs migration — 2026-11-05

The website text and six locale dictionaries remain LinkSense content. The 74 Chinese articles and their 74 English translations were imported from the user's LinkSense checkout at `f74deb2a46f87ec035b069cf182c96c3d173a4d8`, under `apps/docs`, and now live in `content/docs/zh/` and `content/docs/en/`. Docusaurus admonitions and heading IDs were converted to MDX/Callout syntax while preserving their meaning. Product-embedded help remains separate.

The bilingual repository READMEs are the canonical source for the public deployment path, host requirements, installer commands, expected completion output, and first-use sequence. The `/doc/` and `/doc/zh-CN/` onboarding pages keep that sequence on one page; deeper deployment routes remain available for existing links and advanced reference.

The public guides now group related articles into continuous topic pages. Six user-guide topics cover getting started, tasks, messaging, Plugins/Skills/Applications, Knowledge, and personal settings. Five administrator topics cover accounts/access, resource governance, models/quotas/usage, system/sign-in configuration, and operations/audit. Original article text is preserved as sections with stable anchors. Public legacy URLs redirect to those sections; internal links and search use the consolidated pages. Product-embedded help remains unchanged.

The documentation home routes readers by task without duplicating the installation runbook. Four primary sidebar folders remain visible: deployment, user guide, administrator guide, and developer guide. The deployment folder expands to Docker preparation, Core, Full, first setup, operations, source development, and architecture; other guides expand only to topic pages. The page contents lists the complete H2–H6 section hierarchy.

The framework, homepage Hero, navigation, Fumadocs layout, and theme are now adapted directly from New API's public `new-api-docs-v1` source at `d254f1842dc3d08d60f2269e2c9d4c9876a3dfbc`. Its MIT notice is retained in `licenses/new-api-docs-v1.LICENSE` and `THIRD_PARTY_NOTICES.md`. New API product prose, trademarks, partner logos, adoption figures, and videos were not imported. LinkSense brand, supported connector marks, and product recordings retain their existing ownership and provenance.

The source boundary between the public docs/home portal and the black-hole marketing website is recorded in [newapi-reference.md](newapi-reference.md).

## Organizational capabilities and architecture

The bilingual `/doc/deploy/architecture/` and `/doc/zh-CN/deploy/architecture/` guides preserve the organization, finance example, Codex runtime, self-hosting, and architecture sections from the product READMEs at `c9ff6009bb8d8807dae56644f7563b5c4e8d1d28`. The seven original `docs/diagrams/` SVGs are served from this site's `public/diagrams/`. The product READMEs link here for the full explanation.

## Website product facts

Reviewed 2026-10-16 against the LinkSense source checkout at `a3fcd0d`. These are content sources, not a claim of installation or runtime certification.

| Content                                                     | First-party source                                                                                             |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Positioning, deployments, hardware, commands, model freedom | https://github.com/LingX-AI/linksense/blob/main/README.zh-CN.md                                                |
| Deliverables and previews                                   | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/tasks/files-and-results.md           |
| File annotations                                            | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/tasks/file-annotations.md            |
| Knowledge and citations                                     | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/knowledge-bases/use-and-citations.md |
| Application packages and managed services                   | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/plugin-center/organization-apps.md   |
| Recurring tasks                                             | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/automations/create-and-manage.md     |
| Connectors                                                  | https://github.com/LingX-AI/linksense/blob/main/docs/workspace-connections.md                                  |
| Channels and their different support limits                 | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/message-channels/overview.md         |
| First task and model setup                                  | https://github.com/LingX-AI/linksense/blob/main/apps/docs/docs/user-guide/getting-started/first-task.md        |
| Attribution and internal deployments                        | https://github.com/LingX-AI/linksense/blob/main/LICENSE-EXCEPTIONS.md                                          |

Core handles ordinary attachments; Full adds the full knowledge processing/retrieval stack. Model setup is required. Self-hosting does not guarantee offline operation, task-level security isolation, or absence of external data transmission. Product features are not proof of throughput, customer adoption, quality guarantees or regulatory certification.

No customer logos, testimonials, usage counts or performance statistics were invented. Official product and installation links point to LinkSense's repository and demo; production availability must be checked independently.

The 2026-10-20 product walkthroughs are labeled illustrations. Their sample procurement question, policy excerpt, file names and Operations team are authored examples, not customer documents, actual execution results or performance claims. They demonstrate the documented request/review/refine, knowledge-citation and application-authorization flows. Knowledge remains identified as a Full capability.
