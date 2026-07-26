import { FiMapPin } from 'react-icons/fi'
import { Reveal } from './primitives'
import USMap from './USMap'
// Photo sections are on hold for now — re-enable the block at the bottom when
// real photos are ready. Keeping these imports commented avoids unused-var noise.
// import { FiCamera } from 'react-icons/fi'
// import { travelSections, TravelPhoto } from '../extra/travel'

/* ── Photo tile (parked until photos are ready) ──
const PhotoTile = ({ photo }: { photo: TravelPhoto }) => (
  <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-line hover:shadow-card">
    {photo.image ? (
      <img
        src={photo.image}
        alt={photo.caption}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
      />
    ) : (
      <div className="absolute inset-0 grid place-items-center bg-surface-2">
        <div className="flex flex-col items-center gap-2 text-faint">
          <FiCamera size={22} />
          <span className="font-mono text-[10px] uppercase tracking-label">
            Photo coming soon
          </span>
        </div>
      </div>
    )}
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
      <p className="text-[12px] font-medium text-white">{photo.caption}</p>
    </div>
  </div>
)
── end PhotoTile ── */

const Travel = () => {
  return (
    <div id="travel" className="mx-auto max-w-content px-6 pb-4 pt-10 md:pt-14">
      {/* Intro blurb */}
      <Reveal>
        <div className="mb-4 font-mono text-eyebrow uppercase tracking-label text-muted">
          Off the clock
        </div>
        <h1 className="text-[38px] font-semibold leading-[1.05] tracking-display text-ink md:text-[46px]">
          Travel
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-body">
          My family loves national parks so I've gotten the chance to travel and
          see new places all across the country. 
        </p>
      </Reveal>

      {/* US map heatmap */}
      <Reveal delay={60}>
        <div className="mt-10 rounded-xl border border-hairline bg-surface p-4 shadow-panel md:p-6">
          <div className="mb-5">
            <div className="font-mono text-eyebrow uppercase tracking-label text-muted">
              The map
            </div>
            <h2 className="mt-1 text-[15px] font-semibold tracking-heading text-ink">
              States so far
            </h2>
          </div>
          <USMap />
        </div>
      </Reveal>

      {/* Other places — coming soon */}
      <Reveal delay={90}>
        <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface-2/40 px-6 py-12 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-surface text-muted">
            <FiMapPin size={18} />
          </span>
          <h3 className="text-[15px] font-semibold tracking-heading text-ink">
            International motion coming soon 🥷
          </h3>
        </div>
      </Reveal>

      {/* ── Photo sections (parked until photos are ready) ──
      <div className="mt-14 space-y-12">
        {travelSections.map((section, i) => (
          <Reveal key={i} delay={Math.min(i * 40, 160)}>
            <div className="scroll-mt-24">
              <div className="flex items-baseline gap-2.5">
                <FiMapPin
                  className="shrink-0 translate-y-0.5 text-link"
                  size={16}
                />
                <h3 className="text-[20px] font-semibold tracking-heading text-ink">
                  {section.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                  {section.location}
                </span>
              </div>
              <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-body">
                {section.blurb}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.photos.map((photo, j) => (
                  <PhotoTile key={j} photo={photo} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      ── end photo sections ── */}
    </div>
  )
}

export default Travel
