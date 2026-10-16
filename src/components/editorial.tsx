import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Box, FileText, Layers3, Terminal } from 'lucide-react'
import { RevealText } from './motion'
import { repository } from '@/lib/product'

function ViewportNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const { i18n } = useTranslation()
  return (
    <span
      ref={ref}
      className="block text-7xl font-medium tracking-tighter tabular-nums"
    >
      <span className="sr-only">
        {new Intl.NumberFormat(i18n.language).format(value)}
      </span>
      <NumberFlow
        aria-hidden="true"
        value={visible || reduced ? value : 0}
        locales={i18n.language}
        animated={!reduced}
        trend={1}
        transformTiming={{
          duration: 1200,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </span>
  )
}

export function MethodCards() {
  const { t } = useTranslation()
  const cards = [
    {
      title: 'method1',
      body: 'method1body',
      Icon: FileText,
      style: '-rotate-6 md:translate-y-6',
    },
    { title: 'method2', body: 'method2body', Icon: Layers3, style: 'rotate-3' },
    {
      title: 'method3',
      body: 'method3body',
      Icon: Box,
      style: '-rotate-3 md:translate-y-10',
    },
  ] as const
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto max-w-320">
        <RevealText className="max-w-220 text-section">
          {t('methodsTitle')}
        </RevealText>
        <div className="group/prompts mt-20 grid gap-10 px-3 md:grid-cols-3 md:gap-5">
          {cards.map(({ title, body, Icon, style }) => (
            <div data-batch key={title}>
              <article
                className={`flex min-h-80 flex-col rounded-3xl bg-muted p-8 transition-transform duration-1000 ease-out-expo group-focus-within/prompts:translate-y-0 group-focus-within/prompts:rotate-0 group-hover/prompts:translate-y-0 group-hover/prompts:rotate-0 ${style}`}
              >
                <Icon
                  className="mb-10 size-8 text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-medium tracking-tight">
                  {t(title)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t(body)}
                </p>
                <Link
                  to="/start"
                  className="mt-8 flex w-fit items-center gap-2 text-sm"
                >
                  {t('start')}
                  <ArrowUpRight className="size-4" />
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function OrganizationProof() {
  const { t } = useTranslation()
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto max-w-320">
        <RevealText className="max-w-220 text-section">
          {t('proofTitle')}
        </RevealText>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { number: 6, label: 'languages', background: 'bg-cloud' },
            { number: 2, label: 'deployments', background: 'bg-lilac' },
            { number: 5, label: 'channels', background: 'bg-mint' },
          ].map(({ number, label, background }) => (
            <div
              data-proof-tile
              key={label}
              className={`rounded-3xl p-8 md:p-10 ${background}`}
            >
              <ViewportNumber value={number} />
              <p className="mt-7 max-w-50 text-lg leading-tight">{t(label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Guides() {
  const { t } = useTranslation()
  return (
    <section className="bg-muted px-gutter py-section">
      <div className="mx-auto max-w-320">
        <RevealText className="text-section">{t('insightsTitle')}</RevealText>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              title: 'install',
              body: 'installGuide',
              to: '/install',
              Icon: Terminal,
              caption: 'Core / Full',
            },
            {
              title: 'start',
              body: 'startGuide',
              to: '/start',
              Icon: FileText,
              caption: 'LinkSense',
            },
            {
              title: 'extend',
              body: 'extendGuide',
              href: `${repository}/tree/main/examples`,
              Icon: Box,
              caption: 'Skills / MCP',
            },
          ].map(({ title, body, to, href, Icon, caption }) => {
            const content = (
              <>
                <div className="flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-3xl bg-white p-8 transition-transform duration-1000 ease-out-expo group-hover:scale-[.98]">
                  <Icon
                    className="size-12 text-primary transition-transform duration-1000 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="text-2xl font-medium tracking-tight">
                    {caption}
                  </span>
                </div>
                <h3 className="mt-6 flex items-center justify-between gap-3 text-xl font-medium">
                  {t(title)}
                  <ArrowUpRight className="size-4 shrink-0" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(body)}
                </p>
              </>
            )
            return (
              <article data-batch key={title}>
                {to ? (
                  <Link
                    to={to}
                    className="group block"
                    data-cursor={t('read')}
                    data-cursor-mode="project"
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="group block"
                    data-cursor={t('read')}
                    data-cursor-mode="project"
                  >
                    {content}
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Integrations() {
  const { t } = useTranslation()
  return (
    <div className="integration-logos mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
      {[
        { name: 'Google Docs', image: 'google-docs.png' },
        { name: 'Gmail', image: 'gmail.png' },
        { name: 'Outlook', image: 'outlook.svg' },
        { name: 'OneDrive', image: 'onedrive.svg' },
        { name: 'SharePoint', image: 'sharepoint.svg' },
      ].map(({ name, image }) => (
        <a
          key={name}
          href={`${repository}/blob/main/docs/${name === 'OneDrive' || name === 'SharePoint' ? 'microsoft-connections' : 'workspace-connections'}.md`}
          className="group relative flex min-h-38 flex-col items-center justify-center gap-5 rounded-2xl transition-opacity duration-500"
          data-batch
          data-cursor-stick
        >
          <img
            src={`/connectors/${image}`}
            width="48"
            height="48"
            alt=""
            className="size-12 object-contain"
            loading="lazy"
          />
          <span className="text-sm font-medium">{name}</span>
          <span
            aria-hidden="true"
            className="absolute -bottom-4 rounded-full bg-foreground px-3 py-1.5 text-xs text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {t('docs')}
          </span>
        </a>
      ))}
    </div>
  )
}
