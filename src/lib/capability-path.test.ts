import { expect, it } from 'vitest'
import { capabilityPath } from './capability-path'

it('connects the measured source and destination without extending above or below them', () => {
  expect(capabilityPath({ x: 40, y: 80 }, { x: 240, y: 160 })).toBe(
    'M40 80 C40 120 240 120 240 160',
  )
  expect(capabilityPath({ x: 240, y: 260 }, { x: 240, y: 320 })).toBe(
    'M240 260 C240 290 240 290 240 320',
  )
})
