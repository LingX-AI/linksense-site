import { Suspense } from 'react'
import { InstallPage } from '@/components/install-page'
import { getMessages, installPath } from '@/lib/i18n'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = getMessages(lang)
  return pageMetadata(
    lang,
    `${t.install} | LinkSense`,
    t.installBody,
    installPath(lang),
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return (
    <Suspense>
      <InstallPage lang={lang} />
    </Suspense>
  )
}
