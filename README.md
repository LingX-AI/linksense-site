# linksense-site

[English](#english) · [简体中文](#简体中文)

## English

The standalone LinkSense product website: a React SPA with a product homepage, installation guide, and getting-started guide.

**Website:** [linksense.guygubaby.top](https://linksense.guygubaby.top/)

### Development

Requires Node.js 24+ and pnpm 10.34.6.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://127.0.0.1:18731](http://127.0.0.1:18731).

```sh
pnpm test
pnpm lint
pnpm build
pnpm preview
```

`build` generates routes, builds the static assets, and checks TypeScript. TanStack Router generates `src/routeTree.gen.ts`; do not edit it manually. After a fresh installation, run `pnpm build` or `pnpm dev` before running `pnpm typecheck` separately.

### Stack and content

- React 19, TypeScript, Vite 8, and Tailwind CSS v4.
- TanStack Router file-based routing and route code splitting, Motion and GSAP animations, and source-owned Base UI / shadcn components.
- i18next / react-i18next with English, Simplified Chinese, Spanish, Brazilian Portuguese, French, and Japanese. English is the default and fallback; language selection persists in the browser.
- The website needs no backend, database, or authentication. The product workspace remains in the original LinkSense project.
- Installation options for the operating system and Core / Full configuration are stored in URL parameters and validated with Zod before generating the command.

### Static deployment

Run `pnpm build` and publish `dist/`. The host must serve existing assets normally and fall back to `/index.html` for SPA paths such as `/install` and `/start`.

The current deployment is a local build uploaded manually to the `linksense-site` Worker through **Upload your static files** in the Cloudflare Dashboard. Select the `dist/` folder, set the assets directory to `/`, and set **Not found handling** to `single-page-application`. Use Node.js 24 for builds. The production domain is [linksense.guygubaby.top](https://linksense.guygubaby.top/).

The GitHub repository `LingX-AI/linksense-site` stores the source code. Cloudflare Git integration is not configured, so pushing commits does not deploy the site.

`cloudflare.config.ts` and `wrangler.config.ts` support an optional CLI deployment workflow, including SPA fallback, the domain, and the `dist/` assets directory. Dashboard uploads do not read these files. To deploy with the CLI, sign in to Cloudflare first, then run `pnpm build && pnpm deploy`. To validate the CLI deployment configuration without publishing, run `pnpm exec cf deploy --dry-run`.

Other static hosts need their own SPA fallback configuration. For Nginx, use `try_files $uri $uri/ /index.html;`.

### Content and asset sources

Product facts are documented in [docs/content-sources.md](docs/content-sources.md). LinkSense branding and product footage come from the LinkSense repository; asset provenance is recorded in [public/media/README.md](public/media/README.md). Workflow illustrations are labeled examples, not customer data or actual product screenshots.

The visual reference is [Cuberto](https://cuberto.com/). The implementation uses LinkSense's own brand, media, and product content; it does not include Cuberto's commercial fonts, footage, or code. See [docs/verification.md](docs/verification.md) for motion coverage, verification results, and known limits.

## 简体中文

LinkSense 的独立产品官网。React SPA，包含产品首页、部署安装与快速上手。

**官网：**[linksense.guygubaby.top](https://linksense.guygubaby.top/)

### 开发

需要 Node.js 24+ 和 pnpm 10.34.6。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开 [http://127.0.0.1:18731](http://127.0.0.1:18731)。

```sh
pnpm test
pnpm lint
pnpm build
pnpm preview
```

`build` 会生成路由、构建静态文件并检查 TypeScript。`src/routeTree.gen.ts` 由 TanStack Router 自动生成，不手工维护；全新安装后先运行 `pnpm build` 或 `pnpm dev` 再单独运行 `typecheck`。

### 技术与内容

- React 19、TypeScript、Vite 8、Tailwind CSS v4。
- TanStack Router 文件路由及按路由拆包，Motion 和 GSAP 动效，Base UI / shadcn 源码组件。
- i18next / react-i18next：英语、简中、西语、巴葡、法语、日语；英语默认并作为回退，选择保存在当前浏览器。
- 官网不需要后端、数据库或登录系统；产品工作台保留在原项目中。
- 安装页使用 URL 参数保存操作系统和 Core / Full 选择，生成命令前通过 Zod 校验。

### 静态部署

运行 `pnpm build`，发布 `dist/`。托管服务必须把 `/install`、`/start` 等 SPA 路径回退到 `/index.html`，并正确返回现有静态文件。

当前使用本地构建后，通过 Cloudflare Dashboard 的 **Upload your static files** 手动发布到 `linksense-site` Worker。选择 `dist/` 文件夹，资源目录设置为 `/`，**Not found handling** 设置为 `single-page-application`。构建使用 Node.js 24，生产域名为 [linksense.guygubaby.top](https://linksense.guygubaby.top/)。

GitHub 仓库 `LingX-AI/linksense-site` 用于保存源码，尚未连接 Cloudflare 自动构建；推送提交不会自动发布。

`cloudflare.config.ts` 和 `wrangler.config.ts` 保留给可选的 CLI 发布流程，包含 SPA 回退、域名和静态资源目录 `dist/`；Dashboard 上传不会读取这两个文件。CLI 发布需先完成 Cloudflare 登录，然后执行 `pnpm build && pnpm deploy`。检查 CLI 部署配置而不发布：`pnpm exec cf deploy --dry-run`。

部署到其他静态托管服务时，应单独配置 SPA 回退。Nginx 可使用 `try_files $uri $uri/ /index.html;`。

### 内容与素材来源

事实依据见 [docs/content-sources.md](docs/content-sources.md)。品牌标志和产品视频来自 LinkSense 自有仓库，记录于 [public/media/README.md](public/media/README.md)。界面中的工作流插图是明确标记的示意，不冒充客户数据或实际产品截图。

视觉参考为 [Cuberto](https://cuberto.com/)，实现保留 LinkSense 自己的品牌、素材和产品内容，不包含 Cuberto 的商业字体、视频或代码。动效覆盖与验证记录见 [docs/verification.md](docs/verification.md)。
