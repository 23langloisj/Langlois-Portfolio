import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export interface SectionLink {
  label: string
  target: string // element id, or a path starting with "/"
}

export const SECTIONS: SectionLink[] = [
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Signals', target: 'signals' },
  { label: 'Contact', target: 'contact' },
]

export const EXTERNAL = {
  github: 'https://github.com/23langloisj',
  linkedin: 'https://www.linkedin.com/in/jacob-langlois/',
  instagram: 'https://www.instagram.com/jake.langlois1/',
  email: 'mailto:langlois.j@northeastern.edu',
  resume: '/Langlois_Resume.pdf',
}

/** Shared navigation used by the navbar, command palette, and hero. */
export function useSiteNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const go = useCallback(
    (target: string) => {
      if (target.startsWith('/')) {
        navigate(target)
        window.scrollTo(0, 0)
        return
      }
      if (pathname !== '/') {
        navigate('/')
        window.setTimeout(() => scrollToId(target), 90)
      } else {
        scrollToId(target)
      }
    },
    [navigate, pathname, scrollToId],
  )

  return { go, scrollToId, pathname }
}
