import { useEffect, useState, ReactNode } from 'react'
import { Reveal } from './primitives'
import { useCountUp } from '../lib/useCountUp'
import HeroCards from './HeroCards'

const ENDPOINT =
  'https://portfolio-backend-u4bb.onrender.com/api/clash/%23200VUR9YR'

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
  const latest = data.achievements?.[data.achievements.length - 1]

  return (
    <Reveal>
      <div className="space-y-3">
        <Panel>
          <Header state="live" />

          {/* Stat grid (2×2) */}
          <div className="grid grid-cols-2">
            <div className="border-b border-r border-hairline">
              <Stat label="Town Hall" value={data.townHallLevel ?? 0} />
            </div>
            <div className="border-b border-hairline">
              <Stat label="Trophies" value={trophies ?? 0} />
            </div>
            <div className="border-r border-hairline">
              <Stat label="War Stars" value={data.warStars ?? 0} />
            </div>
            <div>
              <Stat label="XP Level" value={data.expLevel ?? 0} />
            </div>
          </div>

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

        {/* Interactive hero collection (live levels from the same feed) */}
        <HeroCards heroes={data.heroes ?? []} clan={data.clan?.name} />
      </div>
    </Reveal>
  )
}

export default ClashStats
