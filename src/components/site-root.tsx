import type { ReactNode } from 'react'
import { defineI18nUI } from 'fumadocs-ui/i18n'
import { docsI18n, homeLocales, i18n } from '@/lib/i18n'
import { languageNames } from '@/content/messages'
import { Provider } from './provider'
import '@/app/global.css'

const translations = {
  ...Object.fromEntries(
    Object.entries(homeLocales).map(([lang, locale]) => [
      lang,
      { displayName: languageNames[locale] },
    ]),
  ),
  zh: {
    displayName: '简体中文',
    search: '搜索文档',
    searchNoResult: '没有结果',
    toc: '目录',
    lastUpdate: '最后更新于',
    chooseTheme: '选择主题',
    chooseLanguage: '选择语言',
    nextPage: '下一页',
    previousPage: '上一页',
    tocNoHeadings: '目录为空',
  },
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
