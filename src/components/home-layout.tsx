import type { ReactNode } from 'react'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar'
import Image from 'next/image'
import {
  BookOpen,
  Code,
  Download,
  ExternalLink,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
import { baseOptions, linkItems } from '@/lib/layout.shared'
import { docsPath, getMessages, installPath } from '@/lib/i18n'
import { repository } from '@/lib/product'
import { getDocsUI } from '@/content/docs-ui'
import { Footer } from './footer'

export function WebsiteLayout({
  lang,
  children,
}: {
  lang: string
  children: ReactNode
}) {
  const t = getMessages(lang)
  const docs = getDocsUI(lang)
  const items = [
    {
      text: docs.gettingStarted,
      desc: t.installBody,
      url: docsPath(lang),
      Icon: Rocket,
    },
    {
      text: t.install,
      desc: t.coreBody,
      url: installPath(lang),
      Icon: Download,
    },
    {
      text: docs.userGuide,
      desc: t.heroBody,
      url: docsPath(lang, 'user-guide/overview/'),
      Icon: BookOpen,
    },
    {
      text: docs.adminGuide,
      desc: t.governance,
      url: docsPath(lang, 'admin-guide/overview/'),
      Icon: ShieldCheck,
    },
    {
      text: docs.developerGuide,
      desc: t.open,
      url: docsPath(lang, 'developer-guide/interactive-application/'),
      Icon: Code,
    },
  ]
  return (
    <div className="flex min-h-screen flex-col">
      <HomeLayout
        {...baseOptions(lang)}
        links={[
          {
            type: 'menu',
            on: 'menu',
            text: t.docs,
            items: items.map(({ text, url, Icon }) => ({
              text,
              url,
              icon: <Icon />,
            })),
          },
          {
            type: 'custom',
            on: 'nav',
            children: (
              <NavbarMenu>
                <NavbarMenuTrigger>{t.docs}</NavbarMenuTrigger>
                <NavbarMenuContent className="text-[15px]">
                  <NavbarMenuLink href={items[0].url} className="md:row-span-2">
                    <div className="-mx-3 -mt-3">
                      <Image
                        src="/media/product-poster.jpg"
                        width={1440}
                        height={900}
                        alt="LinkSense workspace"
                        className="rounded-t-lg object-cover"
                        loading="lazy"
                        style={{
                          maskImage:
                            'linear-gradient(to bottom,white 60%,transparent)',
                        }}
                      />
                    </div>
                    <p className="font-medium">{items[0].text}</p>
                    <p className="text-sm text-fd-muted-foreground">
                      {items[0].desc}
                    </p>
                  </NavbarMenuLink>
                  {items.slice(1).map(({ text, desc, url, Icon }, index) => (
                    <NavbarMenuLink
                      href={url}
                      key={url}
                      className={
                        [
                          'lg:col-start-2 lg:row-start-1',
                          'lg:col-start-2 lg:row-start-2',
                          'lg:col-start-3 lg:row-start-1',
                          'lg:col-start-3 lg:row-start-2',
                        ][index]
                      }
                    >
                      <Icon className="mb-2 rounded-md bg-fd-primary p-1 text-fd-primary-foreground" />
                      <p className="font-medium">{text}</p>
                      <p className="text-sm text-fd-muted-foreground">{desc}</p>
                    </NavbarMenuLink>
                  ))}
                </NavbarMenuContent>
              </NavbarMenu>
            ),
          },
          {
            text: (
              <>
                {t.community}
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5! shrink-0"
                />
              </>
            ),
            url: `${repository}/discussions`,
            external: true,
          },
          ...linkItems,
        ]}
        className="flex-1 dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)]"
      >
        {children}
      </HomeLayout>
      <Footer lang={lang} />
    </div>
  )
}
