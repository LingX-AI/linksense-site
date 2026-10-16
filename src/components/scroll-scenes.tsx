import { useContext, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { EntryContext } from '@/lib/transition-context'
import { gsap, ScrollTrigger } from '@/lib/animation'

export function ScrollScenes({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const ready = useContext(EntryContext)
  const { i18n } = useTranslation()
  useLayoutEffect(() => {
    if (!root.current || !ready) return
    const node = root.current
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const parallax = [
          ...node.querySelectorAll<HTMLElement>('[data-parallax]'),
        ]
        parallax.forEach((element) =>
          gsap.fromTo(
            element,
            { yPercent: -4, scale: 1.12 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          ),
        )
        const blocks = [...node.querySelectorAll<HTMLElement>('[data-batch]')]
        gsap.set(blocks, { y: 60, opacity: 0 })
        ScrollTrigger.batch(blocks, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              stagger: 0.12,
              ease: 'expo.out',
              overwrite: true,
              clearProps: 'opacity,transform',
            }),
        })
        const tiles = [
          ...node.querySelectorAll<HTMLElement>('[data-proof-tile]'),
        ]
        tiles.forEach((element, index) =>
          gsap.fromTo(
            element,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              delay: index * 0.12,
              ease: 'expo.out',
              scrollTrigger: { trigger: element, start: 'top 90%', once: true },
            },
          ),
        )
        const scenes = [...node.querySelectorAll<HTMLElement>('[data-scene]')]
        const listeners = scenes.map((scene) => {
          const items = [
            ...scene.querySelectorAll<HTMLElement>('[data-scene-item]'),
          ]
          const enter = () => {
            if (matchMedia('(hover: hover) and (pointer: fine)').matches)
              gsap.fromTo(
                items,
                { y: 12, opacity: 0.35 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.055,
                  ease: 'expo.out',
                  overwrite: true,
                },
              )
          }
          const leave = () => {
            gsap.to(items, { y: 0, opacity: 1, duration: 0.4, overwrite: true })
          }
          const target = scene.closest('a') ?? scene
          target.addEventListener('pointerenter', enter)
          target.addEventListener('pointerleave', leave)
          target.addEventListener('focusin', enter)
          target.addEventListener('focusout', leave)
          return () => {
            target.removeEventListener('pointerenter', enter)
            target.removeEventListener('pointerleave', leave)
            target.removeEventListener('focusin', enter)
            target.removeEventListener('focusout', leave)
            gsap.killTweensOf(items)
          }
        })
        return () => {
          listeners.forEach((remove) => remove())
          gsap.killTweensOf([...parallax, ...blocks, ...tiles])
        }
      },
      node,
    )
    return () => media.revert()
  }, [ready, i18n.language])
  return <div ref={root}>{children}</div>
}
