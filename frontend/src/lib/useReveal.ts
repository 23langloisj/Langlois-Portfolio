import { useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` the first time an element is in view.
 *
 * Robustness first: anything already on screen at mount reveals immediately
 * (no dependency on IntersectionObserver timing), below-the-fold elements
 * reveal as they scroll in, and a failsafe guarantees content is never left
 * hidden even if IntersectionObserver never fires.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => {
      if (delay) el.style.transitionDelay = `${delay}ms`
      el.classList.add('is-visible')
    }

    // Already in view (e.g. above the fold on load) → reveal right away.
    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight && rect.bottom > 0
    if (inView || typeof IntersectionObserver === 'undefined') {
      show()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          io.disconnect()
          clearTimeout(failsafe)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    // Never leave content invisible if the observer never fires.
    const failsafe = window.setTimeout(() => {
      show()
      io.disconnect()
    }, 2500)

    return () => {
      io.disconnect()
      clearTimeout(failsafe)
    }
  }, [delay])

  return ref
}
