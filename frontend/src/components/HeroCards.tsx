import { PointerEvent as ReactPointerEvent, useRef } from 'react'
import { useCountUp } from '../lib/useCountUp'
import barbarianKing from '../assets/heroes/barbarian-king.webp'
import archerQueen from '../assets/heroes/archer-queen.webp'
import grandWarden from '../assets/heroes/grand-warden.webp'
import royalChampion from '../assets/heroes/royal-champion.webp'
import minionPrince from '../assets/heroes/minion-prince.webp'
import dragonDuke from '../assets/heroes/dragon-duke.webp'

export type Hero = {
  name: string
  level: number
  maxLevel: number
  village?: string
}

type Meta = { art: string; accent: string; order: number }

// accent is a space-separated RGB triple so it can be alpha-composited in CSS.
const HERO_META: Record<string, Meta> = {
  'Barbarian King': { art: barbarianKing, accent: '245 176 66', order: 0 },
  'Archer Queen': { art: archerQueen, accent: '232 92 158', order: 1 },
  'Minion Prince': { art: minionPrince, accent: '150 118 224', order: 2 },
  'Grand Warden': { art: grandWarden, accent: '52 199 191', order: 3 },
  'Royal Champion': { art: royalChampion, accent: '234 88 63', order: 4 },
  'Dragon Duke': { art: dragonDuke, accent: '214 63 63', order: 5 },
}

// Skip the cursor-tilt on touch screens and for reduced-motion users.
const staticOnly = () =>
  typeof window !== 'undefined' &&
  (!!window.matchMedia?.('(pointer: coarse)').matches ||
    !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

const HeroCard = ({ hero }: { hero: Hero }) => {
  const meta = HERO_META[hero.name]
  const ref = useRef<HTMLDivElement>(null)
  const level = useCountUp(hero.level, true)
  const maxed = hero.level >= hero.maxLevel
  const pct = Math.min(100, Math.round((hero.level / hero.maxLevel) * 100))

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || staticOnly()) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * 15}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 17}deg`)
    el.style.setProperty('--px', `${px * 100}%`)
    el.style.setProperty('--py', `${py * 100}%`)
    el.style.setProperty('--active', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--active', '0')
  }

  return (
    <div
      ref={ref}
      className="hero-card"
      style={{ '--accent': meta.accent } as React.CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="hero-card__inner">
        <div className="hero-card__art">
          <div className="hero-card__glow" />
          <img src={meta.art} alt={hero.name} loading="lazy" draggable={false} />
          <div className="hero-card__holo" />
          <div className="hero-card__glare" />
          {maxed && <span className="hero-card__max">MAX</span>}
        </div>
        <div className="hero-card__meta">
          <span className="hero-card__name">{hero.name}</span>
          <div className="hero-card__lvl">
            <span className="tnum">{level}</span>
            <span className="hero-card__cap">/ {hero.maxLevel}</span>
          </div>
          <span className="hero-card__bar">
            <span style={{ width: `${pct}%` }} />
          </span>
        </div>
      </div>
    </div>
  )
}

const HeroCards = ({ heroes, clan }: { heroes: Hero[]; clan?: string }) => {
  const list = heroes
    .filter((h) => HERO_META[h.name])
    .sort((a, b) => HERO_META[a.name].order - HERO_META[b.name].order)

  if (!list.length) return null

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-label text-muted">
          Heroes
        </span>
        <span className="h-px flex-grow bg-hairline" />
        {clan && (
          <span className="font-mono text-[10px] text-faint">{clan}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        {list.map((h) => (
          <HeroCard key={h.name} hero={h} />
        ))}
      </div>
    </div>
  )
}

export default HeroCards
