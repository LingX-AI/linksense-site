import { describe, expect, it } from 'vitest'
import { installCommand, installSearchSchema } from './product'

describe('installation commands', () => {
  it.each([
    ['core', 'linux', 'install-core.sh | sudo sh'],
    ['full', 'linux', 'install-full.sh | sudo sh'],
    ['core', 'macos', 'install-core.sh | sh'],
    ['full', 'macos', 'install-full.sh | sh'],
  ] as const)(
    'uses the correct %s installer and privileges on %s',
    (edition, platform, ending) => {
      expect(installCommand(edition, platform)).toBe(
        `curl -fsSL https://raw.githubusercontent.com/LingX-AI/linksense/main/${ending}`,
      )
    },
  )
  it('rejects untrusted query values before constructing a shell command', () => {
    const parsed = installSearchSchema.parse({
      edition: 'full; echo unsafe',
      platform: ['macos'],
      extra: true,
    })
    expect(parsed).toEqual({ edition: 'core', platform: 'linux' })
    expect(
      installCommand(parsed.edition ?? 'core', parsed.platform ?? 'linux'),
    ).not.toContain('unsafe')
  })
  it('allows the clean route and preserves valid shared choices', () => {
    expect(installSearchSchema.parse({})).toEqual({})
    expect(
      installSearchSchema.parse({ edition: 'full', platform: 'macos' }),
    ).toEqual({ edition: 'full', platform: 'macos' })
  })
})
