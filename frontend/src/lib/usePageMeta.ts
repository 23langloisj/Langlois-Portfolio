import { useEffect } from 'react'

const meta = () =>
  document.querySelector<HTMLMetaElement>('meta[name="description"]')

const DEFAULT_TITLE = document.title
const DEFAULT_DESCRIPTION = meta()?.content ?? ''

/** Sets the tab title + description for a route, restoring them on the way out. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    const tag = meta()
    if (description && tag) tag.content = description
    return () => {
      document.title = DEFAULT_TITLE
      if (tag) tag.content = DEFAULT_DESCRIPTION
    }
  }, [title, description])
}
