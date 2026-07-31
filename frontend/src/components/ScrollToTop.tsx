import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New page, top of the page — unless the URL points at an anchor. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
