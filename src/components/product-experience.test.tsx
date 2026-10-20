// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, within } from '@testing-library/react'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { CapabilityMap } from './capability-map'
import { WorkflowDemo } from './workflow-demo'
import { messages } from '@/content/messages'

vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (media: string) => ({
      matches: false,
      media,
      addListener() {},
      removeListener() {},
    }),
  })
})

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  )
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
  }))
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})
afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

async function translations() {
  const i18n = createInstance()
  await i18n.init({
    lng: 'en-US',
    resources: { 'en-US': { translation: messages['en-US'] } },
  })
  return i18n
}

it('updates the selected capability, its connection and its accessible explanation', async () => {
  const screen = render(
    <I18nextProvider i18n={await translations()}>
      <CapabilityMap />
    </I18nextProvider>,
  )
  const knowledge = screen.getByRole('button', {
    name: 'Knowledge',
  })
  const skill = screen.getByRole('button', { name: 'Skill' })
  expect(knowledge.getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(skill)
  expect(skill.getAttribute('aria-pressed')).toBe('true')
  expect(knowledge.getAttribute('aria-pressed')).toBe('false')
  const description = document.getElementById(
    skill.getAttribute('aria-controls')!,
  )
  expect(description?.querySelector('[aria-hidden="false"]')?.textContent).toBe(
    messages['en-US'].mapSkillBody,
  )
  fireEvent.click(screen.getByRole('button', { name: 'MCP' }))
  expect(description?.querySelector('[aria-hidden="false"]')?.textContent).toBe(
    messages['en-US'].mapToolsBody,
  )
  expect(screen.container.querySelectorAll('path.stroke-primary')).toHaveLength(
    2,
  )
})

it('keeps workflow steps independent and shows the latest step after rapid selection', async () => {
  const screen = render(
    <I18nextProvider i18n={await translations()}>
      <WorkflowDemo kind="work" />
      <WorkflowDemo kind="knowledge" />
      <WorkflowDemo kind="apps" />
    </I18nextProvider>,
  )
  const work = within(
    screen.container.querySelector('[data-workflow="work"]')! as HTMLElement,
  )
  const knowledge = within(
    screen.container.querySelector(
      '[data-workflow="knowledge"]',
    )! as HTMLElement,
  )
  const apps = within(
    screen.container.querySelector('[data-workflow="apps"]')! as HTMLElement,
  )
  fireEvent.click(work.getByRole('button', { name: /Refine/ }))
  expect(work.getByText(messages['en-US'].tourRefine)).toBeTruthy()
  fireEvent.click(work.getByRole('button', { name: /Request/ }))
  fireEvent.click(work.getByRole('button', { name: /Review/ }))
  expect(work.getByText('Analysis.xlsx')).toBeTruthy()
  expect(knowledge.getByText(messages['en-US'].tourQuestion)).toBeTruthy()
  fireEvent.click(knowledge.getByRole('button', { name: /Open source/ }))
  expect(knowledge.getByText(messages['en-US'].tourExcerpt)).toBeTruthy()
  fireEvent.click(apps.getByRole('button', { name: /Share/ }))
  expect(apps.getByText(messages['en-US'].tourPrivate)).toBeTruthy()
  expect(screen.getAllByText(messages['en-US'].sample)).toHaveLength(3)
})
