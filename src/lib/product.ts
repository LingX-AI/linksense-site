export const repository = 'https://github.com/LingX-AI/linksense'
export const demoUrl = 'https://explore.linksense.org/'
export const docsUrl = `${repository}/tree/main/apps/docs/docs`
export type Edition = 'core' | 'full'
export type Platform = 'linux' | 'macos'
export const installSearchSchema = z.object({
  edition: z.enum(['core', 'full']).catch('core').optional(),
  platform: z.enum(['linux', 'macos']).catch('linux').optional(),
})

export function installCommand(edition: Edition, platform: Platform): string {
  return `curl -fsSL https://raw.githubusercontent.com/LingX-AI/linksense/main/install-${edition}.sh | ${platform === 'linux' ? 'sudo ' : ''}sh`
}
import { z } from 'zod'
