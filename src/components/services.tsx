import { useContext, useId, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { gsap, ScrollTrigger } from '@/lib/animation'
import { serviceStack, type ServiceSize } from '@/lib/motion-geometry'
import { EntryContext } from '@/lib/transition-context'
import { WorkflowDemo } from './workflow-demo'

const services = [
  {
    title: 'workTitle',
    body: 'workBody',
    to: '/start',
    kind: 'work',
  },
  {
    title: 'knowledgeTitle',
    body: 'knowledgeBody',
    to: '/install',
    kind: 'knowledge',
  },
  {
    title: 'appsTitle',
    body: 'appsBody',
    to: '/start',
    kind: 'apps',
  },
] as const

export function Services() {
  const list = useRef<HTMLDivElement>(null)
  const ready = useContext(EntryContext)
  const { t, i18n } = useTranslation()
  const id = useId()
  useLayoutEffect(() => {
    const root = list.current
    if (!root || !ready) return
    const media = gsap.matchMedia()
    media.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const cards = [...root.querySelectorAll<HTMLElement>('[data-service]')]
        const headings = cards.map((card) =>
          card.querySelector<HTMLElement>('[data-service-heading]')!,
        )
        const bodies = cards.map((card) =>
          card.querySelector<HTMLElement>('[data-service-body]')!,
        )
        const contents = bodies.map(
          (body) => body.firstElementChild as HTMLElement,
        )
        const buttons = cards.map((card) =>
          card.querySelector<HTMLButtonElement>('[data-service-toggle]')!,
        )
        const artworks = cards.map((card) =>
          card.querySelector<HTMLElement>('[data-service-art]')!,
        )
        const desktop =
          context.conditions?.desktop && !context.conditions?.reduced
        const progress = cards.map((_, index) => ({
          value: index === 0 ? 1 : 0,
        }))
        let sizes: ServiceSize[] = []
        let disposed = false,
          frame = 0,
          signature = ''
        function setAccessible(index: number, expanded: boolean) {
          buttons[index].setAttribute('aria-expanded', String(expanded))
          bodies[index].setAttribute('aria-hidden', String(!expanded))
          bodies[index].toggleAttribute('inert', !expanded)
        }
        function render() {
          const layout = serviceStack(
            sizes,
            progress.map((item) => item.value),
            16,
          )
          layout.items.forEach((item, index) => {
            gsap.set(cards[index], {
              y: item.top,
              backgroundColor: gsap.utils.interpolate(
                '#f3f4f6',
                '#171b24',
                item.progress,
              ),
              color: item.progress < 0.57 ? '#000000' : '#ffffff',
            })
            gsap.set(bodies[index], {
              height: item.body,
              opacity: Math.max(0, (item.progress - 0.5) * 2),
            })
            gsap.set(cards[index].querySelector('[data-service-visual]'), {
              y: (1 - item.progress) * 24,
            })
            gsap.set(artworks[index], { opacity: item.progress })
            setAccessible(index, item.progress > 0.95)
          })
        }
        function measure() {
          sizes = cards.map((card, index) => {
            const css = getComputedStyle(card)
            return {
              heading:
                headings[index].offsetHeight +
                parseFloat(css.paddingTop) +
                parseFloat(css.paddingBottom),
              body: contents[index].offsetHeight,
            }
          })
          gsap.set(root, { height: serviceStack(sizes, [], 16).height })
          render()
        }
        if (desktop) {
          gsap.set(root, { position: 'relative' })
          gsap.set(cards, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            margin: 0,
          })
          gsap.set(buttons, { display: 'none' })
          measure()
          cards.forEach((_, index) => {
            if (index === 0) return
            gsap.to(progress[index], {
              value: 1,
              ease: 'none',
              onUpdate: render,
              scrollTrigger: {
                trigger: root,
                start: () =>
                  root.getBoundingClientRect().top +
                  window.scrollY +
                  serviceStack(sizes, [], 16).items[index].naturalTop -
                  window.innerHeight * 0.76,
                end: () =>
                  root.getBoundingClientRect().top +
                  window.scrollY +
                  serviceStack(sizes, [], 16).items[index].naturalTop +
                  sizes[index].body -
                  window.innerHeight * 0.56,
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
          })
          const observer = new ResizeObserver(() => {
            const next = `${root.clientWidth}:${contents.map((content) => content.offsetHeight).join(',')}:${headings.map((heading) => heading.offsetHeight).join(',')}`
            if (next === signature) return
            signature = next
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(() => {
              if (!disposed) {
                measure()
                ScrollTrigger.refresh()
              }
            })
          })
          observer.observe(root)
          contents.forEach((content) => observer.observe(content))
          void document.fonts.ready.then(() => {
            if (!disposed) {
              measure()
              ScrollTrigger.refresh()
            }
          })
          return () => {
            disposed = true
            cancelAnimationFrame(frame)
            observer.disconnect()
          }
        }
        const listeners = buttons.map((button, index) => {
          const expanded = index === 0
          setAccessible(index, expanded)
          gsap.set(cards[index], {
            backgroundColor: expanded ? '#171b24' : '#f3f4f6',
            color: expanded ? '#ffffff' : '#151619',
          })
          gsap.set(bodies[index], {
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          })
          gsap.set(artworks[index], { opacity: expanded ? 1 : 0 })
          const toggle = () => {
            const open = button.getAttribute('aria-expanded') !== 'true'
            setAccessible(index, open)
            gsap.to(cards[index], {
              backgroundColor: open ? '#171b24' : '#f3f4f6',
              color: open ? '#ffffff' : '#151619',
              duration: context.conditions?.reduced ? 0 : 0.4,
              overwrite: true,
            })
            gsap.to(artworks[index], {
              opacity: open ? 1 : 0,
              duration: context.conditions?.reduced ? 0 : 0.4,
              overwrite: true,
            })
            gsap.to(bodies[index], {
              height: open ? contents[index].offsetHeight : 0,
              opacity: open ? 1 : 0,
              duration: context.conditions?.reduced ? 0 : 0.5,
              ease: 'power3.out',
              overwrite: true,
              onComplete: () => {
                if (open) gsap.set(bodies[index], { height: 'auto' })
                ScrollTrigger.refresh()
              },
            })
          }
          button.addEventListener('click', toggle)
          return () => button.removeEventListener('click', toggle)
        })
        return () => {
          listeners.forEach((remove) => remove())
          gsap.killTweensOf([...cards, ...bodies, ...artworks])
        }
      },
      root,
    )
    return () => media.revert()
  }, [ready, i18n.language])
  return (
    <div ref={list} data-testid="services" className="space-y-4">
      {services.map(({ title, body, to, kind }, index) => (
        <article
          key={title}
          data-service
          className="relative isolate overflow-hidden rounded-3xl bg-ink p-6 text-white md:p-11 lg:p-12"
        >
          <div
            data-service-art
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <svg
              viewBox="0 0 640 640"
              fill="none"
              className="absolute -top-1/4 -right-1/4 h-full min-h-120 w-full text-white md:right-0 md:w-3/5"
            >
              {kind === 'work'
                ? [0, 1, 2, 3, 4].map((plane) => (
                    <path
                      key={plane}
                      d={`M${120 + plane * 80} -120 L${-120 + plane * 80} 760 H${-45 + plane * 80} L${195 + plane * 80} -120 Z`}
                      fill="currentColor"
                      fillOpacity="0.025"
                      stroke="currentColor"
                      strokeOpacity="0.06"
                    />
                  ))
                : kind === 'knowledge'
                  ? [250, 190, 130, 70].map((radius) => (
                      <circle
                        key={radius}
                        cx="360"
                        cy="310"
                        r={radius}
                        fill="currentColor"
                        fillOpacity="0.025"
                        stroke="currentColor"
                        strokeOpacity="0.06"
                      />
                    ))
                  : [0, 1, 2, 3].map((plane) => (
                      <path
                        key={plane}
                        d={`M360 ${60 + plane * 68} L${80 + plane * 34} 580 H${640 - plane * 34} Z`}
                        fill="currentColor"
                        fillOpacity="0.025"
                        stroke="currentColor"
                        strokeOpacity="0.06"
                      />
                    ))}
            </svg>
          </div>
          <div
            data-service-heading
            className="relative flex items-start justify-between gap-6"
          >
            <h3 className="max-w-3/4 text-service leading-tight font-normal tracking-tight md:max-w-1/2">
              {t(title)}
            </h3>
            <span
              aria-hidden="true"
              className="ml-auto pt-1 text-sm tabular-nums opacity-45 md:text-base"
            >
              0{index + 1}
            </span>
            <button
              type="button"
              data-service-toggle
              className="group -mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-current/20 transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              aria-label={t(title)}
              aria-expanded={index === 0}
              aria-controls={`${id}-${index}`}
            >
              <Plus
                className="size-5 transition-transform duration-500 ease-out-expo group-aria-expanded:rotate-45 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </button>
          </div>
          <div data-service-body id={`${id}-${index}`}>
            <div className="grid items-start gap-8 pt-5 md:grid-cols-2 md:gap-12 lg:gap-20">
              <div className="flex flex-col items-start gap-7 md:pr-4">
                <p className="max-w-110 text-base leading-relaxed text-white/75 lg:text-lg">
                  {t(body)}
                </p>
                <Link
                  to={to}
                  className="group inline-flex min-h-11 items-center gap-3 text-sm text-white outline-none focus-visible:underline"
                >
                  {t(to === '/install' ? 'install' : 'start')}
                  <span className="flex size-9 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
              <div data-service-visual className="min-w-0 md:-mt-8">
                <WorkflowDemo kind={kind} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
