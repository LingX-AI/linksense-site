// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { useReducedMotion } from './use-reduced-motion'

it('responds to preference changes in both directions and releases its listener', () => {
  let reduced = false
  const listeners = new Set<() => void>()
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return reduced
    },
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
  }))
  try {
    const { result, unmount } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => {
      reduced = true
      listeners.forEach((listener) => listener())
    })
    expect(result.current).toBe(true)
    act(() => {
      reduced = false
      listeners.forEach((listener) => listener())
    })
    expect(result.current).toBe(false)
    unmount()
    expect(listeners.size).toBe(0)
  } finally {
    vi.unstubAllGlobals()
  }
})
