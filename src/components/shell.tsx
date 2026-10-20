import { useReducedMotion } from '@/lib/use-reduced-motion'
import {
  useEffect,
  useLayoutEffect,
  useId,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  Link,
  Outlet,
  useBlocker,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import {
  motion,
  useAnimationControls,
  useScroll,
  useMotionValueEvent,
} from 'motion/react'
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from './language-select'
import { EntryContext } from '@/lib/transition-context'
import { demoUrl, repository, docsUrl } from '@/lib/product'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/lib/button-variants'
import { cn } from '@/lib/utils'
import { Cursor, RevealText, ElasticRule } from './motion'
import { gsap } from '@/lib/animation'
import brandMarkup from '@/assets/linksense-logo.svg?raw'
import { ScrollScenes } from './scroll-scenes'

export function Pill({
  children,
  to,
  href,
  light = false,
}: {
  children: string
  to?: '/' | '/install' | '/start'
  href?: string
  light?: boolean
}) {
  const className = cn(
    buttonVariants({ variant: light ? 'light' : 'default' }),
    'pill-fill hover:text-white focus-visible:text-white',
    light
      ? 'hover:bg-transparent'
      : 'hover:border-foreground hover:bg-foreground',
  )
  const content = (
    <>
      <span className="pill-label relative">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <ArrowUpRight
        className="relative transition-colors duration-500 group-hover/pill:text-foreground group-focus-visible/pill:text-foreground"
        aria-hidden="true"
      />
    </>
  )
  return to ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} className={className}>
      {content}
    </a>
  )
}

const navLinkClass =
  'relative w-fit py-3 after:absolute after:right-0 after:bottom-1.5 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none'

