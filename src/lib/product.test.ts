import { describe, expect, it } from 'vitest'
import { installGuideUrl, installSearchSchema } from './product'

describe('installation guide links', () => {
  it.each([
    ['zh-CN', 'core', 'linux', '/help/deploy/core/#linux'],
    ['en-US', 'full', 'macos', '/help/en-US/deploy/full/#macos'],
    ['ja-JP', 'core', 'macos', '/help/en-US/deploy/core/#macos'],
  ] as const)(
    'opens the %s guide for %s on %s',
    (locale, edition, platform, path) => {
      expect(installGuideUrl(locale, edition, platform)).toBe(path)
    },
  )
  it('falls back when a shared installation link has invalid choices', () => {
    const parsed = installSearchSchema.parse({
      edition: 'full; echo unsafe',
      platform: ['macos'],
      extra: true,
    })
    expect(parsed).toEqual({ edition: 'core', platform: 'linux' })
  })
  it('allows the clean route and preserves valid shared choices', () => {
    expect(installSearchSchema.parse({})).toEqual({})
    expect(
      installSearchSchema.parse({ edition: 'full', platform: 'macos' }),
    ).toEqual({ edition: 'full', platform: 'macos' })
  })
})
