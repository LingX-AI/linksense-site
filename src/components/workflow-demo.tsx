import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  FileSpreadsheet,
  FileText,
  LockKeyhole,
  MessageSquareText,
  Network,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = {
  work: ['tourWork1', 'tourWork2', 'tourWork3'],
  knowledge: ['tourKnowledge1', 'tourKnowledge2', 'tourKnowledge3'],
  apps: ['tourApps1', 'tourApps2', 'tourApps3'],
} as const

export type WorkflowKind = keyof typeof steps

export function WorkflowDemo({ kind }: { kind: WorkflowKind }) {
  const [step, setStep] = useState(0)
  const id = useId()
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const stage = steps[kind][step]

  const file = (name: string, spreadsheet = false) => (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-foreground/12 bg-muted p-4">
      {spreadsheet ? (
        <FileSpreadsheet
          className="size-6 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      ) : (
        <FileText
          className="size-6 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <span className="min-w-0 text-sm font-medium break-all">{name}</span>
      <Check
        className="ml-auto size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
  )

  return (
    <div
      className="rounded-xl border border-black/8 bg-white p-4 text-foreground shadow-sm sm:p-6"
      data-workflow={kind}
    >
      <div
        id={`${id}-panel`}
        aria-live="polite"
        aria-atomic="true"
        className="px-1 py-2 sm:px-3"
      >
        <motion.div
          key={stage}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-48 flex-col justify-center"
        >
          {kind === 'work' && step === 0 && (
            <>
              <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
                <MessageSquareText className="size-4" aria-hidden="true" />
                {t('input')}
              </div>
              <div className="rounded-2xl rounded-br-md bg-muted p-5 text-sm leading-relaxed text-foreground">
                {t('prompt')}
              </div>
              <div className="mt-5">{file('sales.xlsx', true)}</div>
            </>
          )}
          {kind === 'work' && step === 1 && (
            <>
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {t('report')}
              </div>
              <p className="mb-6 text-lg leading-relaxed font-medium">
                {t('tourSummary')}
              </p>
              <div className="grid gap-3">
                {file('Summary.docx')}
                {file('Analysis.xlsx', true)}
              </div>
            </>
          )}
          {kind === 'work' && step === 2 && (
            <>
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="size-4" aria-hidden="true" />
                Summary.docx
              </div>
              <p className="text-xl font-medium tracking-tight">
                {t('tourAnnotation')}
              </p>
              <blockquote className="mt-5 border-l-2 border-primary/40 bg-muted px-4 py-3 text-sm leading-relaxed">
                {t('tourSummary')}
              </blockquote>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-foreground/12 p-4 text-sm leading-relaxed">
                <MessageSquareText
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                {t('tourRefine')}
              </div>
            </>
          )}
          {kind === 'knowledge' && step === 0 && (
            <>
              <span className="mb-5 inline-flex w-fit items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="size-4" aria-hidden="true" />
                {t('knowledge')}
              </span>
              <div className="rounded-2xl rounded-br-md bg-muted p-5 text-lg leading-relaxed font-medium text-foreground">
                {t('tourQuestion')}
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <FileText className="size-4 shrink-0" aria-hidden="true" />
                {t('policy')}
              </div>
            </>
          )}
          {kind === 'knowledge' && step === 1 && (
            <>
              <p className="text-lg leading-relaxed">{t('tourAnswer')}</p>
              <div className="mt-6 rounded-xl border border-foreground/12 bg-muted p-4">
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Quote className="size-3.5" aria-hidden="true" />
                  {t('tourCitation')}
                </span>
                <p className="mt-3 flex items-center justify-between gap-3 text-sm font-medium">
                  {t('policy')}
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </p>
              </div>
            </>
          )}
          {kind === 'knowledge' && step === 2 && (
            <>
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="size-4" aria-hidden="true" />
                {t('tourDocument')}
              </div>
              <div className="rounded-xl bg-muted p-5 text-foreground">
                <p className="text-lg font-medium">{t('policy')}</p>
                <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed">
                  {t('tourExcerpt')}
                </p>
              </div>
              <span className="mt-5 text-xs text-muted-foreground">Full</span>
            </>
          )}
          {kind === 'apps' && step === 0 && (
            <>
              <p className="mb-5 text-xs text-muted-foreground">
                {t('tourResources')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { Icon: BookOpen, label: t('knowledge') },
                  { Icon: Sparkles, label: t('skill') },
                  { Icon: Network, label: 'MCP' },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-foreground/12 bg-muted px-2 py-5 text-center text-xs wrap-anywhere"
                  >
                    <Icon
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {label}
                  </div>
                ))}
              </div>
              <ArrowDown
                className="mx-auto my-4 size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="rounded-xl bg-muted p-4 text-center text-sm font-medium text-foreground">
                {t('tourAppName')}
              </div>
            </>
          )}
          {kind === 'apps' && step === 1 && (
            <>
              <p className="mb-6 text-xl font-medium tracking-tight">
                {t('tourAppName')}
              </p>
              <div className="space-y-4">
                {[t('tourModel'), t('tourResources')].map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-foreground/12 pb-4 text-sm"
                  >
                    <span>{label}</span>
                    <Check
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-muted p-4 text-sm">
                <Users
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                {t('people')}
              </div>
            </>
          )}
          {kind === 'apps' && step === 2 && (
            <>
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <LockKeyhole className="size-5" aria-hidden="true" />
              </div>
              <p className="text-lg font-medium">{t('tourAccess')}</p>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-foreground/12 p-4">
                <Users
                  className="size-5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-sm">{t('tourGroup')}</span>
                <Check
                  className="ml-auto size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                {t('tourPrivate')}
              </p>
            </>
          )}
        </motion.div>
      </div>
      <div
        role="group"
        aria-label={t('tourSteps')}
        className="mt-4 grid grid-cols-3 gap-2"
      >
        {steps[kind].map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={step === index}
            aria-controls={`${id}-panel`}
            onClick={() => setStep(index)}
            className={cn(
              'flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transition-none',
              step === index
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-border hover:text-foreground',
            )}
          >
            <span aria-hidden="true" className="sr-only">
              0{index + 1}
            </span>
            <span className="min-w-0 wrap-anywhere">{t(label)}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {t('sample')}
      </p>
    </div>
  )
}
