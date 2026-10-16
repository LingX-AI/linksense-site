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
          <ol>
            {steps.map(({ title, body, Icon }, index) => (
              <li
                key={title}
                className="grid gap-6 border-t border-border py-10 md:grid-cols-[6rem_1fr_1.2fr]"
              >
                <span className="text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <h2 className="flex items-start gap-4 text-2xl font-medium tracking-tight">
                  <Icon
                    className="mt-1 size-6 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {t(title)}
                </h2>
                <p className="max-w-140 text-base leading-relaxed text-muted-foreground">
                  {t(body)}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-7 rounded-3xl bg-cloud p-8 md:p-12">
            <p className="mb-5 text-sm text-muted-foreground">{t('input')}</p>
            <blockquote className="max-w-210 text-2xl leading-relaxed font-medium tracking-tight">
              {t('prompt')}
            </blockquote>
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
