import Link from 'next/link'
import { Github } from 'lucide-react'
import { docsPath, getMessages } from '@/lib/i18n'
import { repository } from '@/lib/product'

export function Footer({ lang }: { lang: string }) {
  const t = getMessages(lang)
  const sections = [
    {
      title: t.docs,
      links: [
        { label: t.docs, href: docsPath(lang) },
        {
          label: lang === 'zh' ? '用户指南' : 'User guide',
          href: docsPath(lang, 'user-guide/overview/'),
        },
        {
          label: lang === 'zh' ? '管理员指南' : 'Administrator guide',
          href: docsPath(lang, 'admin-guide/overview/'),
        },
        {
          label: lang === 'zh' ? '开发者指南' : 'Developer guide',
          href: docsPath(lang, 'developer-guide/interactive-application/'),
        },
      ],
    },
    {
      title: t.install,
      links: [
        { label: 'Core', href: docsPath(lang, 'deploy/core/') },
        { label: 'Full', href: docsPath(lang, 'deploy/full/') },
        { label: t.manage, href: docsPath(lang, 'deploy/operations/') },
      ],
    },
    {
      title: t.community,
      links: [
        { label: 'GitHub', href: repository },
        { label: t.community, href: `${repository}/discussions` },
        {
          label: t.license,
          href: `${repository}/blob/main/LICENSE-EXCEPTIONS.md`,
        },
        {
          label: t.security,
          href: `${repository}/blob/main/.github/SECURITY.md`,
        },
      ],
    },
  ]
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6 py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pb-10 md:grid-cols-3 lg:gap-x-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-fd-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-fd-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fd-muted-foreground">© 2026 LinkSense</p>
          <div className="flex items-center gap-4">
            <a
              href="/llms.txt"
              className="text-xs text-fd-muted-foreground hover:text-fd-foreground"
            >
              llms.txt
            </a>
            <a
              href={repository}
              aria-label="GitHub"
              className="text-fd-muted-foreground hover:text-fd-foreground"
            >
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
