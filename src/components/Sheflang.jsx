import food from "../extra/food";
import Modal from "./LoreModal";
import { useState } from "react";
import sheflang from "../assets/sheflang.png";

const Sheflang = () => {
  const [showModal, setShowModal] = useState(false);
  const [loreContent, setLoreContent] = useState("");
  const [dishName, setDishName] = useState("");

  // Function to open the modal and set the lore content
  const handleOpenModal = (name, lore) => {
    setLoreContent(lore); 
    setShowModal(true);
    setDishName(name)
  };

  return (
    <div className="py-20 px-6">
      <h1 className="text-4xl text-center font-bold mb-8">Introducing... Sheflang</h1>
      <img 
        src={sheflang} 
        alt="sheflang" 
        className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto mt-4 mb-6" 
        />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {food.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Wrapping div for consistent aspect ratio */}
            <div className="relative w-full pb-[56.25%]">
              <img
                src={item.image}
                alt={item.description}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex justify-between">
              <p className="text-gray-800 text-2xl font-bold">{item.description}</p>
              <button
                onClick={() => handleOpenModal(item.name, item.lore)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
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
