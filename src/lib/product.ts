import { z } from 'zod'

export const repository = 'https://github.com/LingX-AI/linksense'
export const demoUrl = 'https://explore.linksense.org/'
export const agentInstallUrl =
  'https://raw.githubusercontent.com/LingX-AI/linksense/main/Install.md'

export function docsUrl(language: string | undefined, path = '') {
  return `/doc/${language === 'zh-CN' ? 'zh-CN/' : ''}${path}`
}

export type Edition = 'core' | 'full'
export type Platform = 'linux' | 'macos'
export const installSearchSchema = z.object({
  edition: z.enum(['core', 'full']).catch('core').optional(),
  platform: z.enum(['linux', 'macos']).catch('linux').optional(),
})

export function installGuideUrl(
  language: string | undefined,
  edition: Edition,
  platform: Platform,
) {
  return docsUrl(language, `deploy/${edition}/#${platform}`)
}
