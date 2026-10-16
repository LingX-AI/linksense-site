import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  locales,
  messages,
  defaultLocale,
  type Locale,
} from '@/content/messages'

export function isLocale(value: string | null): value is Locale {
  return locales.some((locale) => locale === value)
}
let initial: Locale = defaultLocale
try {
  const saved = localStorage.getItem('linksense-site.language')
  if (isLocale(saved)) initial = saved
} catch {
  /* Language switching also works without storage. */
}
void i18n.use(initReactI18next).init({
  resources: Object.fromEntries(
    locales.map((locale) => [locale, { translation: messages[locale] }]),
  ),
  lng: initial,
  fallbackLng: defaultLocale,
  supportedLngs: locales,
  interpolation: { escapeValue: false },
  returnNull: false,
})
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
  try {
    localStorage.setItem('linksense-site.language', language)
  } catch {
    /* Storage is optional. */
  }
})
document.documentElement.lang = initial
export default i18n
