import { source } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'
import { createTokenizer } from '@orama/tokenizers/mandarin'

const search = createFromSource(source, {
  localeMap: {
    en: { language: 'english' },
    zh: {
      components: { tokenizer: createTokenizer() },
      search: { threshold: 0, tolerance: 0 },
    },
  },
})

export const dynamic = 'force-static'
export const GET = search.staticGET
