'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Copy, ArrowUpRight } from 'lucide-react'
import {
  agentInstallUrl,
  installGuideUrl,
  installSearchSchema,
  manualInstallCommand,
} from '@/lib/product'
import { docsPath, formatMessage, getMessages } from '@/lib/i18n'
import { buttonVariants } from './ui/button'
import { Segmented } from './ui/segmented'

export function InstallPage({ lang }: { lang: string }) {
  const t = getMessages(lang)
  const search = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { edition = 'core', platform = 'linux' } = installSearchSchema.parse(
    Object.fromEntries(search),
  )
  const [copyState, setCopyState] = useState<{
    target: 'agent' | 'manual'
    status: 'copied' | 'failed'
  } | null>(null)
  const prompt = formatMessage(lang, 'agentPrompt', {
    edition: edition === 'core' ? 'Core' : 'Full',
    platform: platform === 'linux' ? 'Linux' : 'macOS',
    docs: agentInstallUrl,
  })
  const manualCommand = manualInstallCommand(edition, platform)

  function change(key: 'edition' | 'platform', value: string) {
    const next = installSearchSchema.parse({ edition, platform, [key]: value })
    router.replace(
      `${pathname}?${new URLSearchParams({ edition: next.edition ?? 'core', platform: next.platform ?? 'linux' })}`,
      { scroll: false },
    )
    setCopyState(null)
  }

  async function copy(text: string, target: 'agent' | 'manual') {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState({ target, status: 'copied' })
    } catch {
      setCopyState({ target, status: 'failed' })
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-medium tracking-tight whitespace-pre-line sm:text-5xl">
        {t.installTitle}
      </h1>
      <p className="mt-6 max-w-2xl leading-7 text-fd-muted-foreground">
        {t.installBody}
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-fd-card p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Segmented
              label={t.edition}
              value={edition}
              onChange={(value) => change('edition', value)}
              options={[
                { value: 'core', label: 'Core' },
                { value: 'full', label: 'Full' },
              ]}
            />
            <Segmented
              label={t.platform}
              value={platform}
              onChange={(value) => change('platform', value)}
              options={[
                { value: 'linux', label: 'Linux' },
                { value: 'macos', label: 'macOS' },
              ]}
            />
          </div>
          <p className="mt-6 text-sm leading-7 text-fd-muted-foreground">
            {t[edition === 'full' ? 'fullBody' : 'coreBody']}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={installGuideUrl(
                lang === 'zh' ? 'zh-CN' : 'en-US',
                edition,
                platform,
              )}
              className={buttonVariants({ color: 'primary' })}
            >
              {t.installGuide}
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
            <Link
              href={docsPath(lang, 'deploy/operations/')}
              className={buttonVariants({ color: 'outline' })}
            >
              {t.manage}
            </Link>
          </div>
        </section>
        <section
          className="rounded-2xl border bg-fd-card p-6"
          aria-labelledby="agent-install-title"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="agent-install-title" className="text-xl font-semibold">
              {t.agentTitle}
            </h2>
            <button
              type="button"
              className={buttonVariants({ color: 'secondary', size: 'sm' })}
              onClick={() => void copy(prompt, 'agent')}
            >
              {copyState?.target === 'agent' &&
              copyState.status === 'copied' ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {copyState?.target === 'agent' && copyState.status === 'copied'
                ? t.copied
                : t.agentCopy}
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
            {t.agentBody}
          </p>
          <pre className="mt-5 max-h-72 overflow-auto rounded-xl border bg-fd-background p-5 text-xs leading-6 whitespace-pre-wrap select-all">
            <code>{prompt}</code>
          </pre>
          <p className="mt-3 text-sm text-fd-muted-foreground" role="status">
            {copyState?.target === 'agent' && copyState.status === 'failed'
              ? t.copyFailed
              : copyState?.target === 'agent' && copyState.status === 'copied'
                ? t.copied
                : ''}
          </p>
        </section>
      </div>
      <section
        className="mt-6 rounded-2xl border bg-fd-card p-6"
        aria-labelledby="manual-install-title"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="manual-install-title" className="text-xl font-semibold">
            {t.manualTitle}
          </h2>
          <button
            type="button"
            className={buttonVariants({ color: 'secondary', size: 'sm' })}
            onClick={() => void copy(manualCommand, 'manual')}
          >
            {copyState?.target === 'manual' && copyState.status === 'copied' ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
            {copyState?.target === 'manual' && copyState.status === 'copied'
              ? t.copied
              : t.copy}
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
          {t.dockerNote}
        </p>
        <pre className="mt-5 overflow-auto rounded-xl border bg-fd-background p-5 text-xs leading-6 whitespace-pre-wrap select-all">
          <code>{manualCommand}</code>
        </pre>
        <p className="mt-3 text-sm text-fd-muted-foreground" role="status">
          {copyState?.target === 'manual' && copyState.status === 'failed'
            ? t.copyFailed
            : copyState?.target === 'manual' && copyState.status === 'copied'
              ? t.copied
              : ''}
        </p>
      </section>
    </div>
  )
}
