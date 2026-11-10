import { notFound } from 'next/navigation'
import { docsI18n } from '@/lib/i18n'
import { createSearch } from '@/lib/search-server'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return docsI18n.languages.map((lang) => ({ lang }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params
  if (!docsI18n.languages.includes(lang)) notFound()
  return createSearch([lang]).staticGET()
}