function Header() {
  const { t, i18n } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuClosing = useRef(false)
  const ready = useContext(EntryContext)
  const reduced = useReducedMotion()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const closeMenu = () => {
    const menu = dialog.current
    if (!menu?.open || menuClosing.current) return
    if (reduced) {
      menu.close()
      return
    }
    menuClosing.current = true
    gsap.to(menu.querySelectorAll('nav a'), {
      y: -12,
      opacity: 0,
      duration: 0.25,
      stagger: 0.025,
    })
    gsap.to(menu, {
      clipPath: `inset(0px 0px ${Math.max(0, menu.scrollHeight - 64)}px 0px round 24px)`,
      duration: 0.5,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        menu.close()
        menuClosing.current = false
      },
    })
  }
  useLayoutEffect(() => {
    if (!header.current || !ready) return
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.from(header.current!.querySelectorAll('[data-brand-mark] path'), {
          scale: 0,
          opacity: 0,
          transformOrigin: '50% 50%',
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
        })
        gsap.from(
          header.current!.querySelectorAll('[data-header-navigation] > *'),
          { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out' },
        )
      },
      header.current,
    )
    return () => media.revert()
  }, [ready, pathname, i18n.language])
  useLayoutEffect(() => {
    const menu = dialog.current
    if (!menuOpen || !menu) return
    const items = menu.querySelectorAll('nav a')
    gsap.fromTo(
      menu,
      {
        clipPath: reduced
          ? 'inset(0px 0px 0px 0px round 24px)'
          : `inset(0px 0px ${Math.max(0, menu.scrollHeight - 64)}px 0px round 24px)`,
      },
      {
        clipPath: 'inset(0px 0px 0px 0px round 24px)',
        duration: reduced ? 0 : 0.65,
        ease: 'expo.out',
        overwrite: 'auto',
      },
    )
    gsap.fromTo(
      items,
      { y: reduced ? 0 : 22, opacity: reduced ? 1 : 0 },
      {
        y: 0,
        opacity: 1,
        duration: reduced ? 0 : 0.6,
        stagger: reduced ? 0 : 0.07,
        ease: 'expo.out',
      },
    )
    return () => gsap.killTweensOf([...items, menu])
  }, [menuOpen, reduced])
  useEffect(() => {
    const desktop = matchMedia('(min-width: 1024px)')
    const reset = () => {
      if (desktop.matches) {
        dialog.current?.close()
        menuClosing.current = false
      }
    }
    desktop.addEventListener('change', reset)
    return () => desktop.removeEventListener('change', reset)
  }, [])
  useMotionValueEvent(scrollY, 'change', (value) => {
    const difference = value - (scrollY.getPrevious() ?? 0)
    if (Math.abs(difference) > 2) setHidden(value > 120 && difference > 0)
  })
  const navigation = (
    <>
      <Link to="/" hash="product" className={navLinkClass} onClick={closeMenu}>
        {t('product')}
      </Link>
      <Link to="/install" className={navLinkClass} onClick={closeMenu}>
        {t('install')}
      </Link>
      <Link to="/start" className={navLinkClass} onClick={closeMenu}>
        {t('start')}
      </Link>
      <a href={docsUrl} className={navLinkClass} onClick={closeMenu}>
        {t('docs')}
      </a>
    </>
  )
  return (
    <motion.header
      ref={header}
      className="fixed inset-x-0 top-0 z-40 bg-white/95 backdrop-blur-md"
      animate={{ y: hidden ? '-100%' : 0 }}
      transition={{ duration: 0.35 }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="mx-auto flex h-24 max-w-400 items-center justify-between gap-3 px-gutter">
        <Link
          to="/"
          aria-label="LinkSense"
          data-cursor-stick
          className="shrink-0"
        >
          <span
            data-brand-mark
            aria-hidden="true"
            className="block [&_svg]:h-7 [&_svg]:w-auto md:[&_svg]:h-8"
            dangerouslySetInnerHTML={{ __html: brandMarkup }}
          />
        </Link>
        <nav
          data-header-navigation
          aria-label={t('menu')}
          className="hidden items-center gap-7 text-sm lg:flex"
        >
          {navigation}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSelect />
          <a
            href={repository}
            className="hidden p-2 sm:block"
            aria-label="GitHub"
          >
            <img
              src="/github.svg"
              alt=""
              width="20"
              height="20"
              className="size-5"
            />
          </a>
          <div className="hidden lg:block">
            <Pill href={demoUrl}>{t('try')}</Pill>
          </div>
          <Button
            variant="ghost"
            aria-label={t('menu')}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal()
              setMenuOpen(true)
            }}
            className="size-12 px-0 lg:hidden"
          >
            <Menu />
          </Button>
        </div>
      </div>
      <dialog
        ref={dialog}
        id={menuId}
        onClose={() => setMenuOpen(false)}
        onCancel={(event) => {
          event.preventDefault()
          closeMenu()
        }}
        className="fixed inset-4 m-0 h-fit max-h-[calc(100dvh-2rem)] w-auto max-w-none overflow-auto rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu()
        }}
      >
        <div className="flex items-center justify-between">
          <img
            src="/linksense-logo.svg"
            alt="LinkSense"
            className="h-7 w-auto"
          />
          <Button
            variant="ghost"
            onClick={closeMenu}
            aria-label={t('close')}
            className="px-3"
          >
            <X />
          </Button>
        </div>
        <nav
          aria-label={t('menu')}
          className="mt-12 flex flex-col gap-7 pb-10 text-3xl font-medium"
        >
          {navigation}
        </nav>
        <Pill href={demoUrl}>{t('try')}</Pill>
      </dialog>
    </motion.header>
  )
}

function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-foreground px-gutter pt-section pb-10 text-white">
      <ScrollScenes>
        <div className="mx-auto max-w-352">
          <RevealText className="max-w-240 text-section">
            {t('ctaTitle')}
          </RevealText>
          <div
            data-batch
            className="mt-8 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
          >
            <RevealText
              as="p"
              className="max-w-96 text-lg font-normal tracking-normal text-white/60"
            >
              {t('ctaBody')}
            </RevealText>
            <Pill to="/install" light>
              {t('install')}
            </Pill>
          </div>
          <div className="mt-14">
            <ElasticRule dark />
          </div>
          <div
            data-batch
            className="mt-10 flex flex-col justify-between gap-10 pt-10 md:flex-row"
          >
            <div>
              <img
                src="/linksense-logo-light.svg"
                alt="LinkSense"
                className="h-9 w-auto"
                width="348"
                height="94"
              />
              <p className="mt-5 text-sm text-white/50">{t('footer')}</p>
            </div>
            <nav
              className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm text-white/70"
              aria-label={t('docs')}
            >
              <a href={repository}>GitHub</a>
              <a href={`${repository}/discussions`}>{t('community')}</a>
              <a href={`${repository}/blob/main/LICENSE-EXCEPTIONS.md`}>
                {t('license')}
              </a>
              <a href={`${repository}/blob/main/SECURITY.md`}>
                {t('security')}
              </a>
            </nav>
          </div>
          <p className="mt-14 text-xs text-white/40">© 2026 LinkSense</p>
        </div>
      </ScrollScenes>
    </footer>
  )
}

