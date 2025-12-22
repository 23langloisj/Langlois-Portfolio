import { FiX } from 'react-icons/fi';

export interface ModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  lore: string;
  name: string;
}

const Modal = ({ showModal, setShowModal, lore, name }: ModalProps) => {
  if (!showModal) return null;

  // Close modal when clicking on the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl transition-all">
        <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 to-orange-400"></div>

        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-mono text-teal-400 text-xs uppercase tracking-[0.2em] mb-1 block">
                Dish History
              </span>
              <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
                {name} <span className="text-slate-500 font-light">Lore</span>
              </h2>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="text-slate-500 hover:text-white transition-colors p-1"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="relative">
            <span className="absolute -top-4 -left-2 text-6xl text-slate-800 font-serif select-none">“</span>
            <p className="relative text-slate-300 text-lg leading-relaxed italic font-light">
              {lore}
            </p>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-8 py-3 bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 hover:border-teal-500/50 transition-all duration-300"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;