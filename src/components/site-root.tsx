import type { ReactNode } from 'react'
import { defineI18nUI } from 'fumadocs-ui/i18n'
import { docsI18n, homeLocales, i18n } from '@/lib/i18n'
import { languageNames } from '@/content/messages'
import { getDocsUI } from '@/content/docs-ui'
import { Provider } from './provider'
import '@/app/global.css'

const translations = {
  ...Object.fromEntries(
    Object.entries(homeLocales).map(([lang, locale]) => [
      lang,
      { displayName: languageNames[locale], ...getDocsUI(lang) },
    ]),
  ),
}

const homeUI = defineI18nUI(i18n, { translations })
const docsUI = defineI18nUI(docsI18n, { translations })

export function SiteRoot({
  lang,
  docs = false,
  children,
}: {
  lang: string
  docs?: boolean
  children: ReactNode
}) {
  return (
    <html
      lang={homeLocales[lang as keyof typeof homeLocales] ?? 'en-US'}
      suppressHydrationWarning
    >
      <head>
        <link rel="describedby" type="text/plain" href="/llms.txt" />
      </head>
      <body>
        <Provider i18n={(docs ? docsUI : homeUI).provider(lang)}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
