# Writing a new thought

Drop a markdown file in `src/content/thoughts/` and it appears on `/thoughts`.
Nothing else to update — no imports, no list of posts, no route to add.

```
src/content/thoughts/2026-08-14-caching-is-a-lie.md   →   /thoughts/caching-is-a-lie
```

The filename becomes the URL. A leading `YYYY-MM-DD-` is stripped from the slug
(it's just there to keep the folder sorted on disk), so keep the rest of the
name short, lowercase, and hyphenated.

## Frontmatter

```markdown
---
title: Caching is a lie
date: 2026-08-14
icon: 🧊
summary: One sentence that shows up on the index and in link previews.
tags: [engineering, caching]
---

Body starts here. Plain markdown.
```

| Field     | Required | What it does                                                        |
| --------- | -------- | ------------------------------------------------------------------- |
| `title`   | yes      | Heading on the entry, label on the index, tab title                 |
| `date`    | yes      | `YYYY-MM-DD`. Sorts the index (newest first) and groups by year      |
| `summary` | no       | Dek under the title + the two-line blurb on the index               |
| `icon`    | no       | One emoji, shown in the index tile. Falls back to a document glyph  |
| `tags`    | no       | `[a, b]` or a `- a` list. Filter buttons appear once there are 2+ tags across 3+ entries |
| `updated` | no       | `YYYY-MM-DD`, shown as "updated …" next to the date                 |
| `draft`   | no       | `true` keeps it off the live site — it only renders in `npm run dev` |
| `slug`    | no       | Override the URL if the filename isn't what you want                |

Reading time is counted from the body, so don't set it.

## Body

Standard markdown (GitHub flavored): `##`/`###` headings, lists, tables,
blockquotes, fenced code, bold, links. Notes on a few things:

- **Headings** — use `##` for sections. Three or more `##` and an "on this page"
  list appears above the article automatically. Skip `#`; the title is the `h1`.
- **Links** — external ones open in a new tab on their own. In-site links like
  `[the kitchen](/sheflang)` stay in the tab.
- **Images** — put the file in `frontend/public/` and reference it from the root:
  `![alt](/my-diagram.png)`. Public files are served as-is, so compress them first.
- **Code** — fenced blocks render in JetBrains Mono with no syntax highlighting.

## Starting one you're not ready to publish

Either set `draft: true`, or prefix the filename with an underscore
(`_half-baked.md`) to have it ignored entirely.

## Where the code lives

- `src/lib/thoughts.ts` — loads the files, parses frontmatter, sorts, reading time
- `src/lib/markdown.ts` — markdown → HTML (`marked`) + heading ids
- `src/components/Thoughts.tsx` — the index
- `src/components/Thought.tsx` — a single entry
- `.prose-note` in `src/styles/tailwind.css` — how the rendered markdown is styled
