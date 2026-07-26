import { useState } from 'react'
import usaMap from '@svg-maps/usa'
import { stateStatus, StateStatus } from '../extra/travel'

// The package's default export is loosely typed; describe the shape we use.
interface SvgLocation {
  id: string
  name: string
  path: string
}
const { viewBox, locations } = usaMap as unknown as {
  viewBox: string
  locations: SvgLocation[]
}

// Heatmap ramp built from the design-system tokens so it adapts to light/dark.
const STATUS_STYLE: Record<
  StateStatus,
  { fill: string; swatch: string; label: string }
> = {
  visited: {
    fill: 'fill-green-400 hover:fill-green-300',
    swatch: 'bg-green-400',
    label: 'Visited',
  },
  driven: {
    fill: 'fill-green-700 hover:fill-green-650',
    swatch: 'bg-green-700',
    label: 'Drove through',
  },
  missing: {
    fill: 'fill-surface-2 hover:fill-line',
    swatch: 'bg-surface-2',
    label: 'Not yet',
  },
}

const statusOf = (id: string): StateStatus => stateStatus[id] ?? 'missing'

// "Home" marker — placed over Pittsburgh, PA in the map's SVG coordinate space.
// Derived from PA's path bounding box + Pittsburgh's real lat/lon.
const HOME = { x: 1033, y: 236, label: 'Home · Pittsburgh, PA' }
// Classic teardrop map-pin, drawn in a 24×24 box with its tip at (12, 22).
const PIN_PATH =
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'
const PIN_SCALE = 1.15 // ~23 units tall on the map

const USMap = () => {
  const [hovered, setHovered] = useState<SvgLocation | null>(null)
  const [homeHover, setHomeHover] = useState(false)

  // Tallies for the legend.
  const counts = locations.reduce(
    (acc, loc) => {
      acc[statusOf(loc.id)] += 1
      return acc
    },
    { visited: 0, driven: 0, missing: 0 } as Record<StateStatus, number>,
  )

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {(Object.keys(STATUS_STYLE) as StateStatus[]).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-sm border border-hairline ${STATUS_STYLE[key].swatch}`}
            />
            <span className="text-[13px] text-body">{STATUS_STYLE[key].label}</span>
            <span className="font-mono text-[11px] text-faint">
              {counts[key]}
            </span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="relative">
        <svg
          viewBox={viewBox}
          className="h-auto w-full"
          role="img"
          aria-label="Map of U.S. states Jake has visited"
        >
          {locations.map((loc) => (
            <path
              key={loc.id}
              d={loc.path}
              className={`cursor-pointer stroke-canvas transition-colors duration-200 ${
                STATUS_STYLE[statusOf(loc.id)].fill
              }`}
              strokeWidth={1}
              onMouseEnter={() => setHovered(loc)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {/* Home pin over Pittsburgh, PA */}
          <g
            transform={`translate(${HOME.x - 12 * PIN_SCALE}, ${
              HOME.y - 22 * PIN_SCALE
            }) scale(${PIN_SCALE})`}
            className="cursor-pointer"
            onMouseEnter={() => setHomeHover(true)}
            onMouseLeave={() => setHomeHover(false)}
          >
            <title>{HOME.label}</title>
            <path
              d={PIN_PATH}
              fill="#ef4444"
              stroke="#ffffff"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
            <circle cx={12} cy={9} r={2.6} fill="#ffffff" />
          </g>
        </svg>

        {/* Hover tooltip — home takes priority */}
        {homeHover ? (
          <div className="pointer-events-none absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-hairline bg-surface px-3.5 py-1.5 shadow-card">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            <span className="text-[13px] font-semibold text-ink">Home</span>
            <span className="font-mono text-[11px] uppercase tracking-label text-muted">
              Pittsburgh, PA
            </span>
          </div>
        ) : (
          hovered && (
            <div className="pointer-events-none absolute left-1/2 top-2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-hairline bg-surface px-3.5 py-1.5 shadow-card">
              <span
                className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLE[statusOf(hovered.id)].swatch}`}
              />
              <span className="text-[13px] font-semibold text-ink">
                {hovered.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                {STATUS_STYLE[statusOf(hovered.id)].label}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default USMap
