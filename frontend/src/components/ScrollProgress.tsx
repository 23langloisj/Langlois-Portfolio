import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div
        className="h-full bg-link"
        style={{ width: `${pct}%`, transition: 'width 120ms linear' }}
      />
    </div>
  )
}

export default ScrollProgress
