import type { Metadata } from 'next'
import { getMessages, homePath } from './i18n'

// Origin validation is retained from the upstream metadata module.
export function resolveSiteUrl(value = 'https://linksense.org'): URL {
  const url = new URL(value)
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error(
      'SITE_URL must be an absolute HTTP(S) origin without a path',
    )
  }
  return url
}

export const siteUrl = resolveSiteUrl(process.env.SITE_URL || undefined)

export function pageMetadata(
  lang: string,
  title: string,
  description: string,
  path = homePath(lang),
): Metadata {
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: { canonical: path },
    icons: { icon: '/favicon.svg' },
    openGraph: {
      title,
      description,
      siteName: 'LinkSense',
      url: path,
      type: 'website',
      images: ['/media/product-poster.jpg'],
    },
  }
}

export function homeMetadata(lang: string) {
  const t = getMessages(lang)
  return pageMetadata(lang, `LinkSense — ${t.category}`, t.heroBody)
}
