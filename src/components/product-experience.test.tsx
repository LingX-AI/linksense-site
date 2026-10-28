// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, within } from '@testing-library/react'
import { createInstance } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { CapabilityMap } from './capability-map'
import { WorkflowDemo } from './workflow-demo'
import { Services } from './services'
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
  vi.stubGlobal('scrollTo', vi.fn())
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

it('lets each connected capability show its explanation while all connections stay active', async () => {
  const screen = render(
    <I18nextProvider i18n={await translations()}>
      <CapabilityMap />
    </I18nextProvider>,
  )
  const knowledge = screen.getByRole('button', {
    name: 'Knowledge',
  })
  const skill = screen.getByRole('button', { name: 'Skill' })
  expect(knowledge.getAttribute('data-current')).toBe('true')
  fireEvent.click(skill)
  expect(skill.getAttribute('data-current')).toBe('true')
  expect(knowledge.getAttribute('data-current')).toBe('false')
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
    4,
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

it('keeps product disclosures and workflow steps usable with reduced motion', async () => {
  const router = createRouter({
    routeTree: createRootRoute({ component: Services }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  const screen = render(
    <I18nextProvider i18n={await translations()}>
      <RouterProvider router={router} />
    </I18nextProvider>,
  )
  await screen.findByRole('heading', {
    name: messages['en-US'].workTitle,
  })
  const articles = screen.container.querySelectorAll('[data-service]')
  expect(articles).toHaveLength(3)
  const knowledge = within(articles[1] as HTMLElement)
  const toggle = knowledge.getByRole('button', {
    name: messages['en-US'].knowledgeTitle,
  })
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(toggle)
  expect(toggle.getAttribute('aria-expanded')).toBe('true')
  expect(articles[1].querySelector('[inert]')).toBeNull()
  expect(knowledge.getByRole('link').getAttribute('href')).toBe('/install')
  fireEvent.click(knowledge.getByRole('button', { name: /Open source/ }))
  expect(knowledge.getByText(messages['en-US'].tourExcerpt)).toBeTruthy()
  fireEvent.click(toggle)
  expect(toggle.getAttribute('aria-expanded')).toBe('false')
  expect(
    articles[1].querySelector('[data-service-body]')?.hasAttribute('inert'),
  ).toBe(true)
})
