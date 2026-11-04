import { es, pt, fr, ja } from './other-locales'

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
  agentTitle: 'Agent install',
  agentBody:
    'Give this prompt to your coding agent. It includes your selected deployment and platform, environment checks and the official installation instructions.',
  agentCopy: 'Copy agent prompt',
  agentPrompt:
    'Install LinkSense {{edition}} on this {{platform}} machine following {{docs}}. Verify the host before running the installer. Preserve existing data and credentials. Report the access URL and guide me through first-time setup without printing secrets.',
  installGuide: 'Open installation guide',
  home: 'Home',
  install: 'Self-host',
  docs: 'Documentation',
  try: 'Explore LinkSense',
  menu: 'Menu',
  close: 'Close',
  language: 'Language',
  skip: 'Skip to content',
  category: 'An AI workspace for your organization',
  hero1: 'From one person’s idea.',
  hero2: 'To a whole team’s capability.',
  heroBody:
    'Work with AI. Keep what works. Give your team the knowledge, skills and tools to do it again.',
  heroNote: 'Open source. On your infrastructure.',
  watch: 'See LinkSense at work',
  play: 'Play product demo',
  pause: 'Pause product demo',
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
  notFound: 'This page is not here.',
  error: 'This page could not be loaded.',
  retry: 'Try again',
}
export type MessageKey = keyof typeof en
export type Messages = Record<MessageKey, string>
const zh: Messages = {
  agentTitle: '用 AI 助手安装',
  agentBody:
    '将这段提示交给你的 AI 编程助手。提示包含当前选择的部署方案、操作系统、环境检查和官方安装说明。',
  agentCopy: '复制安装提示',
  agentPrompt:
    '请按 {{docs}} 在这台 {{platform}} 机器上安装 LinkSense {{edition}}。执行前检查主机环境，保留已有数据和凭据。安装后提供访问地址，引导我完成首次配置，不要在回复中输出秘密。',
  installGuide: '查看安装指南',
  home: '首页',
  install: '部署安装',
  docs: '使用文档',
  try: '在线体验',
  menu: '菜单',
  close: '关闭',
  language: '语言',
  skip: '跳到正文',
  category: '为组织而生的 AI 工作平台',
  hero1: '从一个人的想法，',
  hero2: '到整个团队的能力。',
  heroBody:
    '与 AI 一起完成工作，留下有效的方法，让知识、技能和工具成为整个团队的能力。',
  heroNote: '开源，在你的基础设施上运行。',
  watch: '看看 LinkSense 如何工作',
  play: '播放产品演示',
  pause: '暂停产品演示',
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
