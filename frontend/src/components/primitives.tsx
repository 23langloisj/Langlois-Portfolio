import { ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

/* ── Reveal: wraps content in a subtle scroll-in transition ── */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>(delay)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ── Eyebrow: the mono uppercase label used everywhere ── */
export function Eyebrow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-mono text-eyebrow uppercase tracking-label text-muted ${className}`}
    >
      {children}
    </span>
  )
}

/* ── Section: the one centered 660px column + section rhythm ── */
export function Section({
  id,
  index,
  title,
  action,
  children,
  className = '',
}: {
  id?: string
  index?: string
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-content px-6 pt-[72px] md:pt-[88px] scroll-mt-24 ${className}`}
    >
      {(title || index) && (
        <Reveal>
          <div className="mb-7 flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-3">
              {index && <Eyebrow>{index}</Eyebrow>}
              {title && (
                <h2 className="text-[15px] font-semibold tracking-heading text-ink">
                  {title}
                </h2>
              )}
            </div>
            {action}
          </div>
        </Reveal>
      )}
      {children}
    </section>
  )
}

/* ── Chip: mono meta tag (tech stack, etc.) ── */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-surface-2 px-2 py-1 font-mono text-[11px] leading-none text-muted">
      {children}
    </span>
  )
}
