import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiBath, BiHome, BiTree, BiWater } from "react-icons/bi";
import { MdOutlineCabin, MdOutlineCastle } from "react-icons/md";

const categories = [
  { name: "Countryside", icon: BiTree },
  { name: "Rooms", icon: BiHome },
  { name: "Lakefront", icon: BiWater },
  { name: "Cabins", icon: MdOutlineCabin },
  { name: "Islands", icon: BiWater },
  { name: "Mansions", icon: MdOutlineCastle },
  { name: "Historical homes", icon: MdOutlineCastle },
  { name: "Treehouses", icon: BiTree },
  { name: "Luxe", icon: BiBath },
];

const CategoryCarousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-3">
      {/* Left Arrow */}
      <button
        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md"
        onClick={scrollLeft}
      >
        <FaChevronLeft className="text-gray-600" />
      </button>

      {/* Category List */}
      <div
        ref={carouselRef}
        className="flex space-x-8 overflow-x-auto scrollbar-hide whitespace-nowrap px-10"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-gray-700 cursor-pointer hover:text-black transition-all"
          >
            <category.icon className="text-2xl mb-1" />
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md"
        onClick={scrollRight}
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default CategoryCarousel;
