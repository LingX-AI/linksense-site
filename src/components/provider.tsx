'use client'

import { RootProvider } from 'fumadocs-ui/provider/next'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { docsPath, homePath, installPath, resolveDocRoute } from '@/lib/i18n'

const SearchDialog = dynamic(() => import('./search-dialog'), { ssr: false })

export function Provider({
  children,
  i18n,
}: {
  children: ReactNode
  i18n: Parameters<typeof RootProvider>[0]['i18n']
  lang?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <RootProvider
      i18n={
        i18n && {
          ...i18n,
          onLocaleChange(locale) {
            if (pathname.startsWith('/doc')) {
              const { slugs } = resolveDocRoute(
                pathname.split('/').filter(Boolean).slice(1),
              )
              router.push(
                docsPath(locale, slugs.length ? `${slugs.join('/')}/` : ''),
              )
            } else {
              router.push(
                pathname.endsWith('/install/') || pathname.endsWith('/install')
                  ? `${installPath(locale)}${window.location.search}`
                  : homePath(locale),
              )
            }
          },
        }
      }
      search={{ SearchDialog }}
      theme={{
        defaultTheme: 'system',
        enableSystem: true,
        enableColorScheme: true,
      }}
    >
      {children}
    </RootProvider>
  )
}
