import { describe, expect, it } from 'vitest'
import { serviceStack } from './motion-geometry'
describe('stable service geometry', () => {
  it('keeps scroll anchors fixed as multiple cards expand and reverse without overlap', () => {
    const sizes = [
      { heading: 100, body: 200 },
      { heading: 100, body: 250 },
      { heading: 120, body: 180 },
    ]
    const natural = serviceStack(sizes, [1, 1, 1], 16)
    for (const progress of [
      [1, 0, 0],
      [1, 0.5, 0],
      [1, 1, 0.5],
      [1, 0.2, 0],
    ]) {
      const layout = serviceStack(sizes, progress, 16)
      expect(layout.height).toBe(natural.height)
      expect(layout.items.map((item) => item.naturalTop)).toEqual(
        natural.items.map((item) => item.naturalTop),
      )
      layout.items
        .slice(1)
        .forEach((item, index) =>
          expect(item.top).toBe(
            layout.items[index].top +
              sizes[index].heading +
              layout.items[index].body +
              16,
          ),
        )
    }
  })
})
