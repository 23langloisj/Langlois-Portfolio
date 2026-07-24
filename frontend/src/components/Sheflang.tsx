import { useState } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import food, { FoodItem } from '../extra/food'
import Modal from './LoreModal'
import { Reveal } from './primitives'

const Sheflang = () => {
  const [active, setActive] = useState<FoodItem | null>(null)

  return (
    <div id="sheflang" className="mx-auto max-w-content px-6 pb-4 pt-10 md:pt-14">
      <Reveal>
        <div className="mb-4 font-mono text-eyebrow uppercase tracking-label text-muted">
          The kitchen
        </div>
        <h1 className="text-[38px] font-semibold leading-[1.05] tracking-display text-ink md:text-[46px]">
          Sheflang
        </h1>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-body">
          A running log of things I&rsquo;ve cooked in college &mdash; and the
          (mostly ridiculous) lore behind each one. Tap a dish for the story.
        </p>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-label text-faint">
          {food.length} dishes · updated occasionally
        </div>
      </Reveal>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {food.map((item: FoodItem, i) => (
          <Reveal key={i} delay={Math.min(i * 30, 180)}>
            <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-line hover:shadow-card">
              <div className="aspect-square overflow-hidden bg-surface-2">
                <img
                  src={item.image}
                  alt={item.description}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[15%] transition duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[15px] font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-[13px] leading-relaxed text-body">
                  {item.description}
                </p>
                <button
                  onClick={() => setActive(item)}
                  className="mt-3 inline-flex items-center gap-1 self-start font-mono text-[11px] uppercase tracking-label text-link transition-colors hover:text-link-hover"
                >
                  Read the lore <FiArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Modal item={active} onClose={() => setActive(null)} />
    </div>
  )
}

export default Sheflang
