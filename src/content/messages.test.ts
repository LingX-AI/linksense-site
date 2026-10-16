import { describe, expect, it } from 'vitest'
import { createInstance } from 'i18next'
import { locales, messages, defaultLocale } from './messages'

describe('website translations', () => {
  it('uses English as the default and first language', () => {
    expect(defaultLocale).toBe('en-US')
    expect(locales[0]).toBe('en-US')
  })
  const keys = Object.keys(messages['zh-CN']).sort()
  it.each(locales)(
    'has complete text, matching interpolation and working fallback for %s',
    async (locale) => {
      const resource = messages[locale]
      expect(Object.keys(resource).sort()).toEqual(keys)
      for (const key of keys) {
        const typedKey = key as keyof typeof resource
        expect(resource[typedKey].trim(), typedKey).not.toBe('')
        expect(
          (resource[typedKey].match(/{{\w+}}/g) ?? []).sort(),
          typedKey,
        ).toEqual((messages['zh-CN'][typedKey].match(/{{\w+}}/g) ?? []).sort())
      }
      const i18n = createInstance()
      await i18n.init({
        resources: Object.fromEntries(
          locales.map((language) => [
            language,
            { translation: messages[language] },
          ]),
        ),
        lng: locale,
        fallbackLng: defaultLocale,
        interpolation: { escapeValue: false },
      })
      expect(
        i18n.t('afterInstallBody', { address: 'http://localhost:18081' }),
      ).toContain('http://localhost:18081')
      const agentPrompt = i18n.t('agentPrompt', {
        edition: 'Full',
        platform: 'macOS',
        docs: 'https://github.com/LingX-AI/linksense#readme',
        command:
          'curl -fsSL https://raw.githubusercontent.com/LingX-AI/linksense/main/install-full.sh | sh',
      })
      expect(agentPrompt).toContain('Full')
      expect(agentPrompt).toContain('macOS')
      expect(agentPrompt).toContain('install-full.sh | sh')
      expect(agentPrompt).not.toContain('{{')
      await i18n.changeLanguage('unsupported')
      expect(i18n.t('install')).toBe(messages['en-US'].install)
    },
  )
})
