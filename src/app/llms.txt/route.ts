import { flattenTree } from 'fumadocs-core/page-tree'
import { source } from '@/lib/source'
import { withoutDocLocale } from '@/lib/i18n'
import { siteUrl } from '@/lib/metadata'

export const dynamic = 'force-static'

export function GET() {
  const sections = source.getLanguages().map(({ language, pages }) => {
    const entries = flattenTree(source.getPageTree(language).children).map(
      (item) => {
        const page = pages.find((page) => page.url === item.url)
        if (!page) throw new Error(`Missing documentation page: ${item.url}`)
        const path = withoutDocLocale(page.path).replace(/\.mdx$/, '.txt')
        const url = new URL(`/markdown/${language}/${path}`, siteUrl).href
        return `- [${page.data.title}](${url}): ${page.data.description ?? ''}`
      },
    )
    return [
      `## ${language === 'zh' ? '简体中文' : 'English'}`,
      '',
      ...entries,
    ].join('\n')
  })

  return new Response(
    [
      '# LinkSense',
      '',
      '> An open-source agentic work platform for organizations, deployed on your own infrastructure.',
      '',
      'This index links to the plain Markdown versions of the public documentation. Choose English or Simplified Chinese and follow the relevant topic.',
      '',
      'Core includes the agent workspace and organizational capabilities. Full adds built-in Knowledge parsing, indexing, and retrieval. Deployment prerequisites, model configuration, and execution boundaries are described in the guides.',
      '',
      sections.join('\n\n'),
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}
