'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { buttonVariants } from './ui/button'

export function PageActions({
  markdownUrl,
  lang,
}: {
  markdownUrl: string
  lang: string
}) {
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
        {lang === 'zh'
          ? state === 'copied'
            ? '已复制'
            : '复制 Markdown'
          : state === 'copied'
            ? 'Copied'
            : 'Copy Markdown'}
      </button>
      {state === 'failed' && (
        <a
          href={markdownUrl}
          className="text-xs text-fd-muted-foreground underline"
          role="status"
        >
          {lang === 'zh'
            ? '自动复制失败，打开原文手动复制'
            : 'Copy unavailable. Open the source to copy it.'}
        </a>
      )}
    </div>
  )
}
