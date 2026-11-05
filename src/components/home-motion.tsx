'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

export function HomeMotion({
  lang,
  children,
}: {
  lang: string
  children: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const splits: SplitText[] = []
        const characters = lang === 'zh' || lang === 'ja'
        root.current
          ?.querySelectorAll<HTMLElement>('h1, h2, [data-reveal-copy]')
          .forEach((element) => {
            const label = element.innerText.replace(/\s+/g, ' ').trim()
            const split = SplitText.create(element, {
              type: characters ? 'chars,lines' : 'words,lines',
              mask: characters ? 'chars' : 'words',
              tag: 'span',
              aria: 'auto',
              autoSplit: true,
              onSplit(self) {
                gsap.set(self.lines, { display: 'block' })
                gsap.set(self.masks, {
                  display: 'inline-block',
                  verticalAlign: 'top',
                  margin: '-0.1em',
                })
                const pieces = characters ? self.chars : self.words
                gsap.set(pieces, { display: 'inline-block', padding: '0.1em' })
                return gsap.fromTo(
                  pieces,
                  { yPercent: 120 },
                  {
                    yPercent: 0,
                    duration: 1.7,
                    stagger: { amount: 0.45 },
                    delay: element.hasAttribute('data-reveal-copy') ? 0.1 : 0,
                    ease: 'expo.out',
                    scrollTrigger: {
                      trigger: element,
                      start: 'top 92%',
                      once: true,
                    },
                  },
                )
              },
            })
            element.setAttribute('aria-label', label)
            splits.push(split)
          })
        root.current
          ?.querySelectorAll<HTMLElement>(
            '[data-reveal-group], [data-reveal-item]',
          )
          .forEach((element) => {
            gsap.from(
              element.hasAttribute('data-reveal-group')
                ? element.children
                : element,
              {
                y: 45,
                autoAlpha: 0,
                duration: 1.3,
                stagger: 0.1,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 92%',
                  once: true,
                },
              },
            )
          })
        const reel = root.current?.querySelector('[data-reveal-media]')
        if (reel)
          gsap.from(reel, {
            clipPath: 'inset(5% 8% round 2rem)',
            scale: 0.96,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: reel, start: 'top 90%', once: true },
          })
        return () => splits.forEach((split) => split.revert())
      },
      root,
    )
    return () => media.revert()
  }, [lang])

  return (
    <div
      ref={root}
      id="home-content"
      className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-16 text-fd-foreground sm:px-6 lg:px-8"
    >
      {children}
    </div>
  )
}
