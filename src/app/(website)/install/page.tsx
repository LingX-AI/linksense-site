import { Suspense } from 'react'
import { InstallPage } from '@/components/install-page'
import { pageMetadata } from '@/lib/metadata'
import { getMessages } from '@/lib/i18n'

export const metadata = pageMetadata(
  'en',
  'Self-host LinkSense',
  getMessages('en').installBody,
  '/install/',
)

export default function Page() {
  return (
    <Suspense>
      <InstallPage lang="en" />
    </Suspense>
  )
}
