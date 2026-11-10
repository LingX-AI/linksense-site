import { docs } from '@/.source'
import { loader } from 'fumadocs-core/source'
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons'
import { docsI18n, docsPath } from './i18n'

export function createSource(languages = docsI18n.languages) {
  return loader({
    baseUrl: '/doc',
    i18n: { ...docsI18n, languages },
    url: (slugs, lang) =>
      docsPath(lang ?? 'en', slugs.length ? `${slugs.join('/')}/` : ''),
    source: docs.toFumadocsSource(),
    plugins: [lucideIconsPlugin()],
  })
}

export const source = createSource()
