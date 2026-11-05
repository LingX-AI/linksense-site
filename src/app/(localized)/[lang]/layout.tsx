import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { SiteRoot } from '@/components/site-root'
import { WebsiteLayout } from '@/components/home-layout'
import { i18n } from '@/lib/i18n'
import { homeMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  return homeMetadata((await params).lang)
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!i18n.languages.includes(lang)) notFound()
  return (
    <SiteRoot lang={lang}>
      <WebsiteLayout lang={lang}>{children}</WebsiteLayout>
    </SiteRoot>
  )
}
