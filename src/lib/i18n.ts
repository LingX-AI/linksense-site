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
  languages: ['en', 'zh'],
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
  return docsUrl(lang === 'zh' ? 'zh-CN' : 'en-US', path)
}

export function resolveDocRoute(slug: string[] = []) {
  if (slug[0] === 'zh-CN') return { lang: 'zh', slugs: slug.slice(1) }
  if (slug[0] === 'en-US') return { lang: 'en', slugs: slug.slice(1) }
  return { lang: 'en', slugs: slug }
}

export function withoutDocLocale(path: string) {
  return path.replace(/^(zh|en)\//, '')
}
