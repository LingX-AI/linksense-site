import { flattenTree } from 'fumadocs-core/page-tree'
import { source } from '@/lib/source'
import { homeLocales, withoutDocLocale } from '@/lib/i18n'
import { languageNames } from '@/content/messages'
import { siteUrl } from '@/lib/metadata'

export const dynamic = 'force-static'

export function GET() {
  const sections = source.getLanguages().map(({ language, pages }) => {
    const home = pages.find((page) => page.slugs.length === 0)
    if (!home) throw new Error(`Missing documentation home: ${language}`)
    const entries = [
      home,
      ...flattenTree(source.getPageTree(language).children).map((item) => {
        const page = pages.find((page) => page.url === item.url)
        if (!page) throw new Error(`Missing documentation page: ${item.url}`)
        return page
      }),
    ].map((page) => {
      const path = withoutDocLocale(page.path).replace(/\.mdx$/, '.txt')
      const url = new URL(`/markdown/${language}/${path}`, siteUrl).href
      return `- [${page.data.title}](${url}): ${page.data.description ?? ''}`
    })
    return [
      `## ${languageNames[homeLocales[language as keyof typeof homeLocales]]}`,
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
      'This index links to the plain Markdown versions of the public documentation. Choose a language and follow the relevant topic.',
      '',
      'Core includes the agent workspace and organizational capabilities. Full adds built-in Knowledge parsing, indexing, and retrieval. Deployment prerequisites, model configuration, and execution boundaries are described in the guides.',
      '',
      sections.join('\n\n'),
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  )
}
