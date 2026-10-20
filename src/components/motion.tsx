import { useReducedMotion } from '@/lib/use-reduced-motion'
import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from 'react'
import { motion } from 'motion/react'
import { useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Play } from 'lucide-react'
import { EntryContext } from '@/lib/transition-context'
import { gsap, SplitText } from '@/lib/animation'
import { cn } from '@/lib/utils'

export function RevealText({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: {
  children: string
  as?: 'h1' | 'h2' | 'p'
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const ready = useContext(EntryContext)
  const { i18n } = useTranslation()
  useLayoutEffect(() => {
    const node = ref.current
    if (!node || !ready) return
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const byLine =
          i18n.language.startsWith('zh') || i18n.language.startsWith('ja')
        const split = SplitText.create(node, {
          type: byLine ? 'lines' : 'words,lines',
          mask: byLine ? 'lines' : 'words',
          tag: 'span',
          aria: 'none',
          autoSplit: true,
          onSplit(self) {
            gsap.set(self.lines, { display: 'block' })
            gsap.set(self.masks, {
              display: byLine ? 'block' : 'inline-block',
              attr: { 'aria-hidden': 'true' },
              verticalAlign: 'top',
              paddingBottom: '.06em',
              marginBottom: '-.06em',
            })
            gsap.set(self.words, { display: 'inline-block' })
            return gsap.fromTo(
              byLine ? self.lines : self.words,
              { yPercent: 120 },
              {
                yPercent: 0,
                duration: 1.7,
                delay,
                stagger: { amount: 0.6 },
                ease: 'expo.out',
                ...(Tag === 'h1'
                  ? {}
                  : {
                      scrollTrigger: {
                        trigger: node,
                        start: 'top 93%',
                        once: true,
                      },
                    }),
              },
            )
          },
        })
        return () => split.revert()
      },
      node,
    )
    return () => media.revert()
  }, [children, delay, i18n.language, ready, Tag])
  return (
    <Tag
      key={`${i18n.language}:${children}`}
      ref={ref}
      tabIndex={Tag === 'h1' ? -1 : undefined}
      aria-label={children.replaceAll('\n', ' ')}
      className={cn(
        'leading-[1.14] font-medium tracking-[-0.045em] text-balance whitespace-pre-line',
        className,
      )}
    >
      {children.split('\n').map((line, index) => (
        <Fragment key={`${line}:${index}`}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </Tag>
  )
}

export function EnterGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ready = useContext(EntryContext),
    reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 24, opacity: 0 }}
      animate={{
        y: ready || reduced ? 0 : 24,
        opacity: ready || reduced ? 1 : 0,
      }}
      transition={{
        duration: reduced ? 0 : 1,
        delay: reduced ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function ElasticRule({ dark = false }: { dark?: boolean }) {
  const ref = useRef<SVGSVGElement>(null),
    path = useRef<SVGPathElement>(null)
  useLayoutEffect(() => {
    const svg = ref.current,
      line = path.current
    if (!svg || !line) return
    let width = svg.clientWidth
    const bend = { x: width / 2, y: 20 }
    let tween: gsap.core.Tween | undefined
    const draw = () =>
      line.setAttribute('d', `M0 20 Q${bend.x} ${bend.y} ${width} 20`)
    const observer = new ResizeObserver(() => {
      width = svg.clientWidth
      bend.x = width / 2
      draw()
    })
    observer.observe(svg)
    draw()
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.fromTo(
          svg,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: { trigger: svg, start: 'top 95%', once: true },
          },
        )
        const fine = matchMedia('(hover: hover) and (pointer: fine)')
        const move = (event: PointerEvent) => {
          if (!fine.matches || event.pointerType !== 'mouse') return
          const rect = svg.getBoundingClientRect()
          tween?.kill()
          bend.x = event.clientX - rect.left
          tween = gsap.to(bend, {
            y: Math.max(
              -25,
              Math.min(65, (event.clientY - rect.top - 20) * 2 + 20),
            ),
            duration: 0.2,
            ease: 'power3.out',
            onUpdate: draw,
          })
        }
        const leave = () => {
          tween?.kill()
          tween = gsap.to(bend, {
            y: 20,
            duration: 2,
            ease: 'elastic.out(1,.2)',
            onUpdate: draw,
          })
        }
        svg.addEventListener('pointermove', move)
        svg.addEventListener('pointerleave', leave)
        return () => {
          tween?.kill()
          svg.removeEventListener('pointermove', move)
          svg.removeEventListener('pointerleave', leave)
          bend.y = 20
          draw()
        }
      },
      svg,
    )
    return () => {
      observer.disconnect()
      media.revert()
    }
  }, [])
  return (
    <svg
      ref={ref}
      data-elastic-rule
      className={cn(
        'h-10 w-full overflow-visible',
        dark ? 'text-white/20' : 'text-foreground/20',
      )}
      aria-hidden="true"
    >
      <path ref={path} fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function Cursor({ blocked = false }: { blocked?: boolean }) {
  const dot = useRef<HTMLDivElement>(null),
    bubble = useRef<HTMLDivElement>(null),
    surface = useRef<HTMLDivElement>(null),
    label = useRef<HTMLSpanElement>(null),
    image = useRef<HTMLImageElement>(null),
    arrow = useRef<SVGSVGElement>(null),
    play = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const path = useRouterState({ select: (state) => state.location.pathname })
  useEffect(() => {
    const cursor = dot.current,
      card = bubble.current,
      fill = surface.current,
      picture = image.current,
      icon = arrow.current,
      playIcon = play.current
    if (!cursor || !card || !fill || !picture || !icon || !playIcon) return
    const targets = [cursor, card, fill]
    gsap.set(targets, { opacity: 0 })
    gsap.set([cursor, card], { x: -200, y: -200, xPercent: -50, yPercent: -50 })
    gsap.set(card, { width: 10, height: 10 })
    gsap.set(playIcon, { opacity: 0, scale: 0, rotation: 10 })
    cursor.dataset.mode = 'hidden'
    if (reduced || blocked) return
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const xDot = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'expo.out' }),
      yDot = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'expo.out' })
    const xCard = gsap.quickTo(card, 'x', { duration: 0.5, ease: 'expo.out' }),
      yCard = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'expo.out' })
    const skew = gsap.quickTo(fill, 'skewX', {
      duration: 0.35,
      ease: 'expo.out',
    })
    let initialized = false,
      lastX = 0,
      lastTime = 0,
      previousMode = ''
    let previousTarget: HTMLElement | null = null
    const hide = () => {
      cursor.dataset.mode = 'hidden'
      gsap.to([cursor, card], { opacity: 0, duration: 0.15, overwrite: 'auto' })
      initialized = false
      previousMode = ''
      previousTarget = null
      delete cursor.dataset.pressed
      gsap.set([cursor, card], { scale: 1 })
    }
    const move = (event: PointerEvent) => {
      if (
        !fine.matches ||
        event.pointerType !== 'mouse' ||
        document.hidden ||
        document.querySelector('dialog[open]')
      ) {
        hide()
        return
      }
      if (
        event.target instanceof Element &&
        event.target.closest('input,textarea,select,[contenteditable="true"]')
      ) {
        hide()
        return
      }
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('a,button,summary,[data-cursor]')
          : null
      const text = target?.dataset.cursor ?? ''
      const sticky = target?.hasAttribute('data-cursor-stick')
      const mode = sticky
        ? 'stick'
        : text
          ? (target?.dataset.cursorMode ?? 'label')
          : target
            ? 'pointer'
            : 'dot'
      let x = event.clientX,
        y = event.clientY
      const bounds =
        sticky && target
          ? (target.querySelector('img,svg') ?? target).getBoundingClientRect()
          : null
      if (bounds) {
        x =
          bounds.left +
          bounds.width / 2 +
          (x - bounds.left - bounds.width / 2) * 0.15
        y =
          bounds.top +
          bounds.height / 2 +
          (y - bounds.top - bounds.height / 2) * 0.15
      }
      if (!initialized) {
        gsap.set([cursor, card], { x, y })
        initialized = true
      }
      xDot(x)
      yDot(y)
      xCard(x)
      yCard(y)
      const now = performance.now(),
        velocity = (event.clientX - lastX) / Math.max(16, now - lastTime)
      skew(Math.max(-10, Math.min(10, velocity * 3)))
      lastX = event.clientX
      lastTime = now
      if (mode !== previousMode || target !== previousTarget) {
        previousTarget = target
        previousMode = mode
        cursor.dataset.mode = mode
        const rich = text && !sticky
        gsap.to(cursor, {
          width: bounds ? bounds.width + 14 : target ? 42 : 10,
          height: bounds ? bounds.height + 14 : target ? 42 : 10,
          borderRadius: bounds ? 16 : '50%',
          opacity: rich ? 0 : 1,
          duration: 0.35,
          overwrite: 'auto',
        })
        gsap.to(card, {
          width:
            mode === 'play'
              ? Math.min(80, Math.max(54, innerWidth * 0.05))
              : mode === 'media'
                ? 170
                : rich
                  ? 100
                  : 10,
          height:
            mode === 'play'
              ? Math.min(80, Math.max(54, innerWidth * 0.05))
              : mode === 'media'
                ? 120
                : rich
                  ? 100
                  : 10,
          opacity: rich ? 1 : 0,
          borderRadius: mode === 'media' ? 18 : 50,
          duration: 0.3,
          overwrite: 'auto',
        })
        gsap.set(card, {
          mixBlendMode: mode === 'play' ? 'exclusion' : 'normal',
        })
        gsap.set(fill, {
          opacity: 1,
          borderRadius: mode === 'media' ? 18 : 50,
          backgroundColor:
            mode === 'play'
              ? 'var(--color-background)'
              : 'var(--color-foreground)',
        })
        gsap.set(picture, { opacity: mode === 'media' ? 1 : 0 })
        gsap.set(icon, {
          display: mode === 'project' ? 'block' : 'none',
        })
        gsap.to(playIcon, {
          opacity: mode === 'play' ? 1 : 0,
          scale: mode === 'play' ? 1 : 0,
          rotation: mode === 'play' ? 0 : 10,
          duration: 0.3,
          overwrite: 'auto',
        })
        gsap.set(label.current, { display: mode === 'play' ? 'none' : 'block' })
        if (label.current) label.current.textContent = text
      }
    }
    const down = () => {
      gsap.to([cursor, card], { scale: 0.78, duration: 0.2 })
      cursor.dataset.pressed = 'true'
    }
    const up = () => {
      gsap.to([cursor, card], { scale: 1, duration: 0.35 })
      delete cursor.dataset.pressed
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', hide)
    document.addEventListener('pointerdown', down)
    document.addEventListener('pointerup', up)
    document.addEventListener('pointercancel', hide)
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('blur', hide)
    fine.addEventListener('change', hide)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('pointercancel', hide)
      document.removeEventListener('visibilitychange', hide)
      window.removeEventListener('blur', hide)
      fine.removeEventListener('change', hide)
      gsap.killTweensOf([...targets, picture, icon, playIcon])
      xDot.tween.kill()
      yDot.tween.kill()
      xCard.tween.kill()
      yCard.tween.kill()
      skew.tween.kill()
    }
  }, [blocked, reduced, path])
  return (
    <>
      <div
        ref={dot}
        data-testid="custom-cursor"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-70 size-2.5 rounded-full bg-white opacity-0 mix-blend-difference"
      />
      <div
        ref={bubble}
        data-testid="cursor-bubble"
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-70 flex size-25 flex-col items-center justify-center overflow-hidden rounded-full text-center text-white opacity-0"
      >
        <div
          ref={surface}
          className="absolute inset-0 rounded-full bg-foreground"
        />
        <img
          ref={image}
          src="/media/product-poster.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-0"
        />
        <ArrowUpRight ref={arrow} className="relative mb-1 hidden size-6" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Play
            ref={play}
            className="ml-0.5 size-1/4 text-black opacity-0"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <span
          ref={label}
          className="relative max-w-30 rounded-full bg-foreground/90 px-3 py-1 text-xs"
        />
      </div>
    </>
  )
}
