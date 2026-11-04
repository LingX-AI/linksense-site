import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useId, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageIntro, Pill } from './shell'
import { Button } from './ui/button'
import { agentInstallUrl, docsUrl, installGuideUrl } from '@/lib/product'
import { cn } from '@/lib/utils'

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  const id = useId()
  const reduced = useReducedMotion()
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm text-muted-foreground">{label}</legend>
      <motion.div
        layout
        transition={{ layout: { duration: 0 } }}
        className="inline-flex rounded-full bg-muted p-1.5"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="relative cursor-pointer rounded-full px-5 py-3 text-sm font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-primary"
          >
            <input
              type="radio"
              className="sr-only"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {value === option.value && (
              <motion.span
                layoutId={id}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 450, damping: 36 }
                }
              />
            )}
            <span
              className={cn(
                'relative transition-colors duration-200',
                value === option.value && 'text-white',
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </motion.div>
    </fieldset>
  )
}

export function InstallPage() {
  const { t, i18n } = useTranslation()
  const { edition = 'core', platform = 'linux' } = useSearch({
    from: '/install',
  })
  const navigate = useNavigate({ from: '/install' })
  const [agentCopyState, setAgentCopyState] = useState<
    'idle' | 'copied' | 'failed'
  >('idle')
  const language = i18n.resolvedLanguage
  const agentPrompt = t('agentPrompt', {
    edition: edition === 'core' ? 'Core' : 'Full',
    platform: platform === 'linux' ? 'Linux' : 'macOS',
    docs: agentInstallUrl,
  })
  async function copyAgentPrompt() {
    try {
      await navigator.clipboard.writeText(agentPrompt)
      setAgentCopyState('copied')
    } catch {
      setAgentCopyState('failed')
    }
  }
  return (
    <>
      <PageIntro title={t('installTitle')}>
        <p>{t('installBody')}</p>
      </PageIntro>
      <section className="px-gutter pb-section">
        <div className="mx-auto grid max-w-280 gap-8 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-8 rounded-3xl border border-border p-6 md:p-8">
              <Segmented
                label={t('edition')}
                value={edition}
                options={[
                  { value: 'core', label: 'Core' },
                  { value: 'full', label: 'Full' },
                ]}
                onChange={(value) => {
                  setAgentCopyState('idle')
                  void navigate({
                    search: (previous) => ({ ...previous, edition: value }),
                    replace: true,
                    resetScroll: false,
                  })
                }}
              />
              <Segmented
                label={t('platform')}
                value={platform}
                options={[
                  { value: 'linux', label: 'Linux' },
                  { value: 'macos', label: 'macOS' },
                ]}
                onChange={(value) => {
                  setAgentCopyState('idle')
                  void navigate({
                    search: (previous) => ({ ...previous, platform: value }),
                    replace: true,
                    resetScroll: false,
                  })
                }}
              />
            </div>
            <p className="mt-7 min-h-12 text-lg text-muted-foreground">
              {t(edition === 'full' ? 'fullBody' : 'coreBody')}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Pill href={installGuideUrl(language, edition, platform)}>
                {t('installGuide')}
              </Pill>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                href={docsUrl(language, 'deploy/operations/')}
              >
                {t('manage')}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <section
            className="min-w-0 rounded-3xl border border-border bg-cloud/40 p-6 md:p-8"
            aria-labelledby="agent-install-title"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2
                id="agent-install-title"
                className="text-2xl font-medium tracking-tight"
              >
                {t('agentTitle')}
              </h2>
              <Button
                variant="outline"
                onClick={() => void copyAgentPrompt()}
                className="min-h-10 gap-2 px-4 text-xs"
              >
                {agentCopyState === 'copied' ? <Check /> : <Copy />}
                {t(agentCopyState === 'copied' ? 'copied' : 'agentCopy')}
              </Button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t('agentBody')}
            </p>
            <pre className="mt-5 max-h-64 overflow-auto rounded-2xl border border-border bg-background p-5 text-xs leading-relaxed whitespace-pre-wrap select-all">
              <code>{agentPrompt}</code>
            </pre>
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              {agentCopyState === 'failed'
                ? t('copyFailed')
                : agentCopyState === 'copied'
                  ? t('copied')
                  : ''}
            </p>
          </section>
        </div>
      </section>
    </>
  )
}
