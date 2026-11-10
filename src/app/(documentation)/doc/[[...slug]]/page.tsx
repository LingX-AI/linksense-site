import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { source } from '@/lib/source'
import {
  docsI18n,
  docsPath,
  homeLocales,
  resolveDocRoute,
  withoutDocLocale,
} from '@/lib/i18n'
import { getDocsUI } from '@/content/docs-ui'
import { pageMetadata } from '@/lib/metadata'
import { getMDXComponents } from '@/mdx-components'
import { PageActions } from '@/components/page-actions'

export const dynamicParams = false

export function generateStaticParams() {
  return docsI18n.languages.flatMap((lang) =>
    source
      .getPages(lang)
      .flatMap((page) =>
        lang === 'en'
          ? [{ slug: page.slugs }, { slug: ['en-US', ...page.slugs] }]
          : [
              {
                slug: [
                  homeLocales[lang as keyof typeof homeLocales],
                  ...page.slugs,
                ],
              },
            ],
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
      {lang !== 'en' && lang !== 'zh' && (
        <p className="mb-4 text-sm text-fd-muted-foreground">
          {getDocsUI(lang).translationNotice}{' '}
          <Link
            href={docsPath('en', slugs.length ? `${slugs.join('/')}/` : '')}
            className="underline underline-offset-4"
          >
            {getDocsUI(lang).englishOriginal}
          </Link>
        </p>
      )}
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
