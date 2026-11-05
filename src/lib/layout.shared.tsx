import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import type { LinkItemType } from 'fumadocs-ui/layouts/docs'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { docsI18n, homePath, i18n } from './i18n'
import { repository } from './product'

export const linkItems: LinkItemType[] = [
  {
    type: 'icon',
    url: repository,
    label: 'GitHub',
    text: 'GitHub',
    icon: <Github aria-hidden="true" className="size-5" />,
    external: true,
  },
]

export function baseOptions(lang: string, docs = false): BaseLayoutProps {
  return {
    i18n: docs ? docsI18n : i18n,
    themeSwitch: { mode: 'light-dark-system' },
    nav: {
      url: homePath(lang),
      title: (
        <>
          <Image
            alt=""
            src="/favicon.svg"
            width={20}
            height={20}
            className="size-5"
            priority
            unoptimized
          />
          <span className="font-medium in-[header]:text-[15px]">LinkSense</span>
        </>
      ),
    },
  }
}
