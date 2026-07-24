import { useEffect, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Animates 0 → target with an ease-out curve once `active` becomes true.
 * Respects reduced-motion (snaps to the final value).
 */
export function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (prefersReduced() || duration <= 0) {
      setValue(target)
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return value
}
