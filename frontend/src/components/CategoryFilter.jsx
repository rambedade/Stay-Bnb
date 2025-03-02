import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";

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
  const dropdownRef = useRef(null); // ✅ Reference for detecting outside clicks

  // ✅ Handle Click Outside to Close Dropdown
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
    console.log("✅ Applied Filters:", filters);
    onApplyFilters(filters);
    setIsDropdownOpen(false); // ✅ Close dropdown after applying filters
  };

  return (
    <div className="relative flex justify-end p-4">
      {/* ✅ Filter Button (Always Visible) */}
      <button
        className="flex items-center border px-4 py-2 rounded-lg text-md shadow-md hover:shadow-lg relative z-20 bg-white"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* ✅ Dropdown Filter Menu (Closes When Clicking Outside) */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-10 border"
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
            onChange={(e) => handleFilterChange("priceRange", [parseInt(e.target.value), filters.priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="20"
            max="500"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />

          {/* ✅ Review Score */}
          <label className="block text-sm font-medium mt-2">Minimum Rating</label>
          <select
            className="w-full border p-2 rounded-md"
            value={filters.reviewScore}
            onChange={(e) => handleFilterChange("reviewScore", parseFloat(e.target.value))}
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
            onChange={(e) => handleFilterChange("bedrooms", parseInt(e.target.value))}
            min="0"
          />

          {/* ✅ Guest Favorite Checkbox */}
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={filters.guestFavorite}
              onChange={() => handleFilterChange("guestFavorite", !filters.guestFavorite)}
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
