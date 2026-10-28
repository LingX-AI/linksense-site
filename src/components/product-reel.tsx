import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Pause, Play, X } from 'lucide-react'
import { Button } from './ui/button'

export function ProductReel() {
  const { t } = useTranslation()
  const video = useRef<HTMLVideoElement>(null),
    fullVideo = useRef<HTMLVideoElement>(null),
    dialog = useRef<HTMLDialogElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const visible = useInView(frame, { amount: 0.2 })
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const element = video.current
    if (!element) return
    let cancelled = false
    const update = () => {
      if (
        !visible ||
        reduced ||
        paused ||
        document.hidden ||
        dialog.current?.open
      )
        element.pause()
      else
        void element
          .play()
          .then(() => {
            if (cancelled || document.hidden) element.pause()
          })
          .catch(() => {
            /* The explicit play control remains available. */
          })
    }
    update()
    document.addEventListener('visibilitychange', update)
    return () => {
      cancelled = true
      element.pause()
      document.removeEventListener('visibilitychange', update)
    }
  }, [visible, reduced, paused])
  function open() {
    video.current?.pause()
    dialog.current?.showModal()
    void fullVideo.current?.play().catch(() => {})
  }
  function close() {
    fullVideo.current?.pause()
    dialog.current?.close()
    setPaused(true)
  }
  return (
    <div ref={frame} className="relative mx-auto max-w-352">
      <motion.div
        className="relative"
        initial={reduced ? false : { scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={open}
          aria-label={t('play')}
          data-cursor={t('play')}
          data-cursor-mode="play"
          className="group relative grid w-full items-stretch gap-6 overflow-hidden rounded-2xl bg-cloud p-5 text-left text-foreground outline-none focus-visible:ring-3 focus-visible:ring-primary focus-visible:ring-offset-8 sm:p-8 md:grid-cols-[.32fr_1fr] md:gap-10 lg:p-10"
        >
          <span className="flex flex-col items-start justify-between gap-6 md:py-2">
            <span className="max-w-56 font-display text-2xl leading-tight font-medium tracking-tight lg:text-3xl">
              {t('watch')}
            </span>
            <span className="flex items-center gap-3 text-sm">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-ink motion-reduce:transition-none">
                <Play
                  className="ml-0.5 size-4 fill-current"
                  aria-hidden="true"
                />
              </span>
              <span className="tabular-nums">00:30</span>
            </span>
          </span>
          <div className="relative aspect-video min-w-0 overflow-hidden rounded-media bg-white shadow-sm">
            <video
              ref={video}
              width={1920}
              height={1080}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              muted
              loop
              playsInline
              preload="none"
              poster="/media/linksense-intro-v6.jpg"
              aria-hidden="true"
              className="absolute inset-0 size-full object-contain"
            >
              <source src="/media/linksense-intro-v6.mp4" type="video/mp4" />
            </video>
          </div>
        </button>
        <Button
          variant="outline"
          aria-label={playing ? t('pause') : t('play')}
          onClick={() => {
            if (playing) setPaused(true)
            else if (reduced) open()
            else {
              setPaused(false)
              void video.current?.play().catch(open)
            }
          }}
          className="absolute right-8 bottom-8 z-10 size-11 min-h-11 rounded-full border-border bg-white/95 px-0 hover:bg-muted hover:text-foreground sm:right-11 sm:bottom-11 lg:right-13 lg:bottom-13"
        >
          {playing ? <Pause /> : <Play />}
        </Button>
      </motion.div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5 text-xs text-muted-foreground">
        <span>{t('footer')}</span>
        <span>Word / Excel / PPT / HTML</span>
      </div>
      <dialog
        ref={dialog}
        className="fixed inset-4 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-360 overflow-auto rounded-3xl bg-foreground p-3 text-white md:p-5"
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        onClose={() => {
          fullVideo.current?.pause()
          setPaused(true)
        }}
      >
        <div className="mb-3 flex items-center justify-between px-2">
          <span>{t('watch')}</span>
          <Button
            variant="light"
            onClick={close}
            aria-label={t('close')}
            className="px-3"
          >
            <X />
          </Button>
        </div>
        <video
          ref={fullVideo}
          width={1920}
          height={1080}
          controls
          muted
          playsInline
          preload="none"
          poster="/media/linksense-intro-v6.jpg"
          className="max-h-[calc(100dvh-8rem)] w-full rounded-xl object-contain"
        >
          <source src="/media/linksense-intro-v6.mp4" type="video/mp4" />
        </video>
      </dialog>
    </div>
  )
}
