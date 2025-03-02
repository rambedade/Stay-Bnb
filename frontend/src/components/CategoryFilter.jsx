import { useState, useEffect, useRef } from "react";
import { FaSlidersH, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { name: "Islands", icon: "🏝️" },
  { name: "Icons", icon: "🎟️" },
  { name: "Castle", icon: "🏰" },
  { name: "Treehouses", icon: "🌲" },
  { name: "Camping", icon: "⛺" },
  { name: "New", icon: "🆕" },
  { name: "Hill", icon: "🖼️" },
  { name: "Farms", icon: "🌾" },
  { name: "pools", icon: "🏊" },
  { name: "Beachfront", icon: "🏖️" },
  { name: "Countryside", icon: "🏡" },
  { name: "Rooms", icon: "🛏️" },
  { name: "Lakefront", icon: "🏞️" },
  { name: "Cabins", icon: "🏕️" },
  { name: "Mansions", icon: "🏰" },
  { name: "Luxe", icon: "🍽️" },
  { name: "Tinyhome", icon: "🏠" },
  { name: "Desert", icon: "🏜️" },
  { name: "Skiing", icon: "🎿" },
  { name: "Yurts", icon: "⛺" },
  { name: "Boats", icon: "⛵" },
  { name: "frames", icon: "🔺" },
  { name: "Domes", icon: "🏕️" },
  { name: "Barns", icon: "🏚️" },
  { name: "Vineyards", icon: "🍇" },
  { name: "Caves", icon: "🕳️" },
  { name: "Ryokans", icon: "🏯" },
];





const CategoryFilter = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    priceRange: [20, 100],
    reviewScore: 0,
    beds: 0,
    bedrooms: 0,
    guestFavorite: false,
    category: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
  const dropdownRef = useRef(null);
  const carouselRef = useRef(null);

  // ✅ Close Dropdown When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // ✅ Handle Filter Updates
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Apply Filters
  const applyFilters = () => {
    onApplyFilters(filters);
    setIsDropdownOpen(false);
  };

  // ✅ Scroll Carousel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative px-4 pb-4 pt-4  flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      {/* ✅ Icons Carousel */}
      <div className="flex items-center gap-8 ml-4 w-full md:w-auto overflow-x-auto scrollbar-hide">
        <button
          onClick={scrollLeft}
          className="p-2 rounded-full bg-white shadow-md hidden md:block"
        >
          <FaChevronLeft size={18} />
        </button>
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide p-2 w-full md:w-auto"
        >
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex flex-col items-center cursor-pointer ${
                selectedCategory === cat.name
                  ? "text-black font-semibold"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-sm mt-1">{cat.name}</span>
              {selectedCategory === cat.name && (
                <div className="w-6 h-1 bg-black mt-1 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="p-2 rounded-full bg-white shadow-md hidden md:block"
        >
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* ✅ Filters Button (Mobile Adjustments) */}
      <button
        className="flex items-center border px-6 py-3 rounded-lg text-md shadow-md hover:shadow-lg relative z-20 bg-white 
        w-full md:w-auto md:mt-0 mt-2 lg:mr-10"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FaSlidersH className="mr-2" /> Filters
      </button>

      {/* ✅ Dropdown Filter Menu (Appears Below Button) */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-1 w-64 bg-white shadow-md rounded-lg p-4 z-10 border"
        >
          {/* ✅ Price Range */}
          <label className="block text-sm font-medium">Price Range</label>
          <div className="flex justify-between text-sm font-semibold mt-1">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="20"
            max="500"
            value={filters.priceRange[0]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                parseInt(e.target.value),
                filters.priceRange[1],
              ])
            }
            className="w-full"
          />
          <input
            type="range"
            min="20"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                filters.priceRange[0],
                parseInt(e.target.value),
              ])
            }
            className="w-full"
          />

          {/* ✅ Review Score */}
          <label className="block text-sm font-medium mt-2">
            Minimum Rating
          </label>
          <select
            className="w-full border p-2 rounded-md"
            value={filters.reviewScore}
            onChange={(e) =>
              handleFilterChange("reviewScore", parseFloat(e.target.value))
            }
          >
            <option value="0">Any</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars</option>
          </select>

          {/* ✅ Bedrooms & Beds */}
          <label className="block text-sm font-medium mt-2">Bedrooms</label>
          <input
            type="number"
            className="w-full border p-2 rounded-md"
            value={filters.bedrooms}
            onChange={(e) =>
              handleFilterChange("bedrooms", parseInt(e.target.value))
            }
            min="0"
          />

          {/* ✅ Guest Favorite Checkbox */}
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={filters.guestFavorite}
              onChange={() =>
                handleFilterChange("guestFavorite", !filters.guestFavorite)
              }
              className="mr-2"
            />
            Guest Favorite
          </label>

          {/* ✅ Apply Filter Button */}
          <button
            className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
