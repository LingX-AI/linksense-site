import { es, pt, fr, ja } from './other-locales'
import { experienceCopy } from './experience-copy'

export const locales = [
  'en-US',
  'zh-CN',
  'es-ES',
  'pt-BR',
  'fr-FR',
  'ja-JP',
] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en-US'
export const languageNames: Record<Locale, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'es-ES': 'Español',
  'pt-BR': 'Português',
  'fr-FR': 'Français',
  'ja-JP': '日本語',
}

const en = {
  ...experienceCopy['en-US'],
  agentTitle: 'Agent install',
  agentBody:
    'Give this prompt to your coding agent. It includes your selected deployment and platform, environment checks and the official installation instructions.',
  agentCopy: 'Copy agent prompt',
  agentPrompt:
    'Install LinkSense {{edition}} on this {{platform}} machine.\n\nRead the official installation guide first: {{docs}}\n\nCheck the actual OS and architecture, Docker Engine API 1.45+, Docker Compose 2.24.4+, available Docker memory, SSD capacity and TCP port 18081. Inspect the installer before running it. Use this selected command only if it matches this host:\n\n{{command}}\n\nIf LinkSense is already installed, inspect its state and preserve all keys and data volumes. Stop before overwriting or resetting existing data. Do not print secrets in your final response.\n\nAfter installation, provide the access URL and guide me through the one-time administrator initialization and model configuration. Ask me to enter passwords and API keys in the local application, not in this chat.',
  proofTitle: 'Built for an organization’s working day.',
  languages: 'Interface languages',
  deployments: 'Self-hosted configurations',
  channels: 'Messaging channels',
  methodsTitle: 'Give a good method\na life beyond one task.',
  method1: 'Ask for an outcome.',
  method2: 'Point out the details.',
  method3: 'Make it reusable.',
  method1body: 'Describe the goal, the materials and the result you need.',
  method2body: 'Select a part of the deliverable and ask for a precise change.',
  method3body: 'Combine what works into an application your team can use.',
  insightsTitle: 'A useful place\nto begin.',
  extend: 'Build with LinkSense',
  installGuide: 'Choose a deployment, understand the requirements and install.',
  startGuide: 'Connect a model and complete your first real task.',
  extendGuide:
    'Package skills, connect MCP and create interactive applications.',
  read: 'Read the guide',
  planTitle: 'Plan before you act.',
  planBody:
    'Use Plan mode to agree on the approach before implementation. Follow steps, tools and subagent activity as work progresses.',
  goalTitle: 'Keep a complex goal moving.',
  goalBody:
    'Use Goal mode for multi-step work, with visible progress, pause controls and execution limits.',
  spaceTitle: 'Pick up where you left off.',
  spaceBody:
    'Organize tasks into projects and continue with existing working files. Personal tasks share a user environment, not isolated task sandboxes.',
  createTitle: 'More ways to create.',
  createBody:
    'Dictate an editable draft, generate images with a configured model, or publish an HTML deliverable as a public static site.',
  home: 'Home',
  product: 'Product',
  install: 'Self-host',
  start: 'Get started',
  docs: 'Documentation',
  try: 'Explore LinkSense',
  menu: 'Menu',
  close: 'Close',
  language: 'Language',
  skip: 'Skip to content',
  category: 'An AI workspace for your organization',
  hero1: 'Good ideas.',
  hero2: 'Better together.',
  heroBody:
    'Work with AI. Keep what works. Give your team the knowledge, skills and tools to do it again.',
  watch: 'See LinkSense at work',
  play: 'Play product demo',
  pause: 'Pause product demo',
  introTitle: 'Good work deserves\nto go further.',
  introBody:
    'Give everyone a place to work with AI. Give your organization a way to keep the knowledge, methods and tools that make it work.',
  workTitle: 'From a request to a deliverable.',
  workBody:
    'Research a topic, analyze a spreadsheet, create a presentation. Preview Word, Excel, PPT and HTML, select a detail and ask for changes.',
  knowledgeTitle: 'Answers with something behind them.',
  knowledgeBody:
    'Bring in your organization’s documents. Ask questions, open citations and trace answers to the document version used. Available with Full.',
  appsTitle: 'Your best workflow. Everyone’s next step.',
  appsBody:
    'Combine instructions, models, knowledge, skills and MCP tools into an application. Share an independent package or a managed service with your team.',
  autoTitle: 'Work that keeps a rhythm.',
  autoBody:
    'Schedule briefings, reviews and recurring checks. Keep each run in the same task, with its history and deliverables.',
  scenesTitle: 'Make it part of\nyour working day.',
  sample: 'Illustrative workflow',
  input: 'Your request',
  materials: 'Working materials',
  report: 'Ready to review',
  source: 'View source',
  policy: 'Procurement policy',
  answer: 'An answer you can trace.',
  sharedApp: 'Team application',
  skill: 'Skill',
  knowledge: 'Knowledge',
  tools: 'Tools',
  people: 'Your team',
  weekly: 'Weekly briefing',
  scheduled: 'Scheduled',
  connectTitle: 'Meet your work\nwhere it already is.',
  connectBody:
    'Connect Google Docs, Gmail, Outlook, OneDrive and SharePoint with your authorization. Extend your workspace through MCP.',
  channelBody:
    'Start tasks in WeChat, Feishu, WeCom, DingTalk and Microsoft Teams. View the full process and files in LinkSense.',
  ownTitle: 'Your infrastructure.\nYour way of working.',
  ownBody:
    'Deploy on your own servers or private cloud. Choose your models and manage who can use each capability.',
  models: 'Choose your model providers',
  governance: 'Users, groups and access controls',
  usage: 'Quotas, usage and redacted audit logs',
  open: 'An open organizational capability layer',
  faqTitle: 'A few useful answers.',
  faq1: 'What is the difference between Core and Full?',
  faq1a:
    'Core includes the AI workspace and organizational capabilities, including ordinary task attachments. Full adds document processing and knowledge retrieval. Both are self-hosted deployment options.',
  faq2: 'Can I use my own models?',
  faq2a:
    'You configure the model providers and compatible endpoints your organization uses. Models, credentials and optional capabilities must be configured before use. Inference and infrastructure can have their own costs.',
  faq3: 'Does self-hosting mean everything stays offline?',
  faq3a:
    'Data flows depend on your configuration. External models, websites, connectors and MCP services may send data outside your infrastructure. Private deployment is not a promise of complete offline isolation.',
  faq4: 'What does the open-source license require?',
  faq4a:
    'LinkSense uses CPAL-1.0 with additional permissions for internal deployment. Graphical deployments retain the attribution notice; exported documents and images do not need a watermark. Read the license for the precise terms.',
  ctaTitle: 'Put your team’s\nideas to work.',
  ctaBody: 'Start with one real task. Build on what works.',
  footer: 'AI work, connected.',
  license: 'License & attribution',
  security: 'Security',
  community: 'Community',
  installTitle: 'Make room for\na new way to work.',
  installBody:
    'Choose a deployment, prepare Docker, and run the installer. Then connect a model and complete your first task.',
  edition: 'Deployment',
  platform: 'Operating system',
  coreBody: 'AI workspace + organizational capabilities.',
  fullBody:
    'Everything in Core, plus document processing and knowledge retrieval.',
  requirements: 'Prepare your environment',
  resourceNote:
    'Documented starting requirements, not a concurrency or speed guarantee.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl and an available TCP port 18081. macOS requires Docker Desktop; memory is what Docker Engine can actually use.',
  copy: 'Copy command',
  copied: 'Copied',
  copyFailed: 'Copy unavailable. Select the command to copy it manually.',
  afterInstall: 'After installation',
  afterInstallBody:
    'Open {{address}} and use the one-time initialization credential printed by the installer to create the first administrator.',
  macNote:
    'Run without sudo on macOS. Allocate extra memory to Docker Desktop; its usable memory must meet the requirement. The localhost address does not imply network access is limited to your Mac.',
  publicNote:
    'For public deployments, configure an HTTPS reverse proxy. Keep credentials private.',
  manage: 'Keep your deployment running',
  upgradeNote:
    'Upgrade creates a PostgreSQL backup before migration. Once migration starts, failures do not automatically roll back the database. Keep independent backups of files and configuration.',
  fullNote:
    'Knowledge retrieval also needs an Embedding model; a Ranker is optional.',
  startTitle: 'One real task.\nA useful first result.',
  startBody:
    'From a fresh deployment to something you can review, download and improve.',
  step1: 'Create your administrator',
  step1body:
    'Open the installed service and complete initialization with the one-time credential. Existing members sign in with the method enabled by their administrator.',
  step2: 'Connect a model',
  step2body:
    'In Settings → Model settings, add a provider channel and a conversation model. Test the connection, save it and keep the model selectable for conversations.',
  step3: 'Give it a clear task',
  step3body:
    'Specify the goal, attach your materials and describe the deliverable. Select available skills, plugins or a knowledge base when needed.',
  step4: 'Review, refine, reuse',
  step4body:
    'Open the generated files, select content to request changes and download the result. Turn a proven workflow into an application for your team.',
  prompt:
    'Read the attached sales data, identify three important changes, and create a summary with an Excel breakdown.',
  nextDocs: 'Continue with the user guides',
  notFound: 'This page is not here.',
  error: 'This page could not be loaded.',
  retry: 'Try again',
}
export type MessageKey = keyof typeof en
export type Messages = Record<MessageKey, string>
const zh: Messages = {
  ...experienceCopy['zh-CN'],
  agentTitle: '用 AI 助手安装',
  agentBody:
    '将这段提示交给你的 AI 编程助手。提示包含当前选择的部署方案、操作系统、环境检查和官方安装说明。',
  agentCopy: '复制安装提示',
  agentPrompt:
    '请在这台 {{platform}} 机器上安装 LinkSense {{edition}}。\n\n先阅读官方安装指南：{{docs}}\n\n检查实际操作系统和架构、Docker Engine API 1.45+、Docker Compose 2.24.4+、Docker 实际可用内存、SSD 空间和 TCP 18081 端口。执行前检查安装脚本，只在以下命令符合当前主机时使用：\n\n{{command}}\n\n如果已经安装 LinkSense，先检查现状并保留全部密钥和数据卷。不要覆盖或重置已有数据。最终回复不要输出任何秘密。\n\n安装后提供访问地址，引导我使用一次性凭据创建管理员并配置模型。密码与 API Key 由我在本地应用中填写，不要要求我发送到聊天中。',
  proofTitle: '为组织每天的工作而设计。',
  languages: '界面语言',
  deployments: '自主部署配置',
  channels: '消息渠道',
  methodsTitle: '让一个好方法，\n不止服务于一次任务。',
  method1: '交代想要的结果。',
  method2: '指出需要修改的细节。',
  method3: '沉淀为可复用的能力。',
  method1body: '说明目标、材料与需要交付的成果。',
  method2body: '在成果中选中具体位置，提出明确修改要求。',
  method3body: '把有效方法组合为同事可以使用的应用。',
  insightsTitle: '从这里，\n开始新的工作。',
  extend: '基于 LinkSense 扩展',
  installGuide: '选择部署方案，了解环境要求，完成安装。',
  startGuide: '接入一个模型，完成第一个真实任务。',
  extendGuide: '打包技能、连接 MCP，创建交互式应用。',
  read: '阅读指南',
  planTitle: '先确认方案，再开始实施。',
  planBody:
    '用计划模式统一范围与步骤，再交给 AI 实施。执行计划、工具与子智能体动态都能查看。',
  goalTitle: '复杂的目标，持续往前推进。',
  goalBody:
    '用目标模式推进多步骤工作，查看进度，按需暂停，并在执行限制内继续完成。',
  spaceTitle: '接着已有的工作，继续做。',
  spaceBody:
    '按项目整理任务，沿用工作文件。个人任务共享用户运行环境，不把任务目录当作安全隔离边界。',
  createTitle: '表达与交付，不止一种方式。',
  createBody:
    '语音转为可编辑草稿，用已配置的模型生成图片，或把 HTML 成果发布为公开静态站点。',
  home: '首页',
  product: '产品能力',
  install: '部署安装',
  start: '快速上手',
  docs: '使用文档',
  try: '在线体验',
  menu: '菜单',
  close: '关闭',
  language: '语言',
  skip: '跳到正文',
  category: '为组织而生的 AI 工作平台',
  hero1: '好想法，',
  hero2: '一起做成。',
  heroBody:
    '与 AI 一起完成工作，留下有效的方法，让知识、技能和工具成为整个团队的能力。',
  watch: '看看 LinkSense 如何工作',
  play: '播放产品演示',
  pause: '暂停产品演示',
  introTitle: '让好的工作方式，\n走得更远。',
  introBody:
    '给每个人一个与 AI 共事的工作空间，也给组织一种方式，留住有用的知识、方法和工具。',
  workTitle: '从一句要求，到一份成果。',
  workBody:
    '研究一个主题、分析一张表格、制作一套演示。直接预览 Word、Excel、PPT 和 HTML，选中细节，继续提出修改要求。',
  knowledgeTitle: '每个答案，都有据可循。',
  knowledgeBody:
    '接入组织文档，用知识库回答问题。打开引用，查看内容依据与当时使用的文档版本。完整知识能力由 Full 提供。',
  appsTitle: '你的好方法，团队的新能力。',
  appsBody:
    '把指令、模型、知识、技能和 MCP 工具组合成应用。分享独立安装包，或由你持续维护应用服务，让同事直接开始工作。',
  autoTitle: '让重复工作，有自己的节奏。',
  autoBody:
    '为简报、回顾和定期检查设置自动化。每次执行都保留在同一任务中，过程和成果随时可查。',
  scenesTitle: '让 AI，\n进入真实的工作。',
  sample: '示例工作流',
  input: '你的工作要求',
  materials: '工作材料',
  report: '等待审阅的成果',
  source: '查看引用来源',
  policy: '采购管理制度',
  answer: '答案有依据，判断有来处。',
  sharedApp: '团队应用',
  skill: '技能',
  knowledge: '知识',
  tools: '工具',
  people: '你的团队',
  weekly: '每周工作简报',
  scheduled: '已安排执行',
  connectTitle: '连接你已经\n在使用的工作系统。',
  connectBody:
    '授权连接 Google Docs、Gmail、Outlook、OneDrive 和 SharePoint，也可以通过 MCP 接入更多组织系统。',
  channelBody:
    '从微信、飞书、企业微信、钉钉和 Microsoft Teams 发起任务，回到 LinkSense 查看完整过程与文件。',
  ownTitle: '你的基础设施，\n你的工作方式。',
  ownBody:
    '部署在自己的服务器或私有云中。自由选择模型，统一管理谁能使用哪些能力。',
  models: '自由配置模型与服务商',
  governance: '用户、用户组与访问控制',
  usage: '额度、用量与脱敏审计',
  open: '开源的组织能力层',
  faqTitle: '你可能想先了解。',
  faq1: 'Core 和 Full 有什么区别？',
  faq1a:
    'Core 包含 AI 工作空间和组织能力，也能处理普通任务附件。Full 在此基础上增加完整文档处理与知识检索。两者都是自主部署方案。',
  faq2: '可以使用自己的模型吗？',
  faq2a:
    '可以配置组织选择的模型服务商或兼容服务端点。使用前需要配置模型、凭据及所需能力；模型推理与基础设施可能产生相应费用。',
  faq3: '自主部署意味着完全离线吗？',
  faq3a:
    '数据流向取决于配置。外部模型、网页、连接器和 MCP 服务可能向外传输数据。私有部署并不等于完全离线隔离。',
  faq4: '开源许可有哪些要求？',
  faq4a:
    'LinkSense 采用 CPAL-1.0，并为内部部署提供额外授权。图形界面保留署名，导出的文档和图片无需水印。具体范围请阅读许可正文。',
  ctaTitle: '让团队的想法，\n真正开始工作。',
  ctaBody: '从一个真实任务开始，把有效的方法留下来。',
  footer: '连接 AI 与组织的工作。',
  license: '许可与署名',
  security: '安全说明',
  community: '社区讨论',
  installTitle: '给新的工作方式，\n留一个位置。',
  installBody:
    '选择部署方案，准备 Docker，运行安装命令。然后接入模型，完成你的第一个任务。',
  edition: '部署方案',
  platform: '操作系统',
  coreBody: 'AI 工作空间与组织能力平台。',
  fullBody: 'Core 全部能力，加上文档处理与知识检索。',
  requirements: '准备运行环境',
  resourceNote: '文档给出的起步配置，不代表并发容量或处理速度承诺。',
  dockerNote:
    '需要 Docker Engine API 1.45+、Compose 2.24.4+、curl，以及可用的 TCP 18081 端口。macOS 需要 Docker Desktop；内存以 Docker Engine 实际可用值为准。',
  copy: '复制安装命令',
  copied: '已复制',
  copyFailed: '无法自动复制，请选中命令手动复制。',
  afterInstall: '安装完成后',
  afterInstallBody:
    '打开 {{address}}，使用安装器输出的一次性初始化凭据，创建首位管理员。',
  macNote:
    'macOS 请勿使用 sudo。Docker Desktop 需分配额外内存，以满足实际可用要求。使用 localhost 访问不代表服务仅限本机访问。',
  publicNote: '公开部署请配置 HTTPS 反向代理，并妥善保管凭据。',
  manage: '让部署持续运行',
  upgradeNote:
    '升级会在迁移前创建 PostgreSQL 备份。迁移开始后发生失败，不会自动回滚数据库。工作文件与配置仍应独立备份。',
  fullNote: '使用知识检索还需配置 Embedding 模型，可选配置 Ranker。',
  startTitle: '一个真实任务，\n一份有用的成果。',
  startBody: '从首次安装，到拿到可以审阅、下载和继续修改的结果。',
  step1: '创建管理员',
  step1body:
    '打开部署地址，用一次性初始化凭据完成向导。已有组织成员使用管理员启用的方式登录。',
  step2: '连接一个模型',
  step2body:
    '进入「设置 → 模型设置」，添加服务商渠道和对话模型。测试连接并保存，保持模型「对话可选」。',
  step3: '交代一项明确的工作',
  step3body:
    '写清目标，添加工作材料，说明希望交付什么。按需选择已配置的技能、插件或知识库。',
  step4: '审阅、完善，再复用',
  step4body:
    '预览成果，选中内容提出修改要求，下载最终文件。把验证有效的流程组合为团队应用。',
  prompt:
    '阅读附件中的销售数据，找出三个最重要的变化，生成一份中文摘要和 Excel 明细。',
  nextDocs: '继续阅读用户指南',
  notFound: '这个页面还不在这里。',
  error: '页面暂时无法加载。',
  retry: '重试',
}

export const messages = {
  'en-US': en,
  'zh-CN': zh,
  'es-ES': es,
  'pt-BR': pt,
  'fr-FR': fr,
  'ja-JP': ja,
} satisfies Record<Locale, Messages>
