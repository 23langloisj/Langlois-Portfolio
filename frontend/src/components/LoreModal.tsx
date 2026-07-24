import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { FoodItem } from '../extra/food'

export interface ModalProps {
  item: FoodItem | null
  onClose: () => void
}

const Modal = ({ item, onClose }: ModalProps) => {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-hairline bg-surface shadow-card">
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5">
          <div>
            <div className="mb-1.5 font-mono text-eyebrow uppercase tracking-label text-muted">
              Dish lore
            </div>
            <h2 className="text-[20px] font-semibold tracking-heading text-ink">
              {item.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="mb-3 text-[13px] text-muted">{item.description}</p>
          <p className="text-[15px] leading-relaxed text-body">{item.lore}</p>
        </div>

        <div className="flex justify-end border-t border-hairline px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md bg-ink px-4 py-2 text-[13px] font-medium text-canvas transition-transform duration-200 ease-out hover:-translate-y-0.5"
          >
            Back to menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
