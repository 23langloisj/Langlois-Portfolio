import { Marked } from 'marked'

export interface Heading {
  id: string
  text: string
  depth: number
}

const slugify = (value: string) =>
  value
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Renders a post body to HTML and collects its headings (for the "on this page"
 * list). Headings get stable slug ids so they're linkable.
 */
export function renderMarkdown(source: string): {
  html: string
  headings: Heading[]
} {
  const headings: Heading[] = []
  const used = new Set<string>()
  const md = new Marked({ gfm: true })

  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens)
        const base = slugify(inner) || `section-${headings.length + 1}`
        let id = base
        for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`
        used.add(id)
        headings.push({ id, text: inner.replace(/<[^>]+>/g, ''), depth })
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`
      },
      // Outbound links open in a new tab; in-site links stay in the tab.
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)
        const external = /^(https?:|mailto:|\/\/)/.test(href)
        const attrs = [
          `href="${href}"`,
          title ? `title="${title}"` : '',
          external ? 'target="_blank" rel="noreferrer"' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return `<a ${attrs}>${text}</a>`
      },
    },
  })

  return { html: md.parse(source) as string, headings }
}
