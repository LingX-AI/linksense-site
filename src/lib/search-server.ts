import { createFromSource } from 'fumadocs-core/search/server'
import { searchOptions } from './search-i18n'
import { createSource } from './source'

export function createSearch(languages: string[]) {
  return createFromSource(createSource(languages), {
    localeMap: Object.fromEntries(
      languages.map((locale) => [
        locale,
        {
          ...searchOptions(locale),
          ...(locale === 'zh' || locale === 'ja'
            ? { search: { threshold: 0, tolerance: 0 } }
            : {}),
        },
      ]),
    ),
  })
}
