import { useEffect, useRef } from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FaInstagram } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import ClashStats from './ClashStats'
import { Reveal } from './primitives'
import { useMagnetic } from '../lib/useMagnetic'

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const linkClass =
  'font-medium text-link underline decoration-link/25 underline-offset-[3px] transition-colors hover:text-link-hover hover:decoration-link/60'

const Intro = () => {
  const headerRef = useRef<HTMLElement>(null)
  const magneticRef = useMagnetic<HTMLButtonElement>()

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    const spot = el.querySelector<HTMLElement>('.spotlight')
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    const onEnter = () => spot?.classList.add('is-live')
    const onLeave = () => spot?.classList.remove('is-live')
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <header id="top" ref={headerRef} className="relative overflow-hidden">
      {/* Backdrop: engineering dot-grid + cursor spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dotgrid opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_-5%,#000_5%,transparent_72%)]" />
        <div className="spotlight" />
      </div>

      <div className="mx-auto max-w-content px-6 pb-2 pt-10 md:pt-14">
        <Reveal>
          <div className="mb-5 flex items-center gap-2 font-mono text-eyebrow uppercase tracking-label text-muted">
            <span>CS + Math</span>
            <span className="text-line">/</span>
            <span>Northeastern &rsquo;27</span>
          </div>

          <h1 className="text-[38px] font-semibold leading-[1.05] tracking-display text-ink md:text-[52px]">
            Jake Langlois
          </h1>

          <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-body md:text-[18px]">
            I&rsquo;m a software engineer studying CS + Math at{' '}
            <a
              href="https://www.northeastern.edu/"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Northeastern
            </a>
            . I&rsquo;ve shipped features across fintech and media &mdash;
            currently building at{' '}
            <a
              href="https://www.klaviyo.com/"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Klaviyo
            </a>
            , previously eMoney, Smartleaf, and the SEI at Carnegie Mellon. I
            like clean systems, fast feedback loops, and tools people actually
            use.
          </p>

          {/* Availability + actions */}
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-[13px] text-body">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-signal" />
              </span>
              Open to opportunities
            </span>

            <div className="flex items-center gap-3">
              <button
                ref={magneticRef}
                onClick={() => scrollToId('work')}
                className="rounded-md bg-ink px-4 py-2.5 text-[14px] font-medium text-canvas transition-transform duration-200 ease-out"
              >
                View work
              </button>
              <button
                onClick={() => scrollToId('contact')}
                className="link-sweep inline-flex items-center gap-1 py-2.5 text-[14px] font-medium text-link transition-colors hover:text-link-hover"
              >
                Get in touch <FiArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Socials + ⌘K hint */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-5 text-muted">
              <a
                href="https://github.com/23langloisj"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-ink"
              >
                <AiFillGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jacob-langlois/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-ink"
              >
                <AiFillLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/jake.langlois1/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-ink"
              >
                <FaInstagram size={18} />
              </a>
            </div>

            <button
              onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
              className="hidden items-center gap-1.5 font-mono text-[11px] text-faint transition-colors hover:text-muted sm:inline-flex"
            >
              Press
              <kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 text-[10px] text-muted">
                ⌘K
              </kbd>
              to jump anywhere
            </button>
          </div>
        </Reveal>

        {/* Signature: live Clash of Clans readout */}
        <div className="mt-11 md:mt-14">
          <ClashStats />
        </div>
      </div>
    </header>
  )
}

export default Intro
