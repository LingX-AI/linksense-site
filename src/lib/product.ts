import { z } from 'zod'
import { locales } from '@/content/messages'

export const repository = 'https://github.com/LingX-AI/linksense'
export const demoUrl = 'https://explore.linksense.org/'
export const agentInstallUrl =
  'https://raw.githubusercontent.com/LingX-AI/linksense/main/Install.md'

export function docsUrl(language: string | undefined, path = '') {
  const locale = locales.find((item) => item === language)
  return `/doc/${locale && locale !== 'en-US' ? `${locale}/` : ''}${path}`
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

export function manualInstallCommand(edition: Edition, platform: Platform) {
  const script = `install-${edition}.sh`
  const execute =
    platform === 'linux'
      ? `sudo --preserve-env=http_proxy,https_proxy,HTTP_PROXY,HTTPS_PROXY,ALL_PROXY,all_proxy,NO_PROXY,no_proxy sh ${script}`
      : `sh ${script}`

  return `curl --http1.1 --retry 3 --retry-delay 2 --connect-timeout 15 --max-time 300 -fsSL \\
  -o ${script} https://raw.githubusercontent.com/LingX-AI/linksense/main/${script} &&
${execute}`
}
