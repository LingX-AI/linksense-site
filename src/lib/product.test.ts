import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { docsUrl, installGuideUrl, installSearchSchema } from './product'

describe('documentation links', () => {
  it('keeps every language on the same domain under /doc/', () => {
    assert.equal(docsUrl('zh-CN'), '/doc/zh-CN/')
    assert.equal(docsUrl('en-US'), '/doc/')
    assert.equal(docsUrl(undefined), '/doc/')
    assert.equal(docsUrl('fr-FR', 'user-guide/'), '/doc/user-guide/')
  })
})

describe('installation guide links', () => {
  for (const [locale, edition, platform, path] of [
    ['zh-CN', 'core', 'linux', '/doc/zh-CN/deploy/core/#linux'],
    ['en-US', 'full', 'macos', '/doc/deploy/full/#macos'],
    ['ja-JP', 'core', 'macos', '/doc/deploy/core/#macos'],
  ] as const) {
    it(`opens the ${locale} guide for ${edition} on ${platform}`, () => {
      assert.equal(installGuideUrl(locale, edition, platform), path)
    })
  }
  it('falls back when a shared installation link has invalid choices', () => {
    assert.deepEqual(
      installSearchSchema.parse({
        edition: 'full; echo unsafe',
        platform: ['macos'],
        extra: true,
      }),
      { edition: 'core', platform: 'linux' },
    )
  })
  it('allows the clean route and preserves valid shared choices', () => {
    assert.deepEqual(installSearchSchema.parse({}), {})
    assert.deepEqual(
      installSearchSchema.parse({ edition: 'full', platform: 'macos' }),
      { edition: 'full', platform: 'macos' },
    )
  })
})
