import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  FileText,
  KeyRound,
  MessageSquareText,
  Settings2,
} from 'lucide-react'
import { PageIntro, Pill } from './shell'
import { docsUrl } from '@/lib/product'

export function StartPage() {
  const { t } = useTranslation()
  const steps = [
    { title: 'step1', body: 'step1body', Icon: KeyRound },
    { title: 'step2', body: 'step2body', Icon: Settings2 },
    { title: 'step3', body: 'step3body', Icon: MessageSquareText },
    { title: 'step4', body: 'step4body', Icon: FileText },
  ]
  return (
    <>
      <PageIntro title={t('startTitle')}>
        <p>{t('startBody')}</p>
      </PageIntro>
      <section className="px-gutter pb-section">
        <div className="mx-auto max-w-280">
          <ol className="relative before:pointer-events-none before:absolute before:top-10 before:bottom-10 before:left-5 before:w-px before:bg-border md:before:left-6">
            {steps.map(({ title, body, Icon }, index) => (
              <li
                key={title}
                className="relative grid gap-x-6 gap-y-4 py-8 pl-16 md:grid-cols-[1fr_1.2fr] md:gap-x-12 md:py-10 md:pl-24"
              >
                <span className="absolute top-8 left-0 flex size-10 items-center justify-center rounded-full border border-primary/20 bg-background text-xs font-medium text-primary tabular-nums md:top-10 md:size-12">
                  0{index + 1}
                </span>
                <h2 className="flex items-start gap-4 text-2xl font-medium tracking-tight">
                  {t(title)}
                </h2>
                <div className="max-w-140 border-b border-border pb-8">
                  <Icon
                    className="mb-4 size-6 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {t(body)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-background">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-muted px-6 py-4 md:px-8">
              <img
                src="/linksense-logo.svg"
                alt="LinkSense"
                width="100"
                height="26"
                className="h-5 w-auto"
              />
              <p className="text-xs text-muted-foreground">{t('input')}</p>
            </div>
            <div className="p-6 md:p-10">
              <blockquote className="max-w-210 text-2xl leading-relaxed font-medium tracking-tight">
                {t('prompt')}
              </blockquote>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-8">
            <Pill href={docsUrl}>{t('nextDocs')}</Pill>
            <a
              href={`${docsUrl}/admin-guide/model-settings.md`}
              className="inline-flex items-center gap-3 text-sm"
            >
              {t('step2')}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
