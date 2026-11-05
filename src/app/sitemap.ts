import type { MetadataRoute } from 'next'
import { source } from '@/lib/source'
import { i18n, homePath, installPath } from '@/lib/i18n'
import { siteUrl } from '@/lib/metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/install/',
    ...i18n.languages.flatMap((lang) => [homePath(lang), installPath(lang)]),
    ...['zh', 'en'].flatMap((lang) =>
      source.getPages(lang).map((page) => page.url),
    ),
  ]
  return [...new Set(paths)].map((path) => ({
    url: new URL(path, siteUrl).href,
  }))
}
