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
import { Pill } from './shell'
import { ProductReel } from './product-reel'
import { CapabilityMap } from './capability-map'
import { demoUrl, repository } from '@/lib/product'
import { Services } from './services'
import { ScrollScenes } from './scroll-scenes'
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
      <section className="px-gutter pt-8 pb-8 md:pt-10 md:pb-8">
        <div className="mx-auto grid max-w-330 items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              {t('category')}
            </p>
            <RevealText as="h1" className="text-hero leading-[1.08]">
              {`${t('hero1')}\n${t('hero2')}`}
            </RevealText>
            <RevealText
              as="p"
              className="mt-6 max-w-150 text-lg leading-relaxed font-normal tracking-normal text-muted-foreground"
              delay={0.1}
            >
              {t('heroBody')}
            </RevealText>
            <EnterGroup className="mt-8 flex flex-wrap items-center gap-6">
              <Pill href={demoUrl}>{t('try')}</Pill>
              <Link
                to="/install"
                className="inline-flex items-center gap-3 text-sm font-medium"
              >
                {t('install')}
                <ArrowUpRight className="size-4" />
              </Link>
            </EnterGroup>
            <p className="mt-6 text-xs text-muted-foreground">
              {t('heroNote')}
            </p>
          </div>
          <EnterGroup className="mx-auto w-full max-w-120 min-w-0 lg:max-w-none lg:pl-3">
            <CapabilityMap />
          </EnterGroup>
        </div>
      </section>
      <div className="px-gutter">
        <ProductReel />
      </div>
      <section className="px-gutter py-section" id="product">
        <div className="mx-auto max-w-320">
          <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
            <RevealText className="text-section">{t('tourTitle')}</RevealText>
            <RevealText
              as="p"
              className="max-w-150 text-xl leading-relaxed font-normal tracking-normal text-muted-foreground"
            >
              {t('tourBody')}
            </RevealText>
          </div>
          <Services />
        </div>
      </section>
      <section className="px-gutter pb-section">
        <div className="mx-auto grid max-w-320 gap-5 rounded-3xl border border-border bg-muted p-7 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-8 md:p-10">
          <CalendarDays className="size-8 text-primary" aria-hidden="true" />
          <h2 className="text-2xl font-medium tracking-tight">
            {t('autoTitle')}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('autoBody')}
          </p>
        </div>
      </section>
      <section className="px-gutter py-section">
        <div className="mx-auto grid max-w-320 gap-x-14 md:grid-cols-2">
          {(['plan', 'goal', 'space', 'create'] as const).map((feature) => (
            <article
              key={feature}
              data-batch
              className="border-t border-border py-9"
            >
              <h2 className="text-2xl font-medium tracking-tight">
                {t(`${feature}Title`)}
              </h2>
              <p className="mt-4 max-w-140 text-base leading-relaxed text-muted-foreground">
                {t(`${feature}Body`)}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-gutter py-section">
        <div className="mx-auto max-w-320">
          <div className="grid gap-10 md:grid-cols-2">
            <RevealText className="text-section">
              {t('connectTitle')}
            </RevealText>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t('connectBody')}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('channelBody')}
              </p>
            </div>
          </div>
          <Integrations />
          <div className="mt-10">
            <ElasticRule />
          </div>
        </div>
      </section>
      <section className="bg-muted px-gutter py-section">
        <div className="mx-auto grid max-w-320 gap-14 md:grid-cols-2">
          <div>
            <RevealText className="text-section">{t('ownTitle')}</RevealText>
            <p className="mt-7 max-w-140 text-lg leading-relaxed text-muted-foreground">
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
                className="flex items-center gap-5 border-b border-border py-7 text-xl"
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
              className="mt-8 flex items-center gap-3 text-sm"
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
      <OrganizationProof />
      <Guides />
      <section className="px-gutter py-section">
        <div className="mx-auto grid max-w-320 gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <RevealText className="text-feature">{t('faqTitle')}</RevealText>
            <ArrowDown
              className="mt-10 size-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
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
