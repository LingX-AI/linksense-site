import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
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
      <motion.button
        type="button"
        onClick={open}
        aria-label={t('play')}
        data-cursor={t('play')}
        data-cursor-mode="play"
        className="reel-trigger relative block aspect-video w-full overflow-hidden rounded-media bg-muted text-foreground outline-none focus-visible:ring-3 focus-visible:ring-primary focus-visible:ring-offset-8"
        initial={
          reduced
            ? false
            : { clipPath: 'inset(5% 10% round 28px)', scale: 0.9, opacity: 0 }
        }
        whileInView={{
          clipPath: 'inset(0% 0% round 28px)',
          scale: 1,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div data-parallax className="absolute inset-0">
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
            className="size-full object-cover"
          >
            <source src="/media/linksense-intro-v6.mp4" type="video/mp4" />
          </video>
        </div>
        <span className="reel-play-hint pointer-events-none absolute top-1/2 left-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground">
          <Play className="ml-1 size-5 fill-current" aria-hidden="true" />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-media border border-border"
        />
      </motion.button>
      <Button
        variant="light"
        aria-label={playing ? t('pause') : t('play')}
        onClick={() => {
          if (playing) setPaused(true)
          else if (reduced) open()
          else {
            setPaused(false)
            void video.current?.play().catch(open)
          }
        }}
        className="absolute right-5 bottom-5 z-10 size-11 min-h-11 border-white/50 bg-black/20 px-0 backdrop-blur-sm hover:bg-black/40 hover:text-white"
      >
        {playing ? <Pause /> : <Play />}
      </Button>
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
          playsInline
          preload="none"
          poster="/media/linksense-intro-v6.jpg"
          className="w-full rounded-xl"
        >
          <source src="/media/linksense-intro-v6.mp4" type="video/mp4" />
        </video>
      </dialog>
    </div>
  )
}
