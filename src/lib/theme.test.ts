import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'
import { buttonVariants } from './button-variants'

const stylesheet = readFileSync(
  new URL('../styles.css', import.meta.url),
  'utf8',
)

function color(name: string) {
  const hex = stylesheet.match(
    new RegExp(`--color-${name}: (#[\\da-f]{6});`),
  )?.[1]
  expect(hex, `Missing theme color: ${name}`).toBeDefined()
  return hex!
}

function luminance(hex: string) {
  const [red, green, blue] = hex
    .slice(1)
    .match(/../g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )
  return red * 0.2126 + green * 0.7152 + blue * 0.0722
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => a - b,
  )
  return (values[1] + 0.05) / (values[0] + 0.05)
}

it.each(['background', 'muted', 'cloud', 'sage', 'sand'])(
  'keeps ordinary muted text readable on %s surfaces',
  (surface) => {
    expect(
      contrast(color('muted-foreground'), color(surface)),
    ).toBeGreaterThanOrEqual(4.5)
  },
)

it('keeps button text readable before and during hover', () => {
  const classes = buttonVariants().split(' ')
  expect(classes).toContain('hover:bg-foreground')
  expect(classes).not.toContain('hover:bg-primary/85')
  for (const surface of ['primary', 'foreground']) {
    expect(contrast('#ffffff', color(surface))).toBeGreaterThanOrEqual(4.5)
  }
})
