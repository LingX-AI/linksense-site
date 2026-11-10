import { defineI18n } from 'fumadocs-core/i18n'
import { messages, type Locale, type MessageKey } from '@/content/messages'
import { docsUrl } from './product'

export const homeLocales = {
  en: 'en-US',
  zh: 'zh-CN',
  es: 'es-ES',
  pt: 'pt-BR',
  fr: 'fr-FR',
  ja: 'ja-JP',
} satisfies Record<string, Locale>

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: Object.keys(homeLocales),
})

export const docsI18n = defineI18n({
  defaultLanguage: 'en',
  languages: Object.keys(homeLocales),
  parser: 'dir',
})

export function getMessages(lang: string) {
  return messages[homeLocales[lang as keyof typeof homeLocales] ?? 'en-US']
}

export function formatMessage(
  lang: string,
  key: MessageKey,
  values: Record<string, string>,
) {
  return getMessages(lang)[key].replace(
    /{{(\w+)}}/g,
    (placeholder, name: string) => values[name] ?? placeholder,
  )
}

export function homePath(lang: string) {
  return lang === 'en' ? '/' : `/${lang}/`
}

export function installPath(lang: string) {
  return lang === 'en' ? '/install/' : `/${lang}/install/`
}

export function docsPath(lang: string, path = '') {
  return docsUrl(homeLocales[lang as keyof typeof homeLocales], path)
}

export function resolveDocRoute(slug: string[] = []) {
  const locale = Object.entries(homeLocales).find(
    ([, code]) => code === slug[0],
  )
  if (locale) return { lang: locale[0], slugs: slug.slice(1) }
  return { lang: 'en', slugs: slug }
}

export function withoutDocLocale(path: string) {
  const separator = path.indexOf('/')
  return separator !== -1 &&
    Object.hasOwn(homeLocales, path.slice(0, separator))
    ? path.slice(separator + 1)
    : path
}
