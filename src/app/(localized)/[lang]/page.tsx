import { HomePage } from '@/components/home-page'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  return <HomePage lang={(await params).lang} />
}
