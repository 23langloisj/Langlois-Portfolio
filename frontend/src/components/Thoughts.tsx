import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiFileText } from 'react-icons/fi'
import {
  thoughts,
  allTags,
  formatDate,
  yearOf,
  type Thought,
} from '../lib/thoughts'
import { usePageMeta } from '../lib/usePageMeta'
import { Eyebrow, Reveal } from './primitives'

/* ── One entry in the list ── */
const Row = ({ entry }: { entry: Thought }) => (
  <Link
    to={`/thoughts/${entry.slug}`}
    className="group flex gap-4 rounded-lg border border-hairline bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-line hover:shadow-card"
  >
    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-hairline bg-surface-2 text-[16px] leading-none">
      {entry.icon || <FiFileText size={15} className="text-muted" />}
    </span>

    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-heading text-ink">
          {entry.title}
        </h2>
        <FiArrowUpRight
          size={15}
          className="mt-0.5 shrink-0 text-faint transition-[transform,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
        />
      </div>

      {entry.summary && (
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-body">
          {entry.summary}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted">
        <span className="tnum">{formatDate(entry.date)}</span>
        <span className="text-faint">·</span>
        <span>{entry.readingMinutes} min</span>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-surface-2 px-1.5 py-0.5 leading-none text-muted"
          >
            {tag}
          </span>
        ))}
        {entry.draft && (
          <span className="rounded-sm bg-poppy/10 px-1.5 py-0.5 uppercase leading-none tracking-label text-poppy">
            draft
          </span>
        )}
      </div>
    </div>
  </Link>
)

const Thoughts = () => {
  usePageMeta(
    'Thoughts — Jake Langlois',
    'Notes and essays by Jake Langlois on software, school, and whatever else is on my mind.',
  )

  const [tag, setTag] = useState<string | null>(null)
  const tags = allTags()

  const visible = useMemo(
    () => (tag ? thoughts.filter((entry) => entry.tags.includes(tag)) : thoughts),
    [tag],
  )

  // Group by year, and only label the years once there's more than one.
  const groups = useMemo(() => {
    const byYear = new Map<string, Thought[]>()
    visible.forEach((entry) => {
      const year = yearOf(entry.date) || '—'
      byYear.set(year, [...(byYear.get(year) ?? []), entry])
    })
    return [...byYear.entries()]
  }, [visible])

  const latest = thoughts[0]

  return (
    <div className="mx-auto max-w-content px-6 pb-4 pt-10 md:pt-14">
      <Reveal>
        <Eyebrow>Writing</Eyebrow>
        <h1 className="mt-4 text-[38px] font-semibold leading-[1.05] tracking-display text-ink md:text-[46px]">
          Thoughts
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-body">
          journal of sorts
        </p>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-label text-faint">
          {thoughts.length} {thoughts.length === 1 ? 'entry' : 'entries'}
          {latest && ` · latest ${formatDate(latest.date)}`}
        </div>
      </Reveal>

      {tags.length > 1 && thoughts.length > 2 && (
        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[null, ...tags].map((value) => (
              <button
                key={value ?? 'all'}
                onClick={() => setTag(value)}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                  tag === value
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-hairline text-muted hover:border-line hover:text-ink'
                }`}
              >
                {value ?? 'all'}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <div className="mt-9 space-y-9">
        {groups.map(([year, entries]) => (
          <div key={year}>
            {groups.length > 1 && (
              <div className="mb-4 flex items-center gap-3">
                <Eyebrow>{year}</Eyebrow>
                <span className="h-px flex-1 bg-hairline" />
              </div>
            )}
            <div className="space-y-3">
              {entries.map((entry, i) => (
                <Reveal key={entry.slug} delay={Math.min(i * 40, 200)}>
                  <Row entry={entry} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        {!visible.length && (
          <p className="rounded-lg border border-dashed border-hairline p-8 text-center text-[13.5px] text-muted">
            Nothing here yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default Thoughts
