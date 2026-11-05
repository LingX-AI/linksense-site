'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/cn'

function timestamp(seconds: number) {
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`
}

export function ProductReel({ lang }: { lang: string }) {
  const t = getMessages(lang)
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const intent = useRef<'auto' | 'play' | 'pause'>('auto')
  const syncPlayback = useRef(() => {})
  const [enhanced, setEnhanced] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    const element = video.current
    if (!element) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let active = true
    let wantsPlayback = false
    setEnhanced(true)

    const sync = () => {
      wantsPlayback =
        active &&
        visible &&
        !document.hidden &&
        (intent.current === 'play' ||
          (intent.current === 'auto' && !reduced.matches))
      element.autoplay = wantsPlayback && intent.current === 'auto'
      if (!wantsPlayback) {
        element.pause()
        return
      }
      void element
        .play()
        .then(() => {
          if (!wantsPlayback || !active) element.pause()
        })
        .catch(() => setPlaying(false))
    }
    syncPlayback.current = sync
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        sync()
      },
      { threshold: 0.1 },
    )
    observer.observe(element)
    const updateFullscreen = () =>
      setFullscreen(document.fullscreenElement === frame.current)
    reduced.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    document.addEventListener('fullscreenchange', updateFullscreen)

    return () => {
      active = false
      wantsPlayback = false
      observer.disconnect()
      reduced.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      document.removeEventListener('fullscreenchange', updateFullscreen)
      syncPlayback.current = () => {}
      element.pause()
    }
  }, [])

  function togglePlayback() {
    intent.current = video.current?.paused ? 'play' : 'pause'
    syncPlayback.current()
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (frame.current?.requestFullscreen)
        await frame.current.requestFullscreen()
      else {
        const element = video.current as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void
        }
        element?.webkitEnterFullscreen?.()
      }
    } catch {
      if (video.current) video.current.controls = true
    }
  }

  const control =
    'flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white pointer-coarse:size-12'

  return (
    <div
      ref={frame}
      className="group/reel relative isolate aspect-video overflow-hidden rounded-3xl bg-white sm:rounded-4xl [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none"
      role="group"
      aria-label={t.watch}
    >
      <video
        ref={video}
        className="absolute inset-0 size-full object-contain"
        width={1920}
        height={1080}
        controls={!enhanced}
        muted={muted}
        loop
        playsInline
        preload="none"
        {...{ loading: 'lazy' }}
        poster="/media/linksense-intro-v6.jpg"
        aria-label={t.watch}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
        onLoadedMetadata={(event) => {
          const length = event.currentTarget.duration
          if (Number.isFinite(length)) setDuration(length)
        }}
        onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
        onError={() => {
          setEnhanced(false)
          setPlaying(false)
        }}
      >
        <source src="/media/linksense-intro-v6.mp4" type="video/mp4" />
      </video>
      {enhanced && (
        <>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? t.pause : t.play}
            className="absolute inset-0 flex items-center justify-center rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <span
              className={cn(
                'flex size-16 items-center justify-center rounded-full bg-white text-black shadow-xl transition-[opacity,scale] duration-300 motion-reduce:transition-none sm:size-24',
                playing && 'scale-90 opacity-0',
              )}
            >
              <Play
                aria-hidden="true"
                className="ms-1 size-6 sm:size-8"
                fill="currentColor"
              />
            </span>
          </button>
          <div
            className={cn(
              'absolute inset-x-3 bottom-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/65 p-1.5 text-white backdrop-blur-xl transition-opacity duration-200 motion-reduce:transition-none sm:inset-x-5 sm:bottom-5 sm:gap-3 sm:px-3',
              playing &&
                'opacity-0 group-focus-within/reel:opacity-100 group-hover/reel:opacity-100 pointer-coarse:opacity-100',
            )}
          >
            <button
              type="button"
              className={control}
              aria-label={playing ? t.pause : t.play}
              onClick={togglePlayback}
            >
              {playing ? (
                <Pause aria-hidden="true" className="size-4" />
              ) : (
                <Play aria-hidden="true" className="size-4" />
              )}
            </button>
            <span className="hidden text-xs tabular-nums sm:block" aria-hidden>
              {timestamp(current)} / {timestamp(duration)}
            </span>
            <input
              type="range"
              aria-label={t.seek}
              aria-valuetext={`${timestamp(current)} / ${timestamp(duration)}`}
              min={0}
              max={duration || 1}
              step={0.1}
              value={current}
              disabled={!duration}
              onChange={(event) => {
                const time = event.currentTarget.valueAsNumber
                if (video.current) video.current.currentTime = time
                setCurrent(time)
              }}
              className="reel-progress min-w-0 flex-1"
              style={{
                backgroundImage: `linear-gradient(to right, white ${(current / (duration || 1)) * 100}%, #ffffff40 0)`,
              }}
            />
            <button
              type="button"
              className={control}
              aria-label={muted ? t.unmute : t.mute}
              onClick={() => {
                if (video.current) video.current.muted = !muted
              }}
            >
              {muted ? (
                <VolumeX aria-hidden="true" className="size-4" />
              ) : (
                <Volume2 aria-hidden="true" className="size-4" />
              )}
            </button>
            <button
              type="button"
              className={control}
              aria-label={fullscreen ? t.exitFullscreen : t.fullscreen}
              onClick={() => void toggleFullscreen()}
            >
              {fullscreen ? (
                <Minimize aria-hidden="true" className="size-4" />
              ) : (
                <Maximize aria-hidden="true" className="size-4" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
