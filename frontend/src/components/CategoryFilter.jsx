import { useState, useRef } from "react";
import { 
  FaSwimmingPool, FaStar, FaUmbrellaBeach, FaMountain, FaHome, FaTree, 
  FaWarehouse, FaCity, FaDoorOpen, FaFilter, FaCampground, FaSnowflake, 
  FaGlobeAmericas, FaHotel, FaBicycle, FaShip, FaBuilding, FaFish, 
  FaGopuram, FaMosque, FaChurch, FaLandmark, FaHiking, FaBeer, FaLeaf
} from "react-icons/fa";
import { MdOutlineCabin, MdOutlineCastle, MdOutlineForest, MdOutlineMuseum } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FilterModal from "./FilterModal"; 
import {BASE_URL} from "../config"



// Categories List
const categories = [
  { name: "Amazing pools", icon: <FaSwimmingPool /> },
  { name: "Beachfront", icon: <FaUmbrellaBeach /> },
  { name: "Mountains", icon: <FaMountain /> },
  { name: "Houseboats", icon: <FaHome /> },
  { name: "Windmills", icon: <FaTree /> },
  { name: "Mansions", icon: <FaWarehouse /> },
  { name: "Luxe", icon: <FaCity /> },
  { name: "Cabins", icon: <MdOutlineCabin /> },
  { name: "Rooms", icon: <FaDoorOpen /> },
  { name: "Camping", icon: <FaCampground /> },
  { name: "Winter Resorts", icon: <FaSnowflake /> },
  { name: "Countryside", icon: <FaGlobeAmericas /> },
  { name: "Boutique Hotels", icon: <FaHotel /> },
  { name: "Cycling Retreats", icon: <FaBicycle /> },
  { name: "Castles", icon: <MdOutlineCastle /> },
  { name: "Forest Cabins", icon: <MdOutlineForest /> },
  { name: "Floating Homes", icon: <FaShip /> },
  { name: "Skyline Views", icon: <FaBuilding /> },
  { name: "Fishing Spots", icon: <FaFish /> },
  { name: "Cultural Stays", icon: <FaGopuram /> },
  { name: "Mosques & Minarets", icon: <FaMosque /> },
  { name: "Church Retreats", icon: <FaChurch /> },
  { name: "Landmark Homes", icon: <FaLandmark /> },
  { name: "Hiking Spots", icon: <FaHiking /> },
  { name: "Wineries & Vineyards", icon: <FaBeer /> },
  { name: "Eco-Friendly Stays", icon: <FaLeaf /> },
  { name: "Museums & Heritage", icon: <MdOutlineMuseum /> },
];

const CategoryFilter = ({ onApplyFilters }) => {
  const [selectedCategory, setSelectedCategory] = useState("Amazing pools");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ State for Filter Modal
  const scrollRef = useRef(null);

  // Scroll Functions
  const scrollLeft = () => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });

  return (
    <div className="relative flex items-center justify-between border-none pb-2 px-6 pt-8 ml-0">
      {/* Left Arrow for Category Scroll */}
      <button
        className="absolute left-0 z-10 ml-5 mt-0 mb-5 bg-white p-2 rounded-full shadow-md hidden md:flex"
        onClick={scrollLeft}
      >
        <FaChevronLeft className="text-gray-600" />
      </button>

      {/* Category List */}
      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto scrollbar-hide px-10 flex-1 w-20">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center cursor-pointer transition-all ${
              selectedCategory === category.name ? "text-black font-semibold" : "text-gray-500"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className={`text-2xl ${selectedCategory === category.name ? "text-black" : "text-gray-400"}`}>
              {category.icon}
            </div>
            <span className="text-sm">{category.name}</span>
            {selectedCategory === category.name && <div className="w-6 h-1 bg-black mt-1 rounded-full"></div>}
          </div>
        ))}
      </div>

      {/* Right Arrow (before Filter Button) */}
      <button
        className="absolute right-[4.5rem] z-10 bg-white p-2 mr-12 rounded-full shadow-md hidden md:flex"
        onClick={scrollRight}
      >
        <FaChevronRight className="text-gray-600" />
      </button>

      {/* Filter Button - Opens Modal */}
      <button
        className="ml-auto mt-1 mb-3 flex cursor-pointer font-semibold items-center border px-4 py-2 w-23 h-14 rounded-lg text-md shadow-md hover:shadow-lg"
        onClick={() => setIsModalOpen(true)} // ✅ Open Modal on Click
      >
        <FaFilter className="mr-1" /> Filters
      </button>

      {/* Filter Modal - Renders when `isModalOpen` is `true` */}
      {isModalOpen && (
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApplyFilters={onApplyFilters} // ✅ Pass filter function
        />
      )}
    </div>
  );
};

export default CategoryFilter;
