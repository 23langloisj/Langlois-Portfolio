import { useEffect, useRef, useState } from 'react'
import type { SkinViewer } from 'skinview3d'

const MC_USERNAME = 'Awesomelang16'
const MC_UUID = '92d9c036-89a0-4ba9-9f91-4465d74dcc49'

// Skin texture (CORS-enabled). Crafatar by UUID is the most reliable; MCHeads
// by username is the fallback. Both resolve the player's *current* skin, so the
// site updates itself whenever the skin changes in-game.
const SKIN_PRIMARY = `https://crafatar.com/skins/${MC_UUID}`
const SKIN_FALLBACK = `https://mc-heads.net/skin/${MC_USERNAME}`
// Last-resort static 2D body render (no WebGL / dynamic import needed).
const RENDER_FALLBACK = `https://mc-heads.net/body/${MC_USERNAME}/right.png`

type Status = 'loading' | 'ready' | 'error'

const ASPECT = 1.3

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Interactive 3D Minecraft character. Drag to rotate a full 360° (see the back,
 * sides, everything); gently auto-spins when idle. `skinview3d` (which bundles
 * three.js) is dynamically imported and only booted once the avatar nears the
 * viewport, so it never weighs down the initial page load.
 */
const MinecraftAvatar = ({ className = '' }: { className?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    let disposed = false
    let started = false
    let viewer: SkinViewer | null = null
    let io: IntersectionObserver | null = null
    let ro: ResizeObserver | null = null

    const sizeFor = () => {
      const w = Math.max(180, wrap.clientWidth)
      return { w, h: Math.round(w * ASPECT) }
    }

    const boot = async () => {
      let mod: typeof import('skinview3d')
      try {
        mod = await import('skinview3d')
      } catch {
        if (!disposed) setStatus('error')
        return
      }
      if (disposed) return

      const { w, h } = sizeFor()
      viewer = new mod.SkinViewer({ canvas, width: w, height: h, fov: 38, zoom: 0.84 })

      // Rotate only — never hijack page scroll (zoom off) and no panning.
      viewer.controls.enableZoom = false
      viewer.controls.enablePan = false
      viewer.controls.enableRotate = true

      if (!reducedMotion()) {
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 0.5
        const idle = new mod.IdleAnimation()
        idle.speed = 0.6
        viewer.animation = idle
      }

      try {
        await viewer.loadSkin(SKIN_PRIMARY, { model: 'auto-detect' })
      } catch {
        try {
          await viewer.loadSkin(SKIN_FALLBACK, { model: 'auto-detect' })
        } catch {
          if (!disposed) setStatus('error')
          viewer.dispose()
          viewer = null
          return
        }
      }
      if (disposed) {
        viewer.dispose()
        viewer = null
        return
      }
      setStatus('ready')

      ro = new ResizeObserver(() => {
        if (!viewer) return
        const { w: nw, h: nh } = sizeFor()
        viewer.setSize(nw, nh)
      })
      ro.observe(wrap)

      // Pause the render loop while off-screen (CPU / battery).
      io = new IntersectionObserver(
        ([entry]) => {
          if (viewer) viewer.renderPaused = !entry.isIntersecting
        },
        { threshold: 0 },
      )
      io.observe(canvas)
    }

    // Defer the (heavy) 3D boot until the avatar is near the viewport.
    const startIO = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true
          startIO.disconnect()
          boot()
        }
      },
      { rootMargin: '250px' },
    )
    startIO.observe(wrap)

    return () => {
      disposed = true
      startIO.disconnect()
      io?.disconnect()
      ro?.disconnect()
      try {
        viewer?.dispose()
      } catch {
        /* already disposed */
      }
      viewer = null
    }
  }, [])

  return (
    <figure className={`w-[200px] sm:w-[212px] ${className}`}>
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-lg border border-hairline bg-surface-2"
        style={{ aspectRatio: `1 / ${ASPECT}` }}
      >
        {/* soft stage backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_38%,#000,transparent_75%)]"
        />

        <canvas
          ref={canvasRef}
          aria-label={`Interactive 3D Minecraft skin of ${MC_USERNAME} — drag to rotate`}
          className={`relative h-full w-full cursor-grab touch-none transition-opacity duration-500 active:cursor-grabbing ${
            status === 'ready' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {status === 'loading' && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="animate-pulse font-mono text-[10px] uppercase tracking-label text-faint">
              Rendering skin&hellip;
            </span>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 grid place-items-center p-5">
            <img
              src={RENDER_FALLBACK}
              alt={`Minecraft avatar of ${MC_USERNAME}`}
              className="max-h-[82%] w-auto [image-rendering:pixelated]"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <figcaption className="mt-2.5 flex items-center justify-center gap-1.5 text-center font-mono text-[11px] text-muted">
        <span className="text-ink">{MC_USERNAME}</span>
        <span className="text-line">·</span>
        <span className="text-faint">drag to rotate</span>
      </figcaption>
    </figure>
  )
}

export default MinecraftAvatar
