import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { getThought, around, formatDate, type Thought as Entry } from '../lib/thoughts'
import { renderMarkdown } from '../lib/markdown'
import { usePageMeta } from '../lib/usePageMeta'
import { Eyebrow, Reveal } from './primitives'

const BackToIndex = () => (
  <Link
    to="/thoughts"
    className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-muted transition-colors hover:text-ink"
  >
    <FiArrowLeft
      size={12}
      className="transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
    />
    All thoughts
  </Link>
)

/* ── prev / next, by date ── */
const Neighbour = ({
  entry,
  direction,
}: {
  entry: Entry
  direction: 'newer' | 'older'
}) => (
  <Link
    to={`/thoughts/${entry.slug}`}
    className={`group flex flex-1 flex-col gap-1 rounded-lg border border-hairline bg-surface p-4 transition-[border-color,box-shadow] duration-300 ease-out hover:border-line hover:shadow-card ${
      direction === 'older' ? 'sm:text-right' : ''
    }`}
  >
    <span className="font-mono text-[10px] uppercase tracking-label text-faint">
      {direction === 'newer' ? 'Newer' : 'Older'}
    </span>
    <span className="text-[13.5px] font-semibold leading-snug text-ink">
      {entry.title}
    </span>
  </Link>
)

const Thought = () => {
  const { slug } = useParams<{ slug: string }>()
  const entry = getThought(slug)

  usePageMeta(
    entry ? `${entry.title} — Jake Langlois` : 'Not found — Jake Langlois',
    entry?.summary || undefined,
  )

  const { html, headings } = useMemo(
    () => (entry ? renderMarkdown(entry.body) : { html: '', headings: [] }),
    [entry],
  )

  const { newer, older } = entry ? around(entry.slug) : {}
  const sections = headings.filter((heading) => heading.depth === 2)

  if (!entry) {
    return (
      <div className="mx-auto max-w-content px-6 pb-4 pt-10 md:pt-14">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-[30px] font-semibold tracking-display text-ink">
          That one doesn&rsquo;t exist
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          The entry may have been renamed. Everything I&rsquo;ve written is on
          the index.
        </p>
        <Link
          to="/thoughts"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-label text-canvas"
        >
          Thoughts index <FiArrowRight size={13} />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-content px-6 pb-4 pt-10 md:pt-14">
      <Reveal>
        <BackToIndex />

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted">
          {entry.icon && <span className="text-[14px]">{entry.icon}</span>}
          <span className="tnum">{formatDate(entry.date)}</span>
          <span className="text-faint">·</span>
          <span>{entry.readingMinutes} min read</span>
          {entry.updated && (
            <>
              <span className="text-faint">·</span>
              <span>updated {formatDate(entry.updated)}</span>
            </>
          )}
          {entry.draft && (
            <span className="rounded-sm bg-poppy/10 px-1.5 py-0.5 uppercase leading-none tracking-label text-poppy">
              draft — local only
            </span>
          )}
        </div>

        <h1 className="mt-3 text-[32px] font-semibold leading-[1.1] tracking-display text-ink md:text-[40px]">
          {entry.title}
        </h1>

        {entry.summary && (
          <p className="mt-4 max-w-[54ch] text-[16.5px] leading-relaxed text-body">
            {entry.summary}
          </p>
        )}

        {entry.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-surface-2 px-2 py-1 font-mono text-[11px] leading-none text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      {sections.length > 2 && (
        <Reveal delay={60}>
          <nav className="mt-9 rounded-lg border border-hairline bg-surface-2/60 p-4">
            <Eyebrow>On this page</Eyebrow>
            <ol className="mt-3 space-y-1.5">
              {sections.map((heading, i) => (
                <li key={heading.id} className="flex gap-2.5">
                  <span className="font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <a
                    href={`#${heading.id}`}
                    className="link-sweep text-[13.5px] leading-snug text-body transition-colors hover:text-ink"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      )}

      <div className="mt-9 border-t border-hairline pt-9">
        {/* Body is authored by hand in src/content/thoughts — trusted markdown. */}
        <article
          className="prose-note"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <div className="mt-12 border-t border-hairline pt-7">
        <div className="flex flex-col gap-3 sm:flex-row">
          {newer && <Neighbour entry={newer} direction="newer" />}
          {older && <Neighbour entry={older} direction="older" />}
        </div>
        <div className="mt-7 flex items-center justify-between">
          <BackToIndex />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[11px] uppercase tracking-label text-muted transition-colors hover:text-ink"
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}

export default Thought
