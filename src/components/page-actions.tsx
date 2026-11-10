'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { getDocsUI } from '@/content/docs-ui'
import { getMessages } from '@/lib/i18n'
import { buttonVariants } from './ui/button'

export function PageActions({
  markdownUrl,
  lang,
}: {
  markdownUrl: string
  lang: string
}) {
  const docs = getDocsUI(lang)
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  async function copy() {
    try {
      const response = await fetch(markdownUrl)
      if (!response.ok) throw new Error('Markdown is unavailable')
      await navigator.clipboard.writeText(await response.text())
      setState('copied')
    } catch {
      setState('failed')
    }
  }
  return (
    <div className="mb-6 flex flex-row flex-wrap items-center gap-2 border-b pb-6">
      <button
        className={buttonVariants({ color: 'secondary', size: 'sm' })}
        onClick={() => void copy()}
      >
        {state === 'copied' ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {state === 'copied' ? getMessages(lang).copied : docs.copyMarkdown}
      </button>
      {state === 'failed' && (
        <a
          href={markdownUrl}
          className="text-xs text-fd-muted-foreground underline"
          role="status"
        >
          {docs.copyFailed}
        </a>
      )}
    </div>
  )
}
