import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  CalendarDays,
  Layers3,
  LockKeyhole,
  Plus,
  ShieldCheck,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { RevealText, ElasticRule, EnterGroup } from './motion'
import { ScrollScenes } from './scroll-scenes'
import { Pill } from './shell'
import { ProductReel } from './product-reel'
import { CapabilityMap } from './capability-map'
import { demoUrl, repository } from '@/lib/product'
import { Services } from './services'
import { ScrollTrigger } from '@/lib/animation'
import { OrganizationProof, Guides, Integrations } from './editorial'

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const id = useId(),
    reduced = useReducedMotion()
  return (
    <article data-batch>
      <h3>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-6 py-7 text-left text-lg font-medium md:text-xl"
        >
          {question}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <Plus className="size-5 shrink-0" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={id}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
        className="overflow-hidden"
      >
        <p className="max-w-200 pr-8 pb-8 text-base leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </motion.div>
      <ElasticRule />
    </article>
  )
}

export function HomePage() {
  const { t } = useTranslation()
  return (
    <ScrollScenes>
      <section className="px-gutter pt-12 pb-12 md:pt-18 md:pb-16">
        <EnterGroup className="mx-auto grid max-w-352 gap-8 lg:grid-cols-[1.8fr_1fr] lg:gap-16">
          <div>
            <p className="mb-6 text-sm text-muted-foreground">
              {t('category')}
            </p>
            <RevealText
              as="h1"
              className="text-hero leading-[1.06] font-medium tracking-[-0.055em]"
            >
              {`${t('hero1')}\n${t('hero2')}`}
            </RevealText>
          </div>
          <div className="flex flex-col items-start justify-end lg:pb-2">
            <RevealText
              as="p"
              className="max-w-96 text-base leading-relaxed font-normal tracking-normal text-muted-foreground md:text-lg"
              delay={0.1}
            >
              {t('heroBody')}
            </RevealText>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Pill href={demoUrl}>{t('try')}</Pill>
              <Link
                to="/install"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-primary"
              >
                {t('install')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              {t('heroNote')}
            </p>
          </div>
        </EnterGroup>
      </section>
      <div className="px-gutter">
        <ProductReel />
      </div>
      <section className="px-gutter py-section" id="product">
        <div className="mx-auto max-w-352">
          <div className="mb-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-16">
            <RevealText className="text-section leading-tight font-medium tracking-tight whitespace-pre-line">
              {t('tourTitle')}
            </RevealText>
            <p className="max-w-110 text-base leading-relaxed text-muted-foreground">
              {t('tourBody')}
            </p>
          </div>
          <Services />
        </div>
      </section>
      <section className="border-y border-border bg-sage/45 px-gutter py-section">
        <div className="mx-auto grid max-w-352 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <RevealText className="text-section leading-tight font-medium tracking-tight whitespace-pre-line">
              {t('methodsTitle')}
            </RevealText>
            <p className="mt-6 max-w-120 text-base leading-relaxed text-muted-foreground">
              {t('introBody')}
            </p>
            <ol className="mt-10 space-y-6">
              {([1, 2, 3] as const).map((step) => (
                <li key={step} data-batch className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-xs tabular-nums">
                    {step}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">
                      {t(`method${step}`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t(`method${step}body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-132 min-w-0 self-center">
            <CapabilityMap />
          </div>
        </div>
      </section>
      <section className="px-gutter py-section">
        <div className="mx-auto max-w-352">
          <div className="grid items-center gap-6 border-b border-border pb-12 md:grid-cols-[1fr_1fr] md:gap-16">
            <div className="flex items-center gap-5">
              <CalendarDays
                className="size-9 shrink-0 text-primary"
                aria-hidden="true"
              />
              <RevealText className="text-feature leading-tight font-medium tracking-tight">
                {t('autoTitle')}
              </RevealText>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t('autoBody')}
            </p>
          </div>
          <div className="grid gap-x-16 md:grid-cols-2">
            {(['plan', 'goal', 'space', 'create'] as const).map((feature) => (
              <article
                key={feature}
                data-batch
                className="border-b border-border py-9"
              >
                <RevealText className="text-2xl font-medium tracking-tight">
                  {t(`${feature}Title`)}
                </RevealText>
                <p className="mt-4 max-w-140 text-base leading-relaxed text-muted-foreground">
                  {t(`${feature}Body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-gutter pb-section">
        <div className="mx-auto max-w-352">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <RevealText className="text-section leading-tight font-medium tracking-tight whitespace-pre-line">
              {t('connectTitle')}
            </RevealText>
            <div className="flex flex-col justify-end gap-4">
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('connectBody')}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('channelBody')}
              </p>
            </div>
          </div>
          <Integrations />
          <div className="mt-8">
            <ElasticRule />
          </div>
        </div>
      </section>
      <section className="bg-cloud px-gutter py-section">
        <div className="mx-auto grid max-w-352 gap-14 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div>
            <RevealText className="text-section leading-tight font-medium tracking-tight whitespace-pre-line">
              {t('ownTitle')}
            </RevealText>
            <p className="mt-7 max-w-120 text-base leading-relaxed text-muted-foreground">
              {t('ownBody')}
            </p>
            <div className="mt-9">
              <Pill to="/install">{t('install')}</Pill>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {[
              { Icon: Box, key: 'models' },
              { Icon: LockKeyhole, key: 'governance' },
              { Icon: ShieldCheck, key: 'usage' },
              { Icon: Layers3, key: 'open' },
            ].map(({ Icon, key }) => (
              <div
                key={key}
                data-batch
                className="flex items-center gap-5 border-b border-foreground/15 py-6 text-base"
              >
                <Icon
                  className="size-6 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {t(key)}
              </div>
            ))}
            <a
              href={repository}
              className="mt-6 flex min-h-11 items-center gap-3 self-start text-sm hover:text-primary"
            >
              GitHub
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <OrganizationProof />
      <Guides />
      <section className="px-gutter py-section">
        <div className="mx-auto grid max-w-352 gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24">
          <div>
            <RevealText className="text-feature leading-tight font-medium tracking-tight">
              {t('faqTitle')}
            </RevealText>
            <ArrowDown
              className="mt-10 size-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className="border-t border-border">
            {[1, 2, 3, 4].map((number) => (
              <FaqItem
                key={number}
                question={t(`faq${number}`)}
                answer={t(`faq${number}a`)}
              />
            ))}
          </div>
        </div>
      </section>
    </ScrollScenes>
  )
}
