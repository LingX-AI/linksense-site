export type ServiceSize = { heading: number; body: number }
export function serviceStack(
  sizes: ServiceSize[],
  progress: number[],
  gap: number,
) {
  let top = 0,
    naturalTop = 0
  const items = sizes.map((size, index) => {
    const value = Math.min(1, Math.max(0, progress[index] ?? 0))
    const result = {
      top,
      naturalTop,
      expanded: size.heading + size.body,
      body: size.body * value,
      progress: value,
    }
    top += size.heading + result.body + gap
    naturalTop += result.expanded + gap
    return result
  })
  return { items, height: Math.max(0, naturalTop - gap) }
}
