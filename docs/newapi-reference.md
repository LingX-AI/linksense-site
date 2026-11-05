# New API 官网与文档源码调研

核实日期：2026-11-05。以下将公开源码、线上页面和未能确认的内容分别说明。

## 源码定位

| 对象                     | 核实结果                                                                                                                                                                   | 一手来源                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New API 产品本体         | `QuantumNous/new-api`。其中 `web/` 是产品控制台前端，不能据此认定它也是品牌官网或文档站的源码。当前 `web/package.json` 使用 React、Vite、TanStack Router 等依赖。          | [产品仓库](https://github.com/QuantumNous/new-api)、[控制台 package.json](https://github.com/QuantumNous/new-api/blob/main/web/package.json)              |
| 旧版文档                 | `QuantumNous/new-api-docs`。仓库已归档，README 明确指向新版；目录中是 `mkdocs.yml`、`requirements.txt` 与 Markdown 文档。                                                  | [旧仓库与迁移说明](https://github.com/QuantumNous/new-api-docs)                                                                                           |
| 当前文档                 | `QuantumNous/new-api-docs-v1`，默认分支 `main`。仓库 README 将其描述为 Next.js 文档站，并将 canonical origin 默认设为 `https://docs.newapi.ai`。                           | [文档仓库](https://github.com/QuantumNous/new-api-docs-v1)、[README](https://github.com/QuantumNous/new-api-docs-v1/blob/main/README.md)                  |
| `www.newapi.ai` 品牌官网 | 已确认线上页面与文档站有独立入口；尚未确认一个明确对应当前品牌官网的公开源码仓库。文档仓库中的 `(home)` 是文档门户首页，包含通往官方品牌站的链接，不能当作品牌官网源文件。 | [品牌官网](https://www.newapi.ai/en)、[文档门户首页源码](https://github.com/QuantumNous/new-api-docs-v1/blob/main/src/app/%5Blang%5D/%28home%29/page.tsx) |

新版文档的 `package.json` 列出 Next.js `16.4.1`、React `19.2.9`、Fumadocs Core/UI `16.0.10`、Fumadocs MDX `13.0.7` 和 Tailwind CSS v4。这些是本次读取的仓库声明；不据此推断线上每个域名正在运行的精确版本。[依赖清单](https://github.com/QuantumNous/new-api-docs-v1/blob/main/package.json)

可参考的文档源码位置：

- `src/app/[lang]/(home)`：文档门户首页。
- `src/app/[lang]/docs`：多语言文档布局与页面。
- `content/docs/`：MDX 正文与目录组织。
- `src/lib/source.ts`：内容源配置。
- `src/app/api/search/route.ts`：搜索接口。

以上路径来自仓库 [README 的 Project Structure](https://github.com/QuantumNous/new-api-docs-v1/blob/main/README.md)。

## REA 补查

使用本机 REA `6.8.0` 启动临时 Chrome，以空存储访问官网英文页。捕获中的最终 DOM、无障碍树和截图与品牌官网对应，浏览器已由 REA 终止并清理。

- Evidence：`ev_88e233f2ee9bda5e2146464c31801b703017ae40fb23e2f438171347dc7ef5a4`。
- 从这次保留的响应中提取到 13 个 JavaScript 文件，URL 使用 Next.js 的 `/_next/static/chunks/` 与 `app/[locale]/` 结构。
- 这 13 个脚本中没有发现 `sourceMappingURL`，其中出现的 GitHub 链接指向产品及生态项目，没有确认品牌官网的源码仓库。
- 捕获达到事件保留预算，存在遗漏。这是一次有限范围的观察，不证明官网不存在公开源码或源码映射，也不能恢复原始工程或服务端代码。

完整本地 Evidence 暂存于 `/tmp/linksense-newapi-homepage-evidence.json`，所选脚本及摘要在 `/tmp/linksense-newapi-homepage-artifacts/`。这些产物用于来源分析，没有进入 LinkSense 源码。

## 可借鉴的内容组织

品牌官网围绕产品定位、产品演示、生态与集成、核心功能、部署步骤和部署入口展开。文档站则以快速开始为入口，包含部署、使用、API、应用接入、支持等分类，并提供搜索、左侧目录和页内导航。[官网](https://www.newapi.ai/en)、[快速开始](https://docs.newapi.ai/en/docs)

对 LinkSense 有用的是官网到部署文档的连续路径，以及“选择部署 → 首次配置 → 第一个任务”的入门方式。New API 的模型渠道、API 计费、合作伙伴与采用数据属于其产品，本次未移植到 LinkSense。

## 许可证边界

`new-api-docs-v1/LICENSE` 将 `src/`、`scripts/`、配置等源码列为 MIT，将 `content/docs/` 与指定文档图片列为 CC0；商标和 Logo 明确排除在这些许可之外。New API 产品本体另有自己的许可证，不能用产品仓库的许可代替文档仓库的许可。[文档站 LICENSE](https://github.com/QuantumNous/new-api-docs-v1/blob/main/LICENSE)、[产品 LICENSE](https://github.com/QuantumNous/new-api/blob/main/LICENSE)

本次已直接导入并适配 `new-api-docs-v1` 的框架、首页 Hero、导航、页脚结构、文档布局和全局主题；MIT 声明保存在根目录 `THIRD_PARTY_NOTICES.md` 与 `licenses/new-api-docs-v1.LICENSE`。LinkSense 自有正文、Logo、视频与连接器素材保留原有权属。

## 最终实现

上游基线为 `d254f1842dc3d08d60f2269e2c9d4c9876a3dfbc`。原 Vite、TanStack Router、Docusaurus、GSAP/Motion 组件和旧 CSS 已移除，统一使用 Next.js 16.4.1、React 19.2.9、Fumadocs UI/Core 16.0.10、Fumadocs MDX 13.0.7、Tailwind CSS v4。

上游目录布局和组件负责视觉与交互；首页与 148 篇双语 MDX 文档使用 LinkSense 内容。默认英文文档为 `/doc/`，中文为 `/doc/zh-CN/`（原 `/doc/en-US/` 英文链接保留兼容），官网与安装页也在同一个 Next 项目中。`pnpm build` 将网页、文档和静态搜索索引输出到一个 `out/`。

根据 LinkSense 的品牌要求，上游粉色主题与 Hero 渐变已统一改为蓝色：浅色模式主色为 `#1765ED`，深色模式使用同色系提亮值。导航、按钮、文档链接与选中态均使用这组主题变量。

实际复用的上游公开首页使用 GrainGradient；`www.newapi.ai` 的 Gargantua 黑洞首页源码未确认，不将二者混称为同一份源码。更详细的仓库与产物检查参见本次研究记录，已检查 QuantumNous 的 6 个公开仓库、Calcium-Ion 的 53 个公开仓库、docs-v1 的部分首页历史，以及品牌官网当前列出的 23 个脚本；这些检查未定位黑洞首页的公开工程，但不证明其永远没有公开。
