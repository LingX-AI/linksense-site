// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { CapabilityMap } from './capability-map'
import { messages } from '@/content/messages'

vi.mock('motion/react', () => ({ useInView: () => true }))
vi.mock('@/lib/animation', () => ({
  gsap: {
    timeline: () => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      play: vi.fn().mockReturnThis(),
      pause: vi.fn().mockReturnThis(),
      revert: vi.fn(),
    }),
  },
}))

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('cycles all three capabilities automatically and stops while paused, hidden or unmounted', async () => {
  const i18n = createInstance()
  await i18n.init({
    lng: 'en-US',
    resources: { 'en-US': { translation: messages['en-US'] } },
  })
  vi.useFakeTimers()
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )
  const screen = render(
    <I18nextProvider i18n={i18n}>
      <CapabilityMap />
    </I18nextProvider>,
  )
  const selected = () =>
    screen.container.querySelector('[data-map-source][data-current="true"]')
      ?.textContent
  expect(selected()).toBe('Knowledge')
  for (const label of ['Skill', 'MCP', 'Knowledge']) {
    act(() => vi.advanceTimersByTime(4000))
    expect(selected()).toBe(label)
  }
  fireEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
  act(() => vi.advanceTimersByTime(8000))
  expect(selected()).toBe('Knowledge')
  fireEvent.click(screen.getByRole('button', { name: 'Play animation' }))
  act(() => vi.advanceTimersByTime(4000))
  expect(selected()).toBe('Skill')
  act(() => {
    hidden.mockReturnValue(true)
    document.dispatchEvent(new Event('visibilitychange'))
    vi.advanceTimersByTime(8000)
  })
  expect(selected()).toBe('Skill')
  act(() => {
    hidden.mockReturnValue(false)
    document.dispatchEvent(new Event('visibilitychange'))
    vi.advanceTimersByTime(4000)
  })
  expect(selected()).toBe('MCP')
  expect(screen.container.querySelectorAll('[data-map-flow]')).toHaveLength(3)
  screen.unmount()
  expect(vi.getTimerCount()).toBe(0)
})
