# linksense-site

[English](#english) · [简体中文](#简体中文)

## English

The standalone LinkSense product website: a React SPA homepage and deployment selector, with bilingual static documentation at `/help/`.

**Website:** [linksense.guygubaby.top](https://linksense.guygubaby.top/)

### Stack and content

- React 19, TypeScript, Vite 8, and Tailwind CSS v4.
- TanStack Router file-based routing and route code splitting, Motion and GSAP animations, and source-owned Base UI / shadcn components.
- i18next / react-i18next with English, Simplified Chinese, Spanish, Brazilian Portuguese, French, and Japanese. English is the default and fallback; language selection persists in the browser.
- The website needs no backend, database, or authentication. The product workspace remains in the original LinkSense project.
- Installation options for the operating system and Core / Full configuration are stored in URL parameters and validated with Zod before generating the command.

### Content and asset sources

Product facts are documented in [docs/content-sources.md](docs/content-sources.md). LinkSense branding and product footage come from the LinkSense repository; asset provenance is recorded in [public/media/README.md](public/media/README.md). Workflow illustrations are labeled examples, not customer data or actual product screenshots.

The homepage keeps a centered white opening, a large rounded showreel, integrations, self-hosting, FAQs, and restrained blue accents. It uses Inter and Noto Sans SC, LinkSense's own media, and the existing Motion/GSAP interactions. See [docs/verification.md](docs/verification.md) for verification history and known limits.

### Documentation

Documentation is maintained once in the LinkSense repository's `apps/docs` package and rendered with its existing Docusaurus theme and search. Public builds add installation, operations, and source-development guides; the product's bundled help content stays separate.

```sh
pnpm docs:build
pnpm dev
```

The default source checkout is `../linksense`. Override it with `LINKSENSE_REPO=/path/to/linksense` when using another worktree. That checkout needs its pnpm dependencies installed. The generated `public/help/` directory is ignored by Git and served by Vite in development. `pnpm deploy` rebuilds both documentation and the website.

`src/site-theme.css` is the shared theme entry for the website and public documentation. It imports `theme-tokens.css` for fonts, colors, spacing, and header sizes, plus `pill.css` for the shared button animations. The documentation build passes it through `LINKSENSE_WEBSITE_THEME`. Both headers use Documentation and Community as their main menus; Explore remains a separate CTA. Documentation uses one complete sidebar across sections, with inactive categories collapsed by default.

## 简体中文

LinkSense 的独立产品官网。React SPA 包含首页和部署选择页，`/help/` 提供中英文静态文档。

**官网：**[linksense.guygubaby.top](https://linksense.guygubaby.top/)

### 技术与内容

- React 19、TypeScript、Vite 8、Tailwind CSS v4。
- TanStack Router 文件路由及按路由拆包，Motion 和 GSAP 动效，Base UI / shadcn 源码组件。
- i18next / react-i18next：英语、简中、西语、巴葡、法语、日语；英语默认并作为回退，选择保存在当前浏览器。
- 官网不需要后端、数据库或登录系统；产品工作台保留在原项目中。
- 安装页使用 URL 参数保存操作系统和 Core / Full 选择，生成命令前通过 Zod 校验。

### 内容与素材来源

事实依据见 [docs/content-sources.md](docs/content-sources.md)。品牌标志和产品视频来自 LinkSense 自有仓库，记录于 [public/media/README.md](public/media/README.md)。界面中的工作流插图是明确标记的示意，不冒充客户数据或实际产品截图。

首页保留居中的白色开场、大幅圆角 showreel、系统连接、自主部署与 FAQ，以克制的 LinkSense 蓝色点缀。字体沿用 Inter 与 Noto Sans SC，品牌与视频使用自有素材，动画沿用现有 Motion / GSAP。历史验证记录与已知边界见 [docs/verification.md](docs/verification.md)。

### 文档维护

文档唯一内容源是产品仓库的 `apps/docs`。执行 `pnpm docs:build` 后启动 `pnpm dev`；默认读取相邻的 `../linksense`，可用 `LINKSENSE_REPO` 指定其他工作目录。产品仓库需先安装 pnpm 依赖。生成的 `public/help/` 不入 Git；官网发布命令会重新构建文档。

新增部署指南只进入官网公开构建，不进入产品内置帮助与 Skill。中文地址为 `/help/`，英文为 `/help/en-US/`。README 中的用户、管理员、部署和开发链接使用这套固定地址。

官网和公开文档共用 `src/site-theme.css` 主题入口，其中包含 `theme-tokens.css` 的字体、颜色、留白和页头尺寸，以及 `pill.css` 的按钮动画；构建命令会通过 `LINKSENSE_WEBSITE_THEME` 自动传入文档工程。顶部主菜单统一为文档、社区，体验入口保留为独立按钮。文档跨章节使用同一份完整左侧目录，非当前分类默认折叠。
