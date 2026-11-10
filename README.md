# linksense-site

English | [简体中文](README.zh-CN.md)

The LinkSense website and documentation use the [QuantumNous/new-api-docs-v1](https://github.com/QuantumNous/new-api-docs-v1) Next.js/Fumadocs project, including its home hero, navigation, and theme, in place of the previous Vite and Docusaurus implementation. The site retains LinkSense content in six languages, brand assets, product videos, connector logos, and 27 documentation topics.

## Technology and sources

- Next.js 16.4.1, React 19.2.9, Fumadocs UI/Core 16.0.10, Fumadocs MDX 13.0.7, and Tailwind CSS v4.
- The upstream home page's GrainGradient animation, light and dark modes, navigation menus, and documentation layout. The theme and home gradient use LinkSense brand blue `#1765ED`.
- One root project, one pnpm lockfile, and one Next.js build, with static output in `out/`.
- Upstream commit: `d254f1842dc3d08d60f2269e2c9d4c9876a3dfbc`. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and the [original license](licenses/new-api-docs-v1.LICENSE) for the MIT notice. LinkSense's own text and branding are not relicensed under MIT or CC0.

The public upstream home page belongs to the New API documentation portal and uses a gradient hero. No confirmed public source repository has been found for the black-hole marketing page at `www.newapi.ai`; this project does not claim to use its original source. See the [source investigation](docs/newapi-reference.md).

## Local development

Use Node 24 as specified in `.node-version`, satisfying the upstream requirement `^24.22.1`, and pnpm 10.34.6:

```sh
pnpm install
pnpm dev
```

The development site runs at `http://127.0.0.1:18731`. A single Next.js process handles Markdown/MDX, navigation, and web pages; no sibling product checkout or separate documentation service is required.

```sh
pnpm build
pnpm preview
```

`pnpm build` compiles the website, multilingual MDX, and static search index into `out/`, then generates and validates the deployment package with Cloudflare's official tools. `pnpm preview` serves the complete static output. Use `pnpm typecheck`, `pnpm test`, and `pnpm lint` for their respective checks.

## Routes and content

| Path                                                       | Content                                                                                 |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `/`                                                        | English website                                                                         |
| `/zh/`, `/es/`, `/pt/`, `/fr/`, `/ja/`                     | Website in the other five languages                                                     |
| `/install/` or `/:lang/install/`                           | Deployment selection and AI installation prompt, preserving `edition` and `platform`    |
| `/doc/`                                                    | English documentation (default)                                                         |
| `/doc/zh-CN/`                                              | Chinese documentation                                                                   |
| `/doc/es-ES/`, `/doc/pt-BR/`, `/doc/fr-FR/`, `/doc/ja-JP/` | Spanish, Brazilian Portuguese, French, and Japanese documentation                       |
| `/llms.txt`                                                | Build-generated AI documentation index linking to Markdown content in all six languages |

The website and documentation share one domain. Documentation links and language switching retain the `/doc/` prefix. Existing `/doc/en-US/` links remain supported.

- Website text: `src/content/messages.ts` and `src/content/other-locales.ts`.
- Documentation: `content/docs/{en,zh,es,pt,fr,ja}/`. The four newly added translations were generated automatically.
- The documentation home directs readers to deployment, the first task, administration, and development. The Fumadocs sidebar has four fixed, collapsible sections: Deployment and Getting Started, User Guide, Administrator Guide, and Developer Guide. It has at most two levels and does not change with the current guide.
- Related short articles are combined into continuous topic pages. The left sidebar lists topics, while the right table of contents shows the full heading hierarchy. Legacy article URLs redirect to the corresponding sections through `public/_redirects`.
- Shared theme: `src/app/global.css`, based on the upstream theme without the previous site's CSS.
- Documentation search: Fumadocs and Orama, with language-specific tokenization. Indexes are exported at build time, and the browser loads only the selected language for local search. The legacy `/api/search` index retains English and Chinese for older clients; there is no search service or model API.
- Product-embedded help is maintained in the product repository. This repository maintains the public documentation.

The plain text used by “Copy Markdown” is also exported from the same MDX at build time, so the content does not need a separate copy.

`/llms.txt` is generated from the current documentation directory. It lists the topics in the sidebar without duplicating hidden legacy deployment reference pages. The website and documentation footers link to it, and page headers reference the same index via `rel="describedby"`.

## Deployment

The existing Cloudflare Worker, domain, and observability configuration are retained, with `out/` as the static directory. `pnpm deploy` first builds Next.js and validates the deployment package, then runs `cf deploy --prebuilt` to avoid publishing the wrong content because of framework detection or an old build directory. Set `SITE_URL` to change the canonical domain; the default is `https://linksense.org`.

Cloudflare's `public/_redirects` permanently redirects legacy `/help/…` URLs to their corresponding `/doc/…` pages. `public/_headers` declares the JSON content type for the static search database. The exported `404.html` handles missing pages.

This project does not include login, a database, an AI search backend, or New API's plugin marketplace, user feedback API, or analytics accounts.
