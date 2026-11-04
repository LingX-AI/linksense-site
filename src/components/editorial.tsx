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
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-8">
          {[
            { number: 6, label: 'languages' },
            { number: 2, label: 'deployments' },
            { number: 5, label: 'channels' },
          ].map(({ number, label }) => (
            <div
              key={label}
              data-proof-tile
              className="min-w-0 rounded-3xl bg-muted p-5 sm:p-7"
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
  const guides = [
    {
      title: 'install',
      body: 'installGuide',
      to: '/install',
      href: undefined,
      caption: 'Core / Full',
      image: '/media/product-poster.jpg',
      Icon: Terminal,
    },
    {
      title: 'start',
      body: 'startGuide',
      to: '/start',
      href: undefined,
      caption: 'LinkSense',
      image: '/media/linksense-intro-v6.jpg',
      Icon: FileText,
    },
    {
      title: 'extend',
      body: 'extendGuide',
      to: undefined,
      href: `${repository}/tree/main/examples`,
      caption: 'Skills / MCP',
      image: null,
      Icon: Box,
    },
  ] as const
  return (
    <section className="bg-ink px-gutter py-section text-white">
      <div className="mx-auto max-w-352">
        <RevealText className="text-section leading-tight font-medium tracking-tight whitespace-pre-line">
          {t('insightsTitle')}
        </RevealText>
        <div className="mt-14 grid gap-x-16 gap-y-20 md:grid-cols-2">
          {guides.map(
            ({ title, body, to, href, Icon, caption, image }, index) => {
              const content = (
                <>
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-muted ${
                      index === 0
                        ? 'aspect-[4/3]'
                        : index === 1
                          ? 'aspect-square'
                          : 'aspect-[4/3]'
                    }`}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        width="1200"
                        height="900"
                        loading="lazy"
                        className={`absolute inset-0 size-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105 motion-reduce:transition-none ${
                          index === 0
                            ? 'object-contain object-center'
                            : 'object-cover object-center'
                        }`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-sage text-primary">
                        <Icon className="size-24" aria-hidden="true" />
                      </div>
                    )}
                    <span className="absolute top-5 left-5 rounded-full bg-black/35 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                      {caption}
                    </span>
                  </div>
                  <h3 className="mt-6 flex items-center justify-between gap-3 text-2xl font-medium tracking-tight">
                    {t(title)}
                    <ArrowUpRight
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-3 max-w-110 text-sm leading-relaxed text-white/60">
                    {t(body)}
                  </p>
                </>
              )
              return (
                <article
                  data-batch
                  key={title}
                  className={
                    index === 1
                      ? 'md:mt-28'
                      : index === 2
                        ? 'md:col-start-1'
                        : ''
                  }
                >
                  {to ? (
                    <Link
                      to={to}
                      className="group block rounded-sm transition-colors hover:text-white"
                      data-cursor={t('read')}
                      data-cursor-mode="project"
                    >
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="group block rounded-sm transition-colors hover:text-white"
                      data-cursor={t('read')}
                      data-cursor-mode="project"
                    >
                      {content}
                    </a>
                  )}
                </article>
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}

export function Integrations() {
  const { t } = useTranslation()
  return (
    <div className="integration-logos mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
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
          className="group relative flex min-h-28 flex-col items-center justify-center gap-4 transition-opacity duration-500"
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
