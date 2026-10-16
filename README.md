# linksense-site

LinkSense 的独立产品官网。React SPA，包含产品首页、部署安装与快速上手。

## 开发

需要 Node.js 24+ 和 pnpm 10.34.6。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开 http://127.0.0.1:18731。

```sh
pnpm test
pnpm lint
pnpm build
pnpm preview
```

`build` 会生成路由、构建静态文件并检查 TypeScript。`src/routeTree.gen.ts` 由 TanStack Router 自动生成，不手工维护；全新安装后先运行 `pnpm build` 或 `pnpm dev` 再单独运行 `typecheck`。

## 技术与内容

- React 19、TypeScript、Vite 8、Tailwind CSS v4。
- TanStack Router 文件路由及按路由拆包，Motion 动效，Base UI / shadcn 源码组件。
- i18next / react-i18next：英语、简中、西语、巴葡、法语、日语；英语默认并作为回退，选择保存在当前浏览器。
- 官网不需要后端、数据库或登录系统；产品工作台保留在原项目中。
- 安装页使用 URL 参数保存操作系统和 Core / Full 选择，复制命令前通过 Zod 校验。

## 静态部署

运行 `pnpm build`，发布 `dist/`。托管服务必须把 `/install`、`/start` 等 SPA 路径回退到 `/index.html`，并正确返回现有静态文件。

当前使用本地构建后，通过 Cloudflare Dashboard 的 **Upload your static files** 手动发布到 `linksense-site` Worker。选择 `dist/` 文件夹，资源目录设置为 `/`，Not found handling 设置为 `single-page-application`。Node.js 使用 24，生产域名为 `linksense.guygubaby.top`。

GitHub 仓库 `LingX-AI/linksense-site` 用于保存源码，尚未连接 Cloudflare 自动构建；推送提交不会自动发布。

`cloudflare.config.ts` 和 `wrangler.config.ts` 保留给可选的 CLI 发布流程，包含 SPA 回退、域名和静态资源目录 `dist/`；Dashboard 上传不会读取这两个文件。CLI 发布需先完成 Cloudflare 登录，然后执行 `pnpm build && pnpm deploy`。检查 CLI 部署配置而不发布：`pnpm exec cf deploy --dry-run`。

部署到其他静态托管服务时，应单独配置 SPA 回退。Nginx 可使用 `try_files $uri $uri/ /index.html;`。

## 内容与素材来源

事实依据见 [docs/content-sources.md](docs/content-sources.md)。品牌标志和产品视频来自 LinkSense 自有仓库，记录于 [public/media/README.md](public/media/README.md)。界面中的工作流插图是明确标记的示意，不冒充客户数据或实际产品截图。

视觉参考为 [Cuberto](https://cuberto.com/)，实现保留 LinkSense 自己的品牌、素材和产品内容，不包含 Cuberto 的商业字体、视频或代码。动效覆盖与验证记录见 [docs/verification.md](docs/verification.md)。
