import { useState, useRef } from "react";
import food from "../extra/food";
import Modal from "./LoreModal";
import sheflang from "../assets/sheflang.png";
import { FoodItem } from "../extra/food";
import { FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sheflang = () => {
  const [showModal, setShowModal] = useState(false);
  const [loreContent, setLoreContent] = useState("");
  const [dishName, setDishName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (name: string, lore: string) => {
    setLoreContent(lore); 
    setShowModal(true);
    setDishName(name);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;

      if (direction === 'left') {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div id="sheflang" className="h-screen flex flex-col justify-center items-center py-12 px-6 max-w-7xl mx-auto overflow-hidden bg-[#0f172a]">
      
      <div className="text-center mb-8 flex flex-col items-center shrink-0">
        <div className="relative inline-block group mb-3">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img 
            src={sheflang} 
            alt="sheflang" 
            className="relative rounded-full w-20 h-20 md:w-28 md:h-28 object-cover border-2 border-slate-700" 
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Shef<span className="text-teal-400">lang</span>
        </h1>
        
        <p className="text-slate-400 mt-2 max-w-lg mx-auto font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">
          A collection of culinary experiments and lore.
        </p>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-slate-700 text-slate-400 hover:border-teal-400 hover:text-teal-400 transition-all active:scale-90"
          >
            <FiChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-slate-700 text-slate-400 hover:border-teal-400 hover:text-teal-400 transition-all active:scale-90"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6"
      >
        {food.map((item: FoodItem, index) => (
          <div 
            key={index} 
            className="snap-center shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full pb-[100%] overflow-hidden">
              <img
                src={item.image}
                alt={item.description}
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-slate-100 text-base md:text-lg font-bold tracking-tight">
                  {item.description}
                </h3>
              </div>
            </div>

            <div className="p-3">
              <button
                onClick={() => handleOpenModal(item.name, item.lore)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-teal-400 font-mono text-[10px] uppercase tracking-widest hover:bg-teal-400/10 transition-all duration-300"
              >
                <FiInfo size={12} />
                Explore Lore
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        lore={loreContent}
        name={dishName}
      />
    </div>
  );
};

export default Sheflang;