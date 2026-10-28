# linksense-site

[English](#english) · [简体中文](#简体中文)

## English

The standalone LinkSense product website: a React SPA with a product homepage, installation guide, and getting-started guide.

**Website:** [linksense.guygubaby.top](https://linksense.guygubaby.top/)

### Stack and content

- React 19, TypeScript, Vite 8, and Tailwind CSS v4.
- TanStack Router file-based routing and route code splitting, Motion and GSAP animations, and source-owned Base UI / shadcn components.
- i18next / react-i18next with English, Simplified Chinese, Spanish, Brazilian Portuguese, French, and Japanese. English is the default and fallback; language selection persists in the browser.
- The website needs no backend, database, or authentication. The product workspace remains in the original LinkSense project.
- Installation options for the operating system and Core / Full configuration are stored in URL parameters and validated with Zod before generating the command.

### Content and asset sources

Product facts are documented in [docs/content-sources.md](docs/content-sources.md). LinkSense branding and product footage come from the LinkSense repository; asset provenance is recorded in [public/media/README.md](public/media/README.md). Workflow illustrations are labeled examples, not customer data or actual product screenshots.

The visual direction is a calm, editorial workspace: oversized Bricolage Grotesque headings, paper-like workflow previews, and LinkSense blue. The font is self-hosted under the SIL Open Font License in `public/fonts/`. Product branding, media, and content remain LinkSense's own. See [docs/verification.md](docs/verification.md) for verification history and known limits.

## 简体中文

LinkSense 的独立产品官网。React SPA，包含产品首页、部署安装与快速上手。

**官网：**[linksense.guygubaby.top](https://linksense.guygubaby.top/)

### 技术与内容

- React 19、TypeScript、Vite 8、Tailwind CSS v4。
- TanStack Router 文件路由及按路由拆包，Motion 和 GSAP 动效，Base UI / shadcn 源码组件。
- i18next / react-i18next：英语、简中、西语、巴葡、法语、日语；英语默认并作为回退，选择保存在当前浏览器。
- 官网不需要后端、数据库或登录系统；产品工作台保留在原项目中。
- 安装页使用 URL 参数保存操作系统和 Core / Full 选择，生成命令前通过 Zod 校验。

### 内容与素材来源

事实依据见 [docs/content-sources.md](docs/content-sources.md)。品牌标志和产品视频来自 LinkSense 自有仓库，记录于 [public/media/README.md](public/media/README.md)。界面中的工作流插图是明确标记的示意，不冒充客户数据或实际产品截图。

视觉采用安静的编辑式排版：Bricolage Grotesque 大字标题、纸张式工作流预览与 LinkSense 品牌蓝。字体自托管，SIL Open Font License 保留于 `public/fonts/`。品牌、视频和产品内容仍使用 LinkSense 自有素材。历史验证记录与已知边界见 [docs/verification.md](docs/verification.md)。
