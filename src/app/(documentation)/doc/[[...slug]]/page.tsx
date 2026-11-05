import { notFound } from 'next/navigation'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { source } from '@/lib/source'
import { resolveDocRoute, withoutDocLocale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'
import { getMDXComponents } from '@/mdx-components'
import { PageActions } from '@/components/page-actions'

export const dynamicParams = false

export function generateStaticParams() {
  return ['en', 'zh'].flatMap((lang) =>
    source
      .getPages(lang)
      .flatMap((page) =>
        lang === 'zh'
          ? [{ slug: ['zh-CN', ...page.slugs] }]
          : [{ slug: page.slugs }, { slug: ['en-US', ...page.slugs] }],
      ),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { lang, slugs } = resolveDocRoute((await params).slug)
  const page = source.getPage(slugs, lang)
  if (!page) notFound()
  return pageMetadata(
    lang,
    `${page.data.title} | LinkSense`,
    page.data.description ?? '',
    page.url,
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { lang, slugs } = resolveDocRoute((await params).slug)
  const page = source.getPage(slugs, lang)
  if (!page) notFound()
  const MDX = page.data.body
  const path = withoutDocLocale(page.path).replace(/\.mdx$/, '.txt')
  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk', enabled: !page.data.full }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-2">
        {page.data.description}
      </DocsDescription>
      <PageActions lang={lang} markdownUrl={`/markdown/${lang}/${path}`} />
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, {
              ...page,
              // Fumadocs resolves relative files inside each locale's store.
              path: withoutDocLocale(page.path),
            }) as MDXComponents['a'],
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}
