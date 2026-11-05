import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { SiteRoot } from '@/components/site-root'
import { Footer } from '@/components/footer'
import { source } from '@/lib/source'
import { baseOptions, linkItems } from '@/lib/layout.shared'
import { resolveDocRoute } from '@/lib/i18n'

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug?: string[] }>
}) {
  const { lang } = resolveDocRoute((await params).slug)
  return (
    <SiteRoot lang={lang} docs>
      <DocsLayout
        {...baseOptions(lang, true)}
        tree={source.pageTree[lang]}
        links={linkItems}
        sidebar={{
          defaultOpenLevel: 0,
          tabs: false,
        }}
      >
        {children}
        <Footer lang={lang} />
      </DocsLayout>
    </SiteRoot>
  )
}
