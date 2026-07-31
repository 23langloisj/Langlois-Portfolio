/**
 * The writing hub's content layer.
 *
 * Every `.md` file in `src/content/thoughts/` becomes an entry at
 * `/thoughts/<slug>` — no registry to update, no imports to add. See
 * `src/content/README.md` for the frontmatter fields.
 */

export interface Thought {
  slug: string
  title: string
  date: string // ISO yyyy-mm-dd
  updated?: string
  summary: string
  icon: string
  tags: string[]
  draft: boolean
  body: string // raw markdown, rendered on the entry page
  words: number
  readingMinutes: number
}

/* ── Frontmatter: a small YAML subset (scalars, inline + block lists) ── */

type MetaValue = string | string[] | boolean
type Meta = Record<string, MetaValue>

const unquote = (value: string) =>
  /^(['"]).*\1$/.test(value) ? value.slice(1, -1) : value

function parseFrontmatter(raw: string): { meta: Meta; body: string } {
  const match = /^﻿?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(
    raw,
  )
  if (!match) return { meta: {}, body: raw.trim() }

  const meta: Meta = {}
  let key = ''

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    // "  - item" continues the list started by the previous key
    const item = /^\s*-\s+(.*)$/.exec(line)
    if (item && key) {
      const list = Array.isArray(meta[key]) ? (meta[key] as string[]) : []
      list.push(unquote(item[1].trim()))
      meta[key] = list
      continue
    }

    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line)
    if (!pair) continue
    key = pair[1]
    const value = pair[2].trim()

    if (!value) meta[key] = [] // a block list (or nothing) follows
    else if (value === 'true' || value === 'false') meta[key] = value === 'true'
    else if (value.startsWith('[') && value.endsWith(']'))
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((part) => unquote(part.trim()))
        .filter(Boolean)
    else meta[key] = unquote(value)
  }

  return { meta, body: raw.slice(match[0].length).trim() }
}

const str = (value: MetaValue | undefined) =>
  typeof value === 'string' ? value : ''
const list = (value: MetaValue | undefined) =>
  Array.isArray(value) ? value : typeof value === 'string' ? [value] : []
const bool = (value: MetaValue | undefined) => value === true

/* ── Dates: formatted by hand so a yyyy-mm-dd never shifts a timezone ── */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(iso: string): string {
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!parts) return iso
  return `${MONTHS[Number(parts[2]) - 1]} ${Number(parts[3])}, ${parts[1]}`
}

export function yearOf(iso: string): string {
  return /^(\d{4})/.exec(iso)?.[1] ?? ''
}

/* ── Load every markdown file at build time ── */

const files = import.meta.glob<string>('../content/thoughts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function toThought(path: string, raw: string): Thought | null {
  const file = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
  if (!file || file.startsWith('_')) return null // _drafts / notes to self

  const { meta, body } = parseFrontmatter(raw)
  // A leading date in the filename is for ordering on disk, not for the URL.
  const slug = str(meta.slug) || file.replace(/^\d{4}-\d{2}-\d{2}-/, '')
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return {
    slug,
    title: str(meta.title) || slug.replace(/-/g, ' '),
    date: str(meta.date) || /^(\d{4}-\d{2}-\d{2})/.exec(file)?.[1] || '',
    updated: str(meta.updated) || undefined,
    summary: str(meta.summary),
    icon: str(meta.icon),
    tags: list(meta.tags),
    draft: bool(meta.draft),
    body,
    words,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  }
}

/** Newest first. */
export const allThoughts: Thought[] = Object.entries(files)
  .map(([path, raw]) => toThought(path, raw))
  .filter((entry): entry is Thought => entry !== null)
  .sort((a, b) =>
    a.date === b.date ? a.title.localeCompare(b.title) : a.date < b.date ? 1 : -1,
  )

/** What the site shows: drafts stay local until `draft: true` comes off. */
export const thoughts: Thought[] = allThoughts.filter(
  (entry) => !entry.draft || import.meta.env.DEV,
)

export const getThought = (slug?: string) =>
  thoughts.find((entry) => entry.slug === slug)

/** Neighbours in the published list, for the prev/next footer. */
export function around(slug: string): { newer?: Thought; older?: Thought } {
  const i = thoughts.findIndex((entry) => entry.slug === slug)
  if (i < 0) return {}
  return { newer: thoughts[i - 1], older: thoughts[i + 1] }
}

/** Every tag in use, most-used first. */
export function allTags(): string[] {
  const counts = new Map<string, number>()
  thoughts.forEach((entry) =>
    entry.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1)),
  )
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}
