import { useId, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Check,
  Copy,
  Terminal,
  Cpu,
  MemoryStick,
  HardDrive,
  ArrowUpRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageIntro } from './shell'
import { Button } from './ui/button'
import { installCommand, repository } from '@/lib/product'

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
  return (
    <fieldset>
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
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 36 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </label>
        ))}
      </motion.div>
    </fieldset>
  )
}

export function InstallPage() {
  const { t } = useTranslation()
  const { edition = 'core', platform = 'linux' } = useSearch({
    from: '/install',
  })
  const navigate = useNavigate({ from: '/install' })
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  const [agentCopyState, setAgentCopyState] = useState<
    'idle' | 'copied' | 'failed'
  >('idle')
  const command = installCommand(edition, platform)
  const agentPrompt = t('agentPrompt', {
    edition: edition === 'core' ? 'Core' : 'Full',
    platform: platform === 'linux' ? 'Linux' : 'macOS',
    docs: `${repository}#readme`,
    command,
  })
  const address =
    platform === 'macos'
      ? 'http://localhost:18081'
      : 'http://<server-address>:18081'
  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }
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
        <div className="mx-auto grid max-w-280 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-8">
              <Segmented
                label={t('edition')}
                value={edition}
                options={[
                  { value: 'core', label: 'Core' },
                  { value: 'full', label: 'Full' },
                ]}
                onChange={(value) => {
                  setCopyState('idle')
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
                  setCopyState('idle')
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
            <div className="mt-5 overflow-hidden rounded-3xl bg-ink text-white">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 text-xs text-white/50">
                <span className="flex items-center gap-2">
                  <Terminal className="size-4" />
                  {platform === 'linux' ? 'Linux' : 'macOS'} /{' '}
                  {edition === 'core' ? 'Core' : 'Full'}
                </span>
                <Button
                  variant="light"
                  onClick={() => void copy()}
                  className="min-h-9 gap-2 px-3 text-xs"
                  aria-label={t('copy')}
                >
                  {copyState === 'copied' ? <Check /> : <Copy />}
                  {t(copyState === 'copied' ? 'copied' : 'copy')}
                </Button>
              </div>
              <pre className="overflow-x-auto p-7 text-sm leading-loose break-all whitespace-pre-wrap select-all">
                <code>{command}</code>
              </pre>
            </div>
            <p className="mt-3 min-h-5 text-sm text-primary" role="status">
              {copyState === 'failed'
                ? t('copyFailed')
                : copyState === 'copied'
                  ? t('copied')
                  : ''}
            </p>
            {platform === 'macos' && (
              <p className="mt-4 rounded-2xl bg-cloud p-5 text-sm leading-relaxed text-muted-foreground">
                {t('macNote')}
              </p>
            )}
            <section
              className="mt-10 rounded-3xl border border-border p-6 md:p-8"
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
              <pre className="mt-5 max-h-64 overflow-auto rounded-2xl bg-muted p-5 text-xs leading-relaxed whitespace-pre-wrap select-all">
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
            <div className="mt-10">
              <h2 className="text-2xl font-medium tracking-tight">
                {t('afterInstall')}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t('afterInstallBody', { address })}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t('publicNote')}
              </p>
              <Link
                to="/start"
                className="mt-7 inline-flex items-center gap-3 font-medium"
              >
                {t('start')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <aside className="h-fit rounded-3xl border border-border p-7 md:p-9">
            <h2 className="text-2xl font-medium tracking-tight">
              {t('requirements')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('resourceNote')}
            </p>
            <div className="mt-8 space-y-6">
              {[
                { Icon: Cpu, core: '4+ vCPU', full: '8+ vCPU' },
                { Icon: MemoryStick, core: '8+ GiB RAM', full: '10+ GiB RAM' },
                { Icon: HardDrive, core: '60+ GiB SSD', full: '120+ GiB SSD' },
              ].map(({ Icon, core, full }) => (
                <div key={core} className="flex items-center gap-4">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <span className="text-lg">
                    {edition === 'core' ? core : full}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              {t('dockerNote')}
            </p>
            {edition === 'full' && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t('fullNote')}
              </p>
            )}
          </aside>
        </div>
      </section>
      <section className="bg-muted px-gutter py-section">
        <div className="mx-auto max-w-280">
          <h2 className="text-feature font-medium tracking-tight">
            {t('manage')}
          </h2>
          <div className="mt-9 grid gap-8 md:grid-cols-2">
            <pre className="overflow-x-auto rounded-3xl bg-white p-7 text-sm leading-loose">
              <code>
                {
                  'linksense status\nlinksense logs api\nlinksense doctor\nlinksense repair\nlinksense upgrade'
                }
              </code>
            </pre>
            <div className="flex flex-col justify-center">
              <p className="text-base leading-relaxed text-muted-foreground">
                {t('upgradeNote')}
              </p>
              <a
                className="mt-7 inline-flex items-center gap-3 text-sm font-medium"
                href="https://github.com/LingX-AI/linksense#readme"
              >
                {t('docs')}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
