import { Select } from '@base-ui/react/select'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { languageNames, locales } from '@/content/messages'
import { isLocale } from '@/i18n'

export function LanguageSelect() {
  const { t, i18n } = useTranslation()
  return (
    <Select.Root
      items={languageNames}
      value={i18n.language}
      onValueChange={(value) => {
        if (value && isLocale(value)) void i18n.changeLanguage(value)
      }}
    >
      <Select.Trigger
        aria-label={t('language')}
        className="group inline-flex h-10 max-w-40 items-center gap-2 rounded-full border border-transparent px-3 text-xs transition-colors outline-none hover:bg-muted focus-visible:border-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/10 data-popup-open:bg-muted"
      >
        <Globe2
          className="hidden size-3.5 text-muted-foreground sm:block"
          aria-hidden="true"
        />
        <Select.Value className="truncate" />
        <Select.Icon>
          <ChevronDown className="size-3 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          sideOffset={10}
          align="end"
          alignItemWithTrigger={false}
          className="z-80 outline-none"
        >
          <Select.Popup className="max-h-(--available-height) w-48 origin-(--transform-origin) overflow-y-auto rounded-2xl border border-border bg-background p-1.5 text-foreground shadow-xl shadow-black/10 transition-[opacity,transform] duration-200 data-ending-style:translate-y-1 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:translate-y-1 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
            <Select.List>
              {locales.map((locale) => (
                <Select.Item
                  key={locale}
                  value={locale}
                  className="relative flex min-h-10 cursor-pointer items-center justify-between gap-5 rounded-xl py-2 pr-3 pl-4 text-sm outline-none select-none data-highlighted:bg-muted data-selected:font-medium"
                >
                  <Select.ItemText>{languageNames[locale]}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-3.5" aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
