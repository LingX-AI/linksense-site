type Point = { x: number; y: number }

export function capabilityPath(from: Point, to: Point): string {
  const middle = (from.y + to.y) / 2
  return `M${from.x} ${from.y} C${from.x} ${middle} ${to.x} ${middle} ${to.x} ${to.y}`
}
