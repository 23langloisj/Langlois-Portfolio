import food from '../extra/food';
import sheflang from '../assets/sheflang.png';

const Sheflang = () => {
  return (
    <div className="pt-20 px-6">
      <h1 className="text-4xl text-center font-bold mb-8">Introducing... Sheflang</h1>
      <img src={sheflang} alt='sheflang' className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto mt-4"></img>
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
            <div className="p-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">{item.description}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Get Lore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sheflang;
