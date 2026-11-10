'use client'

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search'
import { useDocsSearch } from 'fumadocs-core/search/client'
import { useI18n } from 'fumadocs-ui/contexts/i18n'
import { create } from '@orama/orama'
import { getDocsUI } from '@/content/docs-ui'
import { searchOptions } from '@/lib/search-i18n'

function initOrama(locale?: string) {
  return create({ schema: { _: 'string' }, ...searchOptions(locale) })
}

export default function LocalSearchDialog(props: SharedProps) {
  const { locale, text } = useI18n()
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from: `/api/search-index/${locale ?? 'en'}`,
    locale,
    initOrama,
  })
  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput aria-label={text.search} />
          <SearchDialogClose
            aria-label={getDocsUI(locale ?? 'en').closeSearch}
          />
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data === 'empty' ? null : (query.data ?? [])}
        />
      </SearchDialogContent>
      <SearchDialogFooter />
    </SearchDialog>
  )
}
