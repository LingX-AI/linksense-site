import { notFound } from 'next/navigation'
import { source } from '@/lib/source'
import { docsI18n, withoutDocLocale } from '@/lib/i18n'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return docsI18n.languages.flatMap((lang) =>
    source.getPages(lang).map((page) => ({
      lang,
      slug: withoutDocLocale(page.path)
        .replace(/\.mdx$/, '.txt')
        .split('/'),
    })),
  )
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug: string[] }> },
) {
  const { lang, slug } = await params
  if (!docsI18n.languages.includes(lang) || !slug.at(-1)?.endsWith('.txt'))
    notFound()
  const slugs = slug
    .join('/')
    .replace(/\.txt$/, '')
    .split('/')
  if (slugs.at(-1) === 'index') slugs.pop()
  const page = source.getPage(slugs, lang)
  if (!page) notFound()
  return new Response(
    `# ${page.data.title}\n\n${await page.data.getText('processed')}`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  )
}
