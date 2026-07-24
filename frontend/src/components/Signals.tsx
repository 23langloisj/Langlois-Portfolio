import { useEffect, useState, ReactNode } from 'react'
import { Section, Reveal } from './primitives'
import { useCountUp } from '../lib/useCountUp'

const USER = '23langloisj'

interface Day {
  date: string
  count: number
  level: number
}
interface GhData {
  repos: number
  stars: number
  followers: number
  topLang: string
  contribTotal: number
  days: Day[]
}

const cellBg = (level: number) =>
  level === 0
    ? { backgroundColor: 'rgb(var(--surface-2))' }
    : {
        backgroundColor: `rgb(var(--signal) / ${
          [0, 0.28, 0.5, 0.72, 1][level] ?? 1
        })`,
      }

const Tile = ({
  label,
  value,
  text,
}: {
  label: string
  value?: number
  text?: string
}) => {
  const n = useCountUp(value ?? 0, value != null)
  return (
    <div className="px-4 py-3.5">
      <div className="font-mono text-[10px] uppercase tracking-label text-muted">
        {label}
      </div>
      <div className="tnum mt-1.5 truncate text-[22px] font-semibold leading-none text-ink">
        {text ?? n.toLocaleString('en-US')}
      </div>
    </div>
  )
}

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="overflow-hidden rounded-lg border border-hairline bg-surface shadow-panel">
    {children}
  </div>
)

const Header = ({ live }: { live: boolean }) => (
  <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-[7px] w-[7px]">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal/60" />
        )}
        <span
          className={`relative inline-flex h-[7px] w-[7px] rounded-full ${
            live ? 'bg-signal' : 'bg-poppy'
          }`}
        />
      </span>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-label text-muted">
        {live ? 'LIVE' : 'OFFLINE'}
      </span>
      <span className="font-mono text-[11px] text-body">GitHub</span>
    </div>
    <span className="font-mono text-[10px] uppercase tracking-label text-faint">
      api.github.com
    </span>
  </div>
)

const Signals = () => {
  const [data, setData] = useState<GhData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    let alive = true

    const load = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
        ])
        if (!profileRes.ok || !reposRes.ok) throw new Error('gh')
        const profile = await profileRes.json()
        const repos: any[] = await reposRes.json()

        const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
        const langCount: Record<string, number> = {}
        repos.forEach((r) => {
          if (r.language && !r.fork)
            langCount[r.language] = (langCount[r.language] || 0) + 1
        })
        const topLang =
          Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

        // Contributions (best-effort; heatmap hides if it fails)
        let days: Day[] = []
        let contribTotal = 0
        try {
          const cRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
          )
          if (cRes.ok) {
            const c = await cRes.json()
            days = c.contributions ?? []
            contribTotal =
              c.total?.lastYear ??
              days.reduce((s: number, d: Day) => s + d.count, 0)
          }
        } catch {
          /* heatmap optional */
        }

        if (!alive) return
        setData({
          repos: profile.public_repos ?? repos.length,
          stars,
          followers: profile.followers ?? 0,
          topLang,
          contribTotal,
          days,
        })
        setStatus('ok')
      } catch {
        if (alive) setStatus('error')
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  // Align the heatmap so the first column starts on the correct weekday.
  const padded: (Day | null)[] = (() => {
    if (!data?.days.length) return []
    const first = new Date(data.days[0].date).getDay()
    return [...Array(first).fill(null), ...data.days]
  })()

  return (
    <Section
      id="signals"
      index="04"
      title="GitHub"
      action={
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noreferrer"
          className="link-sweep font-mono text-[12px] text-link transition-colors hover:text-link-hover"
        >
          @{USER}
        </a>
      }
    >
      <Reveal>
        <p className="mb-6 max-w-[52ch] text-[15px] leading-relaxed text-body">
          A second live feed to go with the Clash panel &mdash; this one&rsquo;s
          the code. Pulled straight from the GitHub API on load.
        </p>
      </Reveal>

      <Reveal>
        <Panel>
          {status === 'loading' && (
            <>
              <Header live={false} />
              <div className="animate-pulse px-4 py-12 text-center font-mono text-[11px] uppercase tracking-label text-faint">
                Fetching commits&hellip;
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <Header live={false} />
              <div className="px-4 py-10 text-center font-mono text-[11px] uppercase tracking-label text-faint">
                GitHub feed unavailable — rate limit or network.
              </div>
            </>
          )}

          {status === 'ok' && data && (
            <>
              <Header live />

              <div className="grid grid-cols-2 divide-x divide-hairline sm:grid-cols-4">
                <Tile label="Repos" value={data.repos} />
                <Tile label="Stars" value={data.stars} />
                <div className="border-t border-hairline sm:border-t-0">
                  <Tile label="Followers" value={data.followers} />
                </div>
                <div className="border-t border-hairline sm:border-t-0">
                  <Tile label="Top lang" text={data.topLang} />
                </div>
              </div>

              {padded.length > 0 && (
                <div className="border-t border-hairline px-4 py-4">
                  <div className="mb-3 flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-label text-muted">
                      Contributions
                    </span>
                    <span className="tnum font-mono text-[11px] text-body">
                      {data.contribTotal.toLocaleString('en-US')} in the last
                      year
                    </span>
                  </div>

                  <div className="overflow-x-auto no-scrollbar">
                    <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                      {padded.map((d, i) => (
                        <div
                          key={i}
                          title={d ? `${d.date}: ${d.count}` : undefined}
                          className="h-[9px] w-[9px] rounded-[2px]"
                          style={d ? cellBg(d.level) : { opacity: 0 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-faint">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((l) => (
                      <span
                        key={l}
                        className="h-[9px] w-[9px] rounded-[2px]"
                        style={cellBg(l)}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              )}
            </>
          )}
        </Panel>
      </Reveal>
    </Section>
  )
}

export default Signals