export function SiteShell() {
  const router = useRouter()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const cover = useAnimationControls(),
    page = useAnimationControls()
  const [busy, setBusy] = useState(false),
    [ready, setReady] = useState(true)
  const active = useRef(false)
  const focusAfterEntry = useRef(false)
  const watchdog = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const main = useRef<HTMLElement>(null)

  useBlocker({
    enableBeforeUnload: false,
    shouldBlockFn: async ({ current, next }) => {
      if (reduced || current.pathname === next.pathname) return false
      if (active.current) return true
      active.current = true
      setBusy(true)
      void page.start({
        y: '-8vh',
        opacity: 0.65,
        transition: { duration: 0.9, ease: [0.76, 0, 0.2, 1] },
      })
      await cover.start({
        scaleY: 1,
        opacity: 1,
        transition: { duration: 0.7, ease: [0.76, 0, 0.2, 1] },
      })
      setReady(false)
      return false
    },
  })

  useEffect(() => {
    const finish = () => {
      if (!active.current) return
      clearTimeout(watchdog.current)
      page.stop()
      page.set({ y: 0, opacity: 1 })
      setReady(true)
      void cover
        .start({ opacity: 0, transition: { duration: 0.4 } })
        .then(() => {
          cover.set({ scaleY: 0 })
          active.current = false
          focusAfterEntry.current = true
          setBusy(false)
        })
    }
    const off = router.subscribe('onRendered', finish)
    // Recover the visible page even if an imported route fails before rendering.
    const offLoad = router.subscribe('onBeforeNavigate', () => {
      if (active.current) watchdog.current = setTimeout(finish, 8000)
    })
    return () => {
      off()
      offLoad()
      clearTimeout(watchdog.current)
      cover.stop()
      page.stop()
    }
  }, [router, cover, page])

  useLayoutEffect(() => {
    if (!busy && focusAfterEntry.current) {
      focusAfterEntry.current = false
      const hash = router.state.location.hash
      const target = hash
        ? document.getElementById(hash)?.querySelector<HTMLElement>('h1,h2')
        : main.current?.querySelector<HTMLElement>('h1')
      target?.setAttribute('tabindex', '-1')
      target?.focus({ preventScroll: true })
    }
  }, [busy, router])

  useEffect(() => {
    if (!busy) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [busy])

  useEffect(() => {
    let title = t('category')
    if (pathname === '/install') title = t('install')
    if (pathname === '/start') title = t('start')
    document.title = `LinkSense — ${title}`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('heroBody'))
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', document.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', t('heroBody'))
  }, [pathname, i18n.language, t])

  return (
    <EntryContext value={ready}>
      <a
        href="#main"
        className="fixed top-3 left-3 z-60 -translate-y-24 rounded-full bg-primary px-5 py-3 text-white focus:translate-y-0"
      >
        {t('skip')}
      </a>
      <div inert={busy}>
        <Header />
      </div>
      <motion.main
        id="main"
        ref={main}
        animate={page}
        inert={busy}
        className="pt-24"
      >
        <Outlet />
        <Footer />
      </motion.main>
      <motion.div
        data-testid="route-cover"
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-60 origin-bottom bg-white',
          busy ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        initial={{ scaleY: 0, opacity: 1 }}
        animate={cover}
      />
      <Cursor blocked={busy} />
    </EntryContext>
  )
}

export function RouteFallback({ error = false }: { error?: boolean }) {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-7 px-gutter text-center">
      <h1 className="text-section">{t(error ? 'error' : 'notFound')}</h1>
      <Link to="/" className={buttonVariants()}>
        {t('home')}
        <ArrowRight />
      </Link>
      {error && (
        <Button onClick={() => window.location.reload()}>{t('retry')}</Button>
      )}
    </div>
  )
}

export function PageIntro({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="px-gutter pt-12 pb-12 md:pt-16 md:pb-16">
      <div className="mx-auto grid max-w-280 items-end gap-7 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
        <RevealText as="h1" className="text-hero leading-[1.08]">
          {title}
        </RevealText>
        <div className="max-w-160 text-lg leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </section>
  )
}
