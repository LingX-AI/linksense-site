import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export function HoverDemo({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null),
    video = useRef<HTMLVideoElement>(null)
  const visible = useInView(root, { amount: 0.1 }),
    reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    const element = video.current,
      anchor = root.current?.closest('a')
    if (!element || !anchor) return
    let active = false,
      disposed = false
    const stop = () => {
      active = false
      element.pause()
      setPlaying(false)
    }
    const enter = () => {
      if (
        !visible ||
        reduced ||
        document.hidden ||
        !matchMedia('(hover: hover) and (pointer: fine)').matches
      )
        return
      active = true
      void element
        .play()
        .then(() => {
          if (disposed || !active || document.hidden) element.pause()
          else setPlaying(true)
        })
        .catch(() => {
          /* The illustration remains visible when video cannot play. */
        })
    }
    const visibility = () => {
      if (document.hidden) stop()
    }
    anchor.addEventListener('pointerenter', enter)
    anchor.addEventListener('pointerleave', stop)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      disposed = true
      active = false
      element.pause()
      anchor.removeEventListener('pointerenter', enter)
      anchor.removeEventListener('pointerleave', stop)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [visible, reduced])
  return (
    <div ref={root} className="relative">
      <div
        className={cn(
          'transition-opacity duration-400',
          playing && 'opacity-0',
        )}
      >
        {children}
      </div>
      <video
        ref={video}
        data-hover-video
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPause={() => setPlaying(false)}
        className={cn(
          'pointer-events-none absolute inset-0 size-full bg-cloud object-contain transition-opacity duration-400',
          playing ? 'opacity-100' : 'opacity-0',
        )}
      >
        <source src="/media/product-demo.mp4" type="video/mp4" />
      </video>
      {playing && (
        <span className="absolute right-5 bottom-5 rounded-full bg-white/90 px-3 py-1 text-xs text-foreground">
          {t('watch')}
        </span>
      )}
    </div>
  )
}
