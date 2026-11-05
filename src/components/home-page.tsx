import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Clock,
  Github,
  Layers3,
  Puzzle,
  ShieldCheck,
} from 'lucide-react'
import { Hero } from './hero'
import { HomeMotion } from './home-motion'
import { ProductReel } from './product-reel'
import { docsPath, getMessages, installPath } from '@/lib/i18n'
import { demoUrl, repository } from '@/lib/product'
import type { MessageKey } from '@/content/messages'

const topics = [
  { title: 'install', body: 'coreBody', path: 'deploy/', Icon: Boxes },
  {
    title: 'tools',
    body: 'connectBody',
    path: 'user-guide/mcp/connect-and-manage/',
    Icon: Puzzle,
  },
  {
    title: 'knowledge',
    body: 'fullNote',
    path: 'user-guide/knowledge-bases/create-and-manage/',
    Icon: BookOpen,
  },
  {
    title: 'governance',
    body: 'ownBody',
    path: 'admin-guide/overview/',
    Icon: ShieldCheck,
  },
  {
    title: 'sharedApp',
    body: 'open',
    path: 'developer-guide/interactive-application/',
    Icon: Layers3,
  },
  {
    title: 'scheduled',
    body: 'ctaBody',
    path: 'user-guide/automations/create-and-manage/',
    Icon: Clock,
  },
] as const satisfies readonly {
  title: MessageKey
  body: MessageKey
  path: string
  Icon: typeof Boxes
}[]

export function HomePage({ lang }: { lang: string }) {
  const t = getMessages(lang)
  return (
    <HomeMotion lang={lang}>
      <section
        aria-labelledby="home-title"
        className="relative mx-auto flex min-h-[clamp(600px,70vh,900px)] w-full max-w-[1400px] overflow-hidden rounded-2xl border bg-origin-border text-landing-foreground"
      >
        <Hero>
          <p
            data-reveal-item
            className="w-fit rounded-full border border-brand/50 p-2 text-xs font-medium text-brand"
          >
            {t.category}
          </p>
          <h1
            id="home-title"
            className="leading-tighter my-8 text-4xl font-medium text-balance xl:mb-6 xl:text-5xl"
          >
            {t.hero1}
            <br />
            <span className="text-brand">{t.hero2}</span>
          </h1>
          <p
            data-reveal-copy
            className="mb-7 max-w-2xl text-base leading-7 text-landing-foreground"
          >
            {t.heroBody}
          </p>
          <div
            data-reveal-item
            className="flex w-fit flex-row flex-wrap items-center justify-center gap-4"
          >
            <a
              href={demoUrl}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-medium tracking-tight text-brand-foreground transition-colors hover:bg-brand-200 max-sm:text-sm"
            >
              {t.try}
              <ArrowRight className="size-4" />
            </a>
            <Link
              href={installPath(lang)}
              className="inline-flex items-center justify-center gap-2 rounded-full border bg-fd-secondary px-5 py-3 font-medium tracking-tight text-fd-secondary-foreground transition-colors hover:bg-fd-accent max-sm:text-sm"
            >
              <Boxes className="size-4" />
              {t.install}
            </Link>
            <a
              href={repository}
              className="inline-flex items-center justify-center gap-2 rounded-full border bg-fd-secondary px-5 py-3 font-medium tracking-tight text-fd-secondary-foreground transition-colors hover:bg-fd-accent max-sm:text-sm"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
          <p className="mt-4 text-sm text-landing-foreground">{t.heroNote}</p>
        </Hero>
      </section>
      <section aria-labelledby="product-tour" className="mt-12 sm:mt-16">
        <h2 id="product-tour" className="text-2xl font-semibold tracking-tight">
          {t.watch}
        </h2>
        <p
          data-reveal-copy
          className="mt-2 text-sm leading-6 text-fd-muted-foreground"
        >
          {t.heroBody}
        </p>
        <div data-reveal-media className="mt-7">
          <ProductReel lang={lang} />
        </div>
      </section>
      <section
        aria-labelledby="connections-title"
        className="mx-auto mt-16 border-t pt-12 text-center"
      >
        <h2
          id="connections-title"
          className="text-2xl font-semibold tracking-tight whitespace-pre-line"
        >
          {t.connectTitle}
        </h2>
        <p
          data-reveal-copy
          className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-fd-muted-foreground"
        >
          {t.connectBody}
        </p>
        <div
          data-reveal-group
          className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            { name: 'Google Docs', image: '/connectors/google-docs.png' },
            { name: 'Gmail', image: '/connectors/gmail.png' },
            { name: 'Outlook', image: '/connectors/outlook.svg' },
            { name: 'OneDrive', image: '/connectors/onedrive.svg' },
            { name: 'SharePoint', image: '/connectors/sharepoint.svg' },
          ].map(({ name, image }) => (
            <div
              key={name}
              className="flex items-center gap-3 opacity-70 grayscale-[50%] transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={image}
                alt=""
                width={36}
                height={36}
                className="size-9 object-contain"
                loading="lazy"
              />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="capabilities-title" className="mt-12 sm:mt-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="capabilities-title"
              className="text-2xl font-semibold tracking-tight whitespace-pre-line"
            >
              {t.scenesTitle}
            </h2>
            <p
              data-reveal-copy
              className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground"
            >
              {t.channelBody}
            </p>
          </div>
          <Link
            href={docsPath(lang)}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand"
          >
            {t.docs}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div
          data-reveal-group
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topics.map(({ title, body, path, Icon }) => (
            <Link
              key={path}
              href={docsPath(lang, path)}
              className="group rounded-2xl border bg-fd-card p-6 transition-colors hover:border-brand/50 hover:bg-brand/5"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-brand" aria-hidden />
                <ArrowRight
                  className="size-4 text-fd-muted-foreground/50 group-hover:text-brand"
                  aria-hidden
                />
              </div>
              <h3 className="mt-5 font-semibold">{t[title]}</h3>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {t[body]}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section
        aria-labelledby="faq-title"
        className="mx-auto mt-16 max-w-4xl border-t pt-12"
      >
        <h2
          id="faq-title"
          className="mb-6 text-2xl font-semibold tracking-tight"
        >
          {t.faqTitle}
        </h2>
        {[
          ['faq1', 'faq1a'],
          ['faq2', 'faq2a'],
          ['faq3', 'faq3a'],
          ['faq4', 'faq4a'],
        ].map(([question, answer]) => (
          <details key={question} className="group border-b py-5">
            <summary className="cursor-pointer text-base font-medium">
              {t[question as MessageKey]}
            </summary>
            <p className="mt-4 text-sm leading-7 text-fd-muted-foreground">
              {t[answer as MessageKey]}
            </p>
          </details>
        ))}
      </section>
      <section className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-2xl border bg-linear-to-r from-brand/8 to-fd-background p-6 md:p-10">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight whitespace-pre-line">
            {t.ctaTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
            {t.ownBody}
          </p>
        </div>
        <Link
          href={installPath(lang)}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-medium text-brand-foreground transition-colors hover:bg-brand-200"
        >
          {t.install}
          <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </HomeMotion>
  )
}
