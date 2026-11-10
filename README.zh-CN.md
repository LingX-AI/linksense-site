# linksense-site

[English](README.md) | 简体中文

LinkSense 官网与文档站，直接采用 [QuantumNous/new-api-docs-v1](https://github.com/QuantumNous/new-api-docs-v1) 的 Next.js / Fumadocs 工程、首页 Hero、导航和主题，替换原来的 Vite 与 Docusaurus 实现。首页文案、品牌、产品视频、连接器标志和 27 个主题文档保留为 LinkSense 内容，官网和文档均支持六种语言。

## 技术与来源

- Next.js 16.4.1、React 19.2.9、Fumadocs UI/Core 16.0.10、Fumadocs MDX 13.0.7、Tailwind CSS v4。
- 上游首页的 GrainGradient 动效、明暗模式、导航菜单与文档布局；主题和首页渐变统一替换为 LinkSense 品牌蓝 `#1765ED`。
- 一个根项目、一个 pnpm lockfile、一个 Next 构建，统一静态输出到 `out/`。
- 上游源码提交：`d254f1842dc3d08d60f2269e2c9d4c9876a3dfbc`。MIT 声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和 [原始许可证](licenses/new-api-docs-v1.LICENSE)。LinkSense 自有正文与品牌不因此改用 MIT/CC0。

公开源码中的首页属于 New API 文档门户，使用渐变 Hero。`www.newapi.ai` 当前的黑洞品牌首页尚未找到可确认的公开仓库，本项目不声称取得其原始源码。核实依据见 [源码调研](docs/newapi-reference.md)。

## 本地开发

使用 `.node-version` 指定的 Node 24，最低满足上游要求 `^24.22.1`，保留 pnpm 10.34.6：

```sh
pnpm install
pnpm dev
```

统一开发地址为 `http://127.0.0.1:18731`。Markdown/MDX、导航和网页都由同一个 Next 开发进程处理，无需其他产品仓库或文档服务。

```sh
pnpm build
pnpm preview
```

`pnpm build` 编译全部网页、多语言 MDX 和静态搜索索引，生成 `out/`，随后用 Cloudflare 官方工具生成并校验当前发布包；`pnpm preview` 预览完整静态产物。`pnpm typecheck`、`pnpm test` 和 `pnpm lint` 用于对应检查。

## 路由与内容

| 地址                                                       | 内容                                                        |
| ---------------------------------------------------------- | ----------------------------------------------------------- |
| `/`                                                        | 英文官网                                                    |
| `/zh/`、`/es/`、`/pt/`、`/fr/`、`/ja/`                     | 其他五种语言官网                                            |
| `/install/` 或 `/:lang/install/`                           | 部署选择与 AI 安装提示，保留 `edition`、`platform` 查询参数 |
| `/doc/`                                                    | 英文文档（默认）                                            |
| `/doc/zh-CN/`                                              | 中文文档                                                    |
| `/doc/es-ES/`、`/doc/pt-BR/`、`/doc/fr-FR/`、`/doc/ja-JP/` | 西班牙语、巴西葡萄牙语、法语和日语文档                      |
| `/llms.txt`                                                | 随构建生成的 AI 文档索引，链接六种语言的纯 Markdown 正文    |

官网与文档共用一个域名。文档和语言切换生成的地址都保留 `/doc/` 前缀，原有 `/doc/en-US/` 地址继续可用。

- 官网文案：`src/content/messages.ts`、`src/content/other-locales.ts`。
- 文档：`content/docs/{en,zh,es,pt,fr,ja}/`。新增的四种语言使用自动翻译生成。
- 文档首页按部署、首个任务、管理和开发分流。左侧使用 Fumadocs 原生折叠菜单，固定“部署与入门、用户指南、管理员指南、开发者指南”四个主入口，最多两级，不随当前指南切换。
- 相关小篇合并为连续主题文档：左侧只列主题，右侧目录按正文标题显示完整的多级章节；历史小篇 URL 在 `public/_redirects` 中跳转到对应章节。
- 公共主题：`src/app/global.css`，直接基于上游主题，未加载旧站 CSS。
- 文档搜索：Fumadocs + Orama，按语言使用对应的分词方式；索引在构建时按语言导出，浏览器只加载当前语言并在本地搜索。旧版 `/api/search` 保留中英文索引以兼容旧客户端；无搜索服务或模型 API。
- 产品内置帮助仍在产品仓库中维护；本站公开文档在本仓库中更新。

“复制 Markdown”使用的纯文本也从同一份 MDX 在构建时自动导出，无需另存或同步正文。

`/llms.txt` 从当前文档目录自动生成，只列出侧栏中的主题文档，不重复列出隐藏的旧部署参考页。官网与文档页脚都提供入口，页面头部通过 `rel="describedby"` 引用同一份索引。

## 发布

保留现有 Cloudflare Worker、域名与观测配置，静态目录改为 `out/`。`pnpm deploy` 先完成 Next 构建和发布包校验，再执行 `cf deploy --prebuilt`，避免框架检测或旧构建目录导致发布错误内容。`SITE_URL` 用于更换 canonical 域名；默认 `https://linksense.org`。

Cloudflare 的 `public/_redirects` 将旧 `/help/…` 永久跳转到对应的 `/doc/…`。`public/_headers` 声明静态搜索数据库的 JSON 类型。不存在的页面由导出的 `404.html` 处理。

本工程不包含登录、数据库、AI 搜索后端或 New API 的插件市场、用户反馈 API 与统计账号。
