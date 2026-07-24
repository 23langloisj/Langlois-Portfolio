import { useEffect, useState, ReactNode } from 'react'
import { Reveal } from './primitives'
import { useCountUp } from '../lib/useCountUp'

const ENDPOINT =
  'https://portfolio-backend-u4bb.onrender.com/api/clash/%23200VUR9YR'

const FEATURED_HEROES = [
  'Barbarian King',
  'Archer Queen',
  'Grand Warden',
  'Royal Champion',
]

type Hero = { name: string; level: number }

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-panel">
    {children}
  </div>
)

const Header = ({ state }: { state: 'live' | 'syncing' | 'offline' }) => {
  const dot =
    state === 'live'
      ? 'bg-signal'
      : state === 'syncing'
        ? 'bg-faint'
        : 'bg-poppy'
  const label =
    state === 'live' ? 'LIVE' : state === 'syncing' ? 'SYNC' : 'OFFLINE'
  return (
    <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-[7px] w-[7px]">
          {state === 'live' && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60" />
          )}
          <span
            className={`relative inline-flex h-[7px] w-[7px] rounded-full ${dot}`}
          />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-label text-muted">
          {label}
        </span>
        <span className="font-mono text-[11px] text-body">Clash of Clans</span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-label text-faint">
        Supercell API
      </span>
    </div>
  )
}

const Stat = ({ label, value }: { label: string; value: number }) => {
  const n = useCountUp(value, true)
  return (
    <div className="px-4 py-3.5">
      <div className="font-mono text-[10px] uppercase tracking-label text-muted">
        {label}
      </div>
      <div className="tnum mt-1.5 text-[22px] font-semibold leading-none text-ink">
        {n.toLocaleString('en-US')}
      </div>
    </div>
  )
}

const ClashStats = () => {
  const [data, setData] = useState<any>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    let alive = true
    fetch(ENDPOINT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => {
        if (!alive) return
        setData(json)
        setStatus('ok')
      })
      .catch(() => alive && setStatus('error'))
    return () => {
      alive = false
    }
  }, [])

  if (status === 'loading') {
    return (
      <Reveal>
        <Panel>
          <Header state="syncing" />
          <div className="animate-pulse px-4 py-10 text-center font-mono text-[11px] uppercase tracking-label text-faint">
            Syncing live data&hellip;
          </div>
        </Panel>
      </Reveal>
    )
  }

  if (status === 'error' || !data) {
    return (
      <Reveal>
        <Panel>
          <Header state="offline" />
          <div className="px-4 py-8 text-center font-mono text-[11px] uppercase tracking-label text-faint">
            Feed unavailable &mdash; the free backend may be asleep.
          </div>
        </Panel>
      </Reveal>
    )
  }

  const trophies = data.trophies > 0 ? data.trophies : data.bestTrophies
  const heroes: Hero[] = (data.heroes ?? []).filter((h: Hero) =>
    FEATURED_HEROES.includes(h.name),
  )
  const maxHeroLevel = Math.max(1, ...heroes.map((h) => h.level))
  const latest = data.achievements?.[data.achievements.length - 1]

  return (
    <Reveal>
      <Panel>
        <Header state="live" />

        {/* Stat grid */}
        <div className="grid grid-cols-2 divide-x divide-hairline sm:grid-cols-4">
          <div className="divide-y divide-hairline sm:divide-y-0">
            <Stat label="Town Hall" value={data.townHallLevel ?? 0} />
          </div>
          <div>
            <Stat label="Trophies" value={trophies ?? 0} />
          </div>
          <div className="border-t border-hairline sm:border-t-0">
            <Stat label="War Stars" value={data.warStars ?? 0} />
          </div>
          <div className="border-t border-hairline sm:border-t-0">
            <Stat label="XP Level" value={data.expLevel ?? 0} />
          </div>
        </div>

        {/* Heroes */}
        {heroes.length > 0 && (
          <div className="border-t border-hairline px-4 py-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-label text-muted">
                Heroes
              </span>
              <span className="h-px flex-grow bg-hairline" />
              {data.clan?.name && (
                <span className="font-mono text-[10px] text-faint">
                  {data.clan.name}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {heroes.map((hero) => (
                <div key={hero.name} className="flex items-center gap-3">
                  <span className="w-[112px] shrink-0 truncate text-[12px] text-body">
                    {hero.name}
                  </span>
                  <span className="h-1 flex-grow overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-ink/80"
                      style={{
                        width: `${(hero.level / maxHeroLevel) * 100}%`,
                      }}
                    />
                  </span>
                  <span className="tnum w-6 shrink-0 text-right font-mono text-[12px] font-semibold text-ink">
                    {hero.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Latest milestone */}
        {latest && (
          <div className="flex items-start gap-2 border-t border-hairline px-4 py-3">
            <span className="mt-[3px] font-mono text-[10px] uppercase tracking-label text-muted">
              Latest
            </span>
            <p className="text-[12px] leading-snug text-body">
              <span className="font-medium text-ink">{latest.name}</span>
              {latest.info ? ` — ${latest.info}` : ''}
            </p>
          </div>
        )}
      </Panel>
    </Reveal>
  )
}

export default ClashStats
