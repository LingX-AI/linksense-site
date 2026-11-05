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
import { createTokenizer } from '@orama/tokenizers/mandarin'

function initOrama(locale?: string) {
  return locale === 'zh'
    ? create({
        schema: { _: 'string' },
        components: { tokenizer: createTokenizer() },
      })
    : create({ schema: { _: 'string' }, language: 'english' })
}

export default function LocalSearchDialog(props: SharedProps) {
  const { locale, text } = useI18n()
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from: '/api/search',
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
            aria-label={locale === 'zh' ? '关闭搜索' : 'Close search'}
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
