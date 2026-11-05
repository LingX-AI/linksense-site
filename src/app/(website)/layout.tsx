import type { ReactNode } from 'react'
import { SiteRoot } from '@/components/site-root'
import { WebsiteLayout } from '@/components/home-layout'
import { homeMetadata } from '@/lib/metadata'

export const metadata = homeMetadata('en')

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SiteRoot lang="en">
      <WebsiteLayout lang="en">{children}</WebsiteLayout>
    </SiteRoot>
  )
}
