import { useContext, useId, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Layers3,
  Plus,
  Workflow,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { gsap, ScrollTrigger } from '@/lib/animation'
import { serviceStack, type ServiceSize } from '@/lib/motion-geometry'
import { EntryContext } from '@/lib/transition-context'

const services = [
  { title: 'workTitle', body: 'workBody', Icon: FileText, to: '/start' },
  {
    title: 'knowledgeTitle',
    body: 'knowledgeBody',
    Icon: BookOpen,
    to: '/install',
  },
  { title: 'appsTitle', body: 'appsBody', Icon: Layers3, to: '/start' },
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
          card.querySelector<HTMLButtonElement>('button')!,
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
              scale: 0.85 + item.progress * 0.15,
              rotation: (1 - item.progress) * -5,
            })
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
          const toggle = () => {
            const open = button.getAttribute('aria-expanded') !== 'true'
            setAccessible(index, open)
            gsap.to(cards[index], {
              backgroundColor: open ? '#171b24' : '#f3f4f6',
              color: open ? '#ffffff' : '#151619',
              duration: context.conditions?.reduced ? 0 : 0.4,
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
          gsap.killTweensOf([...cards, ...bodies])
        }
      },
      root,
    )
    return () => media.revert()
  }, [ready, i18n.language])
  return (
    <div ref={list} data-testid="services" className="space-y-4">
      {services.map(({ title, body, Icon, to }, index) => (
        <article
          key={title}
          data-service
          className="overflow-hidden rounded-3xl bg-muted p-7 md:p-10"
        >
          <div
            data-service-heading
            className="flex items-center justify-between gap-5"
          >
            <h3 className="flex items-center gap-5 text-feature leading-tight tracking-tight">
              <Icon className="size-7 shrink-0 opacity-60" aria-hidden="true" />
              {t(title)}
            </h3>
            <button
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-current/20"
              aria-label={t(title)}
              aria-expanded={index === 0}
              aria-controls={`${id}-${index}`}
            >
              <Plus className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div
            data-service-body
            id={`${id}-${index}`}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pt-8 md:grid-cols-[1.3fr_1fr]">
              <div className="flex flex-col justify-between gap-7">
                <p className="max-w-150 text-lg leading-relaxed opacity-65">
                  {t(body)}
                </p>
                <Link to={to} className="flex w-fit items-center gap-3 text-sm">
                  {t(to === '/install' ? 'install' : 'start')}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div
                data-service-visual
                className="flex items-center justify-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-8"
              >
                <Icon className="size-12 text-white/80" />
                <Workflow className="size-7 text-white/30" />
                <Layers3 className="size-12 text-white/80" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
