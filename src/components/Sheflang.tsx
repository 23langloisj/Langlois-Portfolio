import food from "../extra/food";
import Modal from "./LoreModal";
import { useState } from "react";
import sheflang from "../assets/sheflang.png";
import { FoodItem } from "../extra/food";
import { FiInfo } from 'react-icons/fi';

const Sheflang = () => {
  const [showModal, setShowModal] = useState(false);
  const [loreContent, setLoreContent] = useState("");
  const [dishName, setDishName] = useState("");

  const handleOpenModal = (name: string, lore: string) => {
    setLoreContent(lore); 
    setShowModal(true);
    setDishName(name);
  };

  return (
    <div className="min-h-screen py-32 px-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="relative inline-block group">
          {/* Subtle glow behind the avatar */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img 
            src={sheflang} 
            alt="sheflang" 
            className="relative rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-slate-700" 
          />
        </div>
        <h1 id="sheflang" className="text-4xl md:text-5xl font-bold text-slate-100 mt-6 tracking-tight">
          Introducing... <span className="text-teal-400">Sheflang</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest">
          A collection of culinary experiments and lore.
        </p>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {food.map((item: FoodItem, index) => (
          <div 
            key={index} 
            className="group bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-teal-400/50 transition-all duration-300 flex flex-col"
          >
            {/* Image with hover zoom */}
            <div className="relative w-full pb-[75%] overflow-hidden">
              <img
                src={item.image}
                alt={item.description}
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-slate-100 text-xl font-bold mb-4 tracking-tight">
                {item.description}
              </h3>
              
              <button
                onClick={() => handleOpenModal(item.name, item.lore)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-teal-500/30 text-teal-400 font-mono text-xs uppercase tracking-widest hover:bg-teal-400/10 transition-all duration-300"
              >
                <FiInfo size={14} />
                Get Lore
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