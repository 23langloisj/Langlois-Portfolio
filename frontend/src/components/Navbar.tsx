import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { ThemeToggle } from '../lib/theme'

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Work', target: 'work' },
  { label: 'Kitchen', target: '/sheflang' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently crossing the viewport middle.
  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return
    }
    const ids = ['about', 'experience', 'work']
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  const isActive = (target: string) =>
    target === '/sheflang' ? pathname === '/sheflang' : active === target

  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const handleNav = (target: string) => {
    setOpen(false)
    if (target.startsWith('/')) {
      navigate(target)
      window.scrollTo(0, 0)
      return
    }
    if (pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(target), 90)
    } else {
      scrollToId(target)
    }
  }

  const goHome = () => {
    setOpen(false)
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
    else {
      navigate('/')
      window.scrollTo(0, 0)
    }
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-hairline bg-canvas/85 backdrop-blur-md'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        {/* Monogram + wordmark */}
        <button
          onClick={goHome}
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink font-mono text-[13px] font-bold leading-none text-canvas transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            jl
          </span>
          <span className="hidden font-mono text-[13px] text-body transition-colors group-hover:text-ink sm:inline">
            jakelanglois.com
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNav(item.target)}
                  className={`relative rounded-md px-3 py-2 font-mono text-[12px] uppercase tracking-label transition-colors ${
                    isActive(item.target)
                      ? 'text-ink'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-link transition-all duration-300 ease-out ${
                      isActive(item.target) ? 'w-4 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => window.dispatchEvent(new Event('cmdk:open'))}
            aria-label="Open command menu"
            className="ml-1 flex items-center gap-2 rounded-md border border-hairline px-2.5 py-1.5 text-muted transition-colors hover:border-line hover:text-ink"
          >
            <FiSearch size={14} />
            <span className="hidden font-mono text-[11px] sm:inline">⌘K</span>
          </button>

          <ThemeToggle />

          <a
            href="Langlois_Resume.pdf"
            download
            className="ml-1 hidden rounded-md border border-line px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-label text-ink transition-colors duration-200 hover:bg-surface-2 sm:block"
          >
            Résumé
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-9 w-9 place-items-center rounded-md text-body transition-colors hover:bg-surface-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-hairline bg-canvas/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto max-w-content px-6 py-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => handleNav(item.target)}
                className="w-full border-b border-hairline py-3 text-left font-mono text-[13px] uppercase tracking-label text-body transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="Langlois_Resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="block py-3 text-left font-mono text-[13px] uppercase tracking-label text-body transition-colors hover:text-ink"
            >
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
