import { createTokenizer as createJapaneseTokenizer } from '@orama/tokenizers/japanese'
import { createTokenizer as createMandarinTokenizer } from '@orama/tokenizers/mandarin'

const languages = {
  en: 'english',
  es: 'spanish',
  pt: 'portuguese',
  fr: 'french',
} as const

export function searchOptions(locale?: string) {
  if (locale === 'zh')
    return { components: { tokenizer: createMandarinTokenizer() } }
  if (locale === 'ja')
    return { components: { tokenizer: createJapaneseTokenizer() } }
  return {
    language: languages[locale as keyof typeof languages] ?? languages.en,
  }
}
