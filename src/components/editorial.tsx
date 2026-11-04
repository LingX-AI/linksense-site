import { useTranslation } from 'react-i18next'
import { repository } from '@/lib/product'

export function Integrations() {
  const { t } = useTranslation()
  return (
    <div className="integration-logos mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
      {[
        { name: 'Google Docs', image: 'google-docs.png' },
        { name: 'Gmail', image: 'gmail.png' },
        { name: 'Outlook', image: 'outlook.svg' },
        { name: 'OneDrive', image: 'onedrive.svg' },
        { name: 'SharePoint', image: 'sharepoint.svg' },
      ].map(({ name, image }) => (
        <a
          key={name}
          data-batch
          data-cursor-stick
          href={`${repository}/blob/main/docs/${name === 'OneDrive' || name === 'SharePoint' ? 'microsoft-connections' : 'workspace-connections'}.md`}
          className="group relative flex min-h-28 flex-col items-center justify-center gap-4 transition-opacity duration-500"
        >
          <img
            src={`/connectors/${image}`}
            width="48"
            height="48"
            alt=""
            className="size-12 object-contain"
            loading="lazy"
          />
          <span className="text-sm font-medium">{name}</span>
          <span
            aria-hidden="true"
            className="absolute -bottom-4 rounded-full bg-foreground px-3 py-1.5 text-xs text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {t('docs')}
          </span>
        </a>
      ))}
    </div>
  )
}
