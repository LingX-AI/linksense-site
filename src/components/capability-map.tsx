import { useReducedMotion } from '@/lib/use-reduced-motion'
import {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useInView } from 'motion/react'
import { gsap } from '@/lib/animation'
import { useTranslation } from 'react-i18next'
import { BookOpen, Network, Pause, Play, Sparkles, Users } from 'lucide-react'
import { capabilityPath } from '@/lib/capability-path'
import { cn } from '@/lib/utils'
import { EntryContext } from '@/lib/transition-context'

const sources = [
  {
    id: 'knowledge',
    label: 'knowledge',
    body: 'mapKnowledgeBody',
    Icon: BookOpen,
  },
  { id: 'skill', label: 'skill', body: 'mapSkillBody', Icon: Sparkles },
  { id: 'tools', label: null, body: 'mapToolsBody', Icon: Network },
] as const

export function CapabilityMap() {
  const [selected, setSelected] =
    useState<(typeof sources)[number]['id']>('knowledge')
  const [replay, setReplay] = useState(0)
  const [paused, setPaused] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const id = useId()
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const ready = useContext(EntryContext)
  const visible = useInView(stage, { amount: 0.4 })

  useEffect(() => {
    if (!ready || !visible || reduced || paused) return
    let timer: ReturnType<typeof setInterval> | undefined
    const update = () => {
      clearInterval(timer)
      if (!document.hidden) {
        timer = setInterval(
          () =>
            setSelected(
              (current) =>
                sources[
                  (sources.findIndex((source) => source.id === current) + 1) %
                    sources.length
                ].id,
            ),
          4000,
        )
      }
    }
    update()
    document.addEventListener('visibilitychange', update)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', update)
    }
  }, [ready, visible, reduced, paused, replay])

  useLayoutEffect(() => {
    const root = stage.current
    if (!root) return
    const app = root.querySelector<HTMLElement>('[data-map-app]')!
    const team = root.querySelector<HTMLElement>('[data-map-team]')!
    const nodes = [
      ...root.querySelectorAll<HTMLButtonElement>('[data-map-source]'),
    ]
    const paths = [...root.querySelectorAll<SVGPathElement>('[data-map-path]')]
    const endPath = root.querySelector<SVGPathElement>('[data-map-output]')!
    const flowPaths = [
      ...root.querySelectorAll<SVGPathElement>('[data-map-flow]'),
    ]
    const outputPath = root.querySelector<SVGPathElement>(
      '[data-map-output-active]',
    )!
    const packets = [
      ...root.querySelectorAll<SVGCircleElement>('[data-map-packet]'),
    ]
    const draw = () => {
      const box = root.getBoundingClientRect()
      const point = (node: HTMLElement, bottom: boolean) => {
        const bounds = node.getBoundingClientRect()
        return {
          x: bounds.left + bounds.width / 2 - box.left,
          y: (bottom ? bounds.bottom : bounds.top) - box.top,
        }
      }
      nodes.forEach((node, index) =>
        paths[index].setAttribute(
          'd',
          capabilityPath(point(node, true), point(app, false)),
        ),
      )
      endPath.setAttribute(
        'd',
        capabilityPath(point(app, true), point(team, false)),
      )
      flowPaths.forEach((path, index) =>
        path.setAttribute('d', paths[index].getAttribute('d')!),
      )
      outputPath.setAttribute('d', endPath.getAttribute('d')!)
    }
    const observer = new ResizeObserver(draw)
    ;[root, app, team, ...nodes].forEach((node) => observer.observe(node))
    draw()
    const timeline = gsap.timeline({
      paused: true,
      delay: replay === 0 ? 0.5 : 0,
    })
    const movePacket = (
      path: SVGPathElement,
      packet: SVGCircleElement,
      at: number,
      duration: number,
    ) => {
      const position = { progress: 0 }
      timeline.fromTo(
        packet,
        { opacity: 0 },
        { opacity: 1, duration: 0.12 },
        at,
      )
      timeline.to(
        position,
        {
          progress: 1,
          duration,
          ease: 'none',
          onUpdate: () => {
            const point = path.getPointAtLength(
              path.getTotalLength() * position.progress,
            )
            packet.setAttribute('cx', String(point.x))
            packet.setAttribute('cy', String(point.y))
          },
        },
        at,
      )
      timeline.to(packet, { opacity: 0, duration: 0.12 }, at + duration - 0.12)
    }
    if (ready && visible && !reduced && !paused) {
      timeline.fromTo(
        flowPaths,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out' },
        0,
      )
      timeline.fromTo(
        outputPath,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' },
        1,
      )
      flowPaths.forEach((path, index) =>
        movePacket(path, packets[index], 0.25, 0.85),
      )
      movePacket(outputPath, packets[3], 1.05, 0.7)
      timeline.fromTo(
        root.querySelector('[data-map-core]'),
        { scale: 0.97 },
        { scale: 1, duration: 0.65, ease: 'back.out(2)' },
        0.85,
      )
      timeline.fromTo(
        team,
        { borderColor: 'var(--color-primary)' },
        { borderColor: 'var(--color-border)', duration: 0.7 },
        1.65,
      )
    }
    const visibility = () => {
      if (document.hidden) timeline.pause()
      else if (ready && visible && !reduced && !paused) timeline.play()
    }
    document.addEventListener('visibilitychange', visibility)
    visibility()
    return () => {
      observer.disconnect()
      timeline.revert()
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [i18n.language, selected, replay, visible, reduced, ready, paused])

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="min-w-0"
      data-testid="capability-map"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 id={`${id}-title`} className="text-sm font-medium">
          {t('mapTitle')}
        </h2>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          disabled={reduced}
          aria-label={t(paused ? 'mapPlay' : 'mapPause')}
          aria-pressed={paused}
          className="flex min-h-11 items-center gap-2 rounded-xl px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          {t(paused ? 'mapPlay' : 'mapPause')}
        </button>
      </div>
      <div
        ref={stage}
        className="capability-stage relative grid grid-cols-3 gap-x-3 gap-y-8 py-3"
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full overflow-visible fill-none"
        >
          {sources.map((source) => (
            <path
              key={source.id}
              data-map-path
              className="stroke-border"
              strokeWidth="1"
            />
          ))}
          <path data-map-output className="stroke-border" strokeWidth="1" />
          {sources.map((source) => (
            <path
              key={source.id}
              data-map-flow
              className="stroke-primary"
              strokeWidth="2"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
          ))}
          <path
            data-map-output-active
            className="stroke-primary"
            strokeWidth="2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="0"
          />
          <circle data-map-packet r="3.5" className="fill-primary opacity-0" />
          <circle data-map-packet r="3.5" className="fill-primary opacity-0" />
          <circle data-map-packet r="3.5" className="fill-primary opacity-0" />
          <circle data-map-packet r="3.5" className="fill-primary opacity-0" />
        </svg>
        {sources.map(({ id: sourceId, label, Icon }) => (
          <button
            key={sourceId}
            type="button"
            data-map-source
            data-current={selected === sourceId}
            aria-controls={`${id}-detail`}
            aria-describedby={`${id}-${sourceId}`}
            onClick={() => {
              setSelected(sourceId)
              setReplay((value) => value + 1)
            }}
            className="relative z-10 flex min-h-24 min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-primary bg-background px-2 py-4 text-center text-xs text-primary shadow-lg shadow-primary/5 transition-colors duration-300 outline-none hover:bg-cloud/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:text-sm"
          >
            <Icon className="size-5" aria-hidden="true" />
            <span>{label ? t(label) : 'MCP'}</span>
          </button>
        ))}
        <div
          data-map-app
          className="relative z-10 col-span-3 mx-auto flex min-h-26 w-52 max-w-full flex-col items-center justify-center gap-3 rounded-2xl border border-foreground bg-ink px-5 py-5 text-white shadow-xl shadow-black/10"
        >
          <div data-map-core className="flex flex-col items-center gap-3">
            <img
              src="/linksense-logo-light.svg"
              width="132"
              height="30"
              alt="LinkSense"
              className="h-7 w-auto"
            />
            <span className="text-xs text-white/70">{t('mapApplication')}</span>
          </div>
        </div>
        <div
          data-map-team
          className="relative z-10 col-span-3 mx-auto flex max-w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-4 text-center text-xs sm:text-sm"
        >
          <Users className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {t('mapTeam')}
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">{t('mapHint')}</p>
        <div
          id={`${id}-detail`}
          aria-live={paused || reduced ? 'polite' : 'off'}
          aria-atomic="true"
          className="mt-2 grid text-sm leading-relaxed text-foreground/75"
        >
          {sources.map((source) => (
            <p
              key={source.id}
              id={`${id}-${source.id}`}
              aria-hidden={source.id !== selected}
              className={cn(
                'col-start-1 row-start-1',
                source.id !== selected && 'invisible',
              )}
            >
              {t(source.body)}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
