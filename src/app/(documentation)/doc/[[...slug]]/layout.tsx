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
        tabMode="auto"
        tree={source.pageTree[lang]}
        links={linkItems}
        sidebar={{
          defaultOpenLevel: 0,
          tabs: {
            transform(option, node) {
              if (!node.icon) return option
              return {
                ...option,
                icon: (
                  <div className="size-full rounded-lg max-md:border max-md:border-fd-primary/20 max-md:bg-fd-primary/10 max-md:p-1.5 [&_svg]:size-full">
                    {node.icon}
                  </div>
                ),
              }
            },
          },
        }}
      >
        {children}
        <Footer lang={lang} />
      </DocsLayout>
    </SiteRoot>
  )
}
