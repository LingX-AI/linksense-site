import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Box,
  CalendarDays,
  Check,
  FileSpreadsheet,
  Folder,
  Layers3,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { RevealText, ElasticRule, EnterGroup } from './motion'
import { Pill } from './shell'
import { ProductReel } from './product-reel'
import { cn } from '@/lib/utils'
import { demoUrl, repository } from '@/lib/product'
import { Services } from './services'
import { ScrollScenes } from './scroll-scenes'
import { HoverDemo } from './hover-demo'
import { ScrollTrigger } from '@/lib/animation'
import {
  MethodCards,
  OrganizationProof,
  Guides,
  Integrations,
} from './editorial'

function Scene({ kind }: { kind: 'work' | 'knowledge' | 'apps' | 'auto' }) {
  const { t } = useTranslation()
  const paper = 'rounded-xl bg-white p-6 shadow-xl shadow-black/5 md:p-8'
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        kind !== 'knowledge' && 'min-h-100 p-7 md:min-h-130 md:p-12',
      )}
      aria-hidden="true"
    >
      {kind === 'work' && (
        <div className="relative w-full max-w-85 rotate-[-5deg] transition-transform duration-1000 group-hover:rotate-0">
          <div className="absolute inset-0 translate-x-5 translate-y-4 rotate-6 rounded-xl bg-white/60" />
          <div className={cn(paper, 'relative')}>
            <FileSpreadsheet className="mb-8 size-9 text-primary" />
            <p className="mb-2 text-xs text-muted-foreground">
              {t('materials')}
            </p>
            <p className="mb-8 text-xl font-medium">{t('report')}</p>
            <div className="flex h-28 items-end gap-3 border-b border-border">
              {['h-1/3', 'h-3/5', 'h-2/5', 'h-4/5', 'h-full', 'h-3/5'].map(
                (height, index) => (
                  <div
                    key={index}
                    data-scene-item
                    className={cn(
                      'flex-1 rounded-t-md',
                      index === 4 ? 'bg-primary' : 'bg-primary/20',
                      height,
                    )}
                  />
                ),
              )}
            </div>
            <div className="mt-7 flex gap-2">
              {['Word', 'Excel', 'PDF'].map((file) => (
                <span
                  key={file}
                  className="rounded-full border border-border px-3 py-1 text-xs"
                >
                  {file}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {kind === 'knowledge' && (
        <div className="flex min-h-100 w-full flex-col md:min-h-130">
          <div
            className={cn(
              paper,
              'flex flex-1 flex-col rounded-none p-10 pt-18 text-foreground shadow-none md:p-12 md:pt-20',
            )}
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-lilac px-3 py-1 text-xs">
              <BookOpen className="size-3" />
              {t('policy')}
            </span>
            <p className="mt-8 mb-7 text-3xl leading-tight font-medium">
              {t('answer')}
            </p>
            <div data-scene-item className="space-y-2">
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-4/5 rounded bg-muted" />
              <div className="h-2 w-11/12 rounded bg-muted" />
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-primary">
              <span>{t('source')}</span>
              <ArrowUpRight className="size-4" />
            </div>
          </div>
          <div className="border-t border-white/20 bg-white/10 px-10 pt-5 pb-12 text-sm text-white/80 md:px-12">
            <Folder className="mr-3 inline size-4" />
            {t('materials')}
          </div>
        </div>
      )}
      {kind === 'apps' && (
        <div className="w-full max-w-90">
          <div className="flex justify-center gap-3 pb-10">
            {(
              [
                { Icon: BookOpen, text: 'knowledge' },
                { Icon: Sparkles, text: 'skill' },
                { Icon: Workflow, text: 'tools' },
              ] as const
            ).map(({ Icon: Component, text }) => {
              return (
                <div
                  key={text}
                  data-scene-item
                  className="flex size-19 flex-col items-center justify-center gap-2 rounded-2xl bg-white/65 text-xs"
                >
                  <Component className="size-6" />
                  {t(text)}
                </div>
              )
            })}
          </div>
          <div className={cn(paper, 'text-center')}>
            <Box className="mx-auto mb-4 size-11 text-primary" />
            <p className="text-2xl font-medium">{t('sharedApp')}</p>
            <div className="my-6 h-px bg-border" />
            <div className="flex items-center justify-center gap-3">
              <Users className="size-5 text-muted-foreground" />
              <span className="text-sm">{t('people')}</span>
              <span className="flex size-5 items-center justify-center rounded-full bg-mint text-green-800">
                <Check className="size-3" />
              </span>
            </div>
          </div>
        </div>
      )}
      {kind === 'auto' && (
        <div
          className={cn(
            paper,
            'w-full max-w-90 rotate-[-3deg] transition-transform duration-1000 group-hover:rotate-0',
          )}
        >
          <div className="mb-7 flex items-center justify-between">
            <CalendarDays className="size-9 text-green-800" />
            <span className="rounded-full bg-mint px-3 py-1 text-xs text-green-900">
              {t('scheduled')}
            </span>
          </div>
          <p className="mb-8 text-2xl font-medium">{t('weekly')}</p>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 21 }, (_, index) => (
              <div
                key={index}
                data-scene-item
                className={cn(
                  'flex aspect-square items-center justify-center rounded-md text-xs',
                  index % 7 === 0
                    ? 'bg-green-800 text-white'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {index % 7 === 0 ? <Check className="size-3" /> : index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Showcase() {
  const { t } = useTranslation()
  const cards = [
    {
      kind: 'work',
      title: 'workTitle',
      body: 'workBody',
      surface: 'bg-cloud',
      to: '/start',
    },
    {
      kind: 'knowledge',
      title: 'knowledgeTitle',
      body: 'knowledgeBody',
      surface: 'bg-ink',
      to: '/install',
    },
    {
      kind: 'apps',
      title: 'appsTitle',
      body: 'appsBody',
      surface: 'bg-lilac',
      to: '/start',
    },
    {
      kind: 'auto',
      title: 'autoTitle',
      body: 'autoBody',
      surface: 'bg-mint',
      to: '/start',
    },
  ] as const
  return (
    <section
      className="rounded-t-section bg-foreground px-gutter py-section text-white"
      id="work"
    >
      <div className="mx-auto max-w-320">
        <RevealText className="max-w-220 text-section">
          {t('scenesTitle')}
        </RevealText>
        <div className="mt-16 grid gap-x-14 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {[0, 1].map((column) => (
            <div
              key={column}
              className={cn(
                'contents md:flex md:flex-col md:gap-24',
                column === 1 && 'md:pt-36',
              )}
            >
              {cards
                .filter((_, index) => index % 2 === column)
                .map((card) => (
                  <motion.article
                    key={card.kind}
                    initial={{ y: 45, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'group md:order-none',
                      {
                        work: 'order-1',
                        knowledge: 'order-2',
                        apps: 'order-3',
                        auto: 'order-4',
                      }[card.kind],
                    )}
                  >
                    <Link
                      to={card.to}
                      data-cursor={t('start')}
                      data-cursor-mode="project"
                      className="block"
                    >
                      <div
                        className={cn(
                          'relative overflow-hidden rounded-media text-foreground transition-transform duration-1000 ease-out-expo group-hover:scale-[.98]',
                          card.surface,
                        )}
                      >
                        <div className="absolute top-6 left-7 z-10 text-xs text-current/50">
                          {t('sample')}
                        </div>
                        <div data-parallax>
                          <div className="transition-transform duration-1000 ease-out-expo group-hover:scale-105">
                            {card.kind === 'apps' ? (
                              <HoverDemo>
                                <Scene kind={card.kind} />
                              </HoverDemo>
                            ) : (
                              <Scene kind={card.kind} />
                            )}
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-6 flex items-start justify-between gap-5 text-2xl font-medium tracking-tight">
                        {t(card.title)}
                        <ArrowUpRight className="mt-1 size-5 shrink-0" />
                      </h3>
                    </Link>
                    <p className="mt-3 max-w-120 text-sm leading-relaxed text-white/50">
                      {t(card.body)}
                    </p>
                  </motion.article>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
      <section className="px-gutter pt-16 pb-14 md:pt-21 md:pb-16">
        <div className="mx-auto max-w-330 md:text-center">
          <p className="mb-7 flex items-center gap-2 text-sm text-muted-foreground md:justify-center">
            <span className="size-1.5 rounded-full bg-primary" />
            {t('category')}
          </p>
          <RevealText
            as="h1"
            className="text-hero"
          >{`${t('hero1')}\n${t('hero2')}`}</RevealText>
          <RevealText
            as="p"
            className="mx-auto mt-6 max-w-185 text-lg leading-relaxed font-normal tracking-normal text-muted-foreground md:text-xl"
            delay={0.1}
          >
            {t('heroBody')}
          </RevealText>
          <EnterGroup className="mt-9 flex flex-wrap items-center gap-6 md:justify-center">
            <Pill href={demoUrl}>{t('try')}</Pill>
            <Link
              to="/install"
              className="inline-flex items-center gap-3 text-sm font-medium"
            >
              {t('install')}
              <ArrowUpRight className="size-4" />
            </Link>
          </EnterGroup>
        </div>
      </section>
      <div className="px-gutter">
        <ProductReel />
      </div>
      <section className="px-gutter py-section" id="product">
        <div className="mx-auto max-w-320">
          <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
            <RevealText className="text-section">{t('introTitle')}</RevealText>
            <RevealText
              as="p"
              className="max-w-150 text-xl leading-relaxed font-normal tracking-normal text-muted-foreground"
            >
              {t('introBody')}
            </RevealText>
          </div>
          <Services />
        </div>
      </section>
      <Showcase />
      <MethodCards />
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
