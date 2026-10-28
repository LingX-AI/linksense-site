import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useInView } from 'motion/react'
import NumberFlow from '@number-flow/react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Box, FileText, Terminal } from 'lucide-react'
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
      className="block font-display text-6xl font-medium tracking-tighter tabular-nums md:text-7xl"
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

export function OrganizationProof() {
  const { t } = useTranslation()
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto grid max-w-352 gap-12 lg:grid-cols-[.9fr_1.6fr] lg:items-center lg:gap-20">
        <RevealText className="max-w-100 text-feature leading-tight font-medium tracking-tight">
          {t('proofTitle')}
        </RevealText>
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { number: 6, label: 'languages' },
            { number: 2, label: 'deployments' },
            { number: 5, label: 'channels' },
          ].map(({ number, label }) => (
            <div
              key={label}
              data-proof-tile
              className="min-w-0 border-l border-border pl-4 sm:pl-7"
            >
              <ViewportNumber value={number} />
              <p className="mt-4 max-w-40 text-xs leading-relaxed wrap-anywhere text-muted-foreground sm:text-sm">
                {t(label)}
              </p>
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
      <div className="mx-auto max-w-352">
        <RevealText className="text-feature leading-tight font-medium tracking-tight whitespace-pre-line">
          {t('insightsTitle')}
        </RevealText>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
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
                <div className="flex items-center justify-between gap-5 border-b border-border pb-5 text-muted-foreground">
                  <span className="text-sm">{caption}</span>
                  <Icon
                    className="size-6 transition-transform duration-700 ease-out-expo group-hover:scale-110 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 flex items-center justify-between gap-3 text-2xl font-medium tracking-tight">
                  {t(title)}
                  <ArrowUpRight
                    className="size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
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
                    className="group block rounded-sm transition-colors hover:text-primary"
                    data-cursor={t('read')}
                    data-cursor-mode="project"
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="group block rounded-sm transition-colors hover:text-primary"
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
    <div className="integration-logos mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {[
        { name: 'Google Docs', image: 'google-docs.png' },
        { name: 'Gmail', image: 'gmail.png' },
        { name: 'Outlook', image: 'outlook.svg' },
        { name: 'OneDrive', image: 'onedrive.svg' },
        { name: 'SharePoint', image: 'sharepoint.svg' },
      ].map(({ name, image }) => (
        <a
          key={name}
          data-batch
          data-cursor-stick
          href={`${repository}/blob/main/docs/${name === 'OneDrive' || name === 'SharePoint' ? 'microsoft-connections' : 'workspace-connections'}.md`}
          className="group relative flex min-h-36 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-white transition-opacity duration-200"
        >
          <img
            src={`/connectors/${image}`}
            width="48"
            height="48"
            alt=""
            className="size-9 object-contain"
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
