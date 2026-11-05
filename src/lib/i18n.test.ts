import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  docsPath,
  formatMessage,
  getMessages,
  homeLocales,
  resolveDocRoute,
  docsI18n,
  withoutDocLocale,
} from './i18n'
import { dirname } from 'node:path'
import { loader } from 'fumadocs-core/source'
import { agentInstallUrl } from './product'
import { resolveSiteUrl } from './metadata'

describe('LinkSense content on New API routing', () => {
  for (const lang of ['zh', 'en']) {
    it(`resolves relative Markdown links inside the ${lang} content directory`, () => {
      const source = loader({
        baseUrl: '/doc',
        i18n: docsI18n,
        url: (slugs, language) =>
          docsPath(language ?? 'en', `${slugs.join('/')}/`),
        source: {
          files: ['zh', 'en'].flatMap((language) =>
            ['index.mdx', 'deploy/index.mdx'].map((path) => ({
              type: 'page' as const,
              path: `${language}/${path}`,
              data: { title: path },
            })),
          ),
        },
      })
      const page = source.getPage([], lang)
      assert(page)
      const target = source.getPageByHref('./deploy/index.mdx', {
        dir: dirname(withoutDocLocale(page.path)),
        language: page.locale,
      })
      assert.equal(
        target?.page.url,
        lang === 'zh' ? '/doc/zh-CN/deploy' : '/doc/deploy',
      )
    })
  }
  it('keeps both documentation languages under /doc/', () => {
    assert.equal(docsI18n.defaultLanguage, 'en')
    assert.deepEqual(resolveDocRoute([]), { lang: 'en', slugs: [] })
    assert.deepEqual(resolveDocRoute(['deploy', 'core']), {
      lang: 'en',
      slugs: ['deploy', 'core'],
    })
    assert.deepEqual(resolveDocRoute(['zh-CN', 'deploy', 'core']), {
      lang: 'zh',
      slugs: ['deploy', 'core'],
    })
    assert.deepEqual(resolveDocRoute(['en-US', 'deploy', 'core']), {
      lang: 'en',
      slugs: ['deploy', 'core'],
    })
    assert.equal(docsPath('zh', 'deploy/core/'), '/doc/zh-CN/deploy/core/')
    assert.equal(docsPath('fr', 'deploy/core/'), '/doc/deploy/core/')
  })
  for (const lang of Object.keys(homeLocales)) {
    it(`preserves complete content and installation prompts for ${lang}`, () => {
      assert.deepEqual(
        Object.keys(getMessages(lang)).sort(),
        Object.keys(getMessages('en')).sort(),
      )
      const prompt = formatMessage(lang, 'agentPrompt', {
        edition: 'Full',
        platform: 'macOS',
        docs: agentInstallUrl,
      })
      for (const value of ['Full', 'macOS', agentInstallUrl])
        assert.ok(prompt.includes(value))
      assert.ok(!prompt.includes('{{'))
    })
  }
  it('rejects canonical origins with credentials or paths', () => {
    assert.equal(
      resolveSiteUrl('https://linksense.example/').origin,
      'https://linksense.example',
    )
    assert.throws(() => resolveSiteUrl('https://example.test/doc/'))
    assert.throws(() => resolveSiteUrl('https://user@example.test/'))
  })
})
