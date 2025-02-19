import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FaTimes, FaStar, FaBed } from "react-icons/fa";
import { Slider } from "@mui/material";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const FilterModal = ({ isOpen, onClose, onApplyFilters, properties }) => {
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [reviewScore, setReviewScore] = useState(4);
  const [beds, setBeds] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [guestFavorite, setGuestFavorite] = useState(false);
  const [priceDistribution, setPriceDistribution] = useState([]);

  // Generate price distribution histogram dynamically
  useEffect(() => {
    if (!properties || properties.length === 0) return;

    const priceBuckets = {};
    const minPrice = 20;
    const maxPrice = 100;
    const bucketSize = 200; // Group prices in ranges of 2000

    properties.forEach(({ price }) => {
      if (price >= minPrice && price <= maxPrice) {
        const bucket = Math.floor(price / bucketSize) * bucketSize;
        priceBuckets[bucket] = (priceBuckets[bucket] || 0) + 1;
      }
    });

    // Convert object to sorted array for Recharts
    const histogramData = Object.entries(priceBuckets)
      .map(([price, count]) => ({ price: parseInt(price), count }))
      .sort((a, b) => a.price - b.price);

    setPriceDistribution(histogramData);
  }, [properties]);

  const applyFilters = () => {
    onApplyFilters({
      priceRange,
      reviewScore,
      beds,
      bedrooms,
      guestFavorite,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium">Price range</h3>
            <p className="text-xs text-gray-500 mb-3">Nightly prices before fees and taxes</p>

            {/* Dynamic Price Distribution Histogram */}
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={priceDistribution}>
                <XAxis dataKey="price" hide />
                <Bar dataKey="count" fill="#ff385c" radius={[6, 6, 0, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>

            {/* Price Range Slider */}
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              min={20}
              max={100}
              valueLabelDisplay="auto"
              sx={{ color: "#ff385c" }}
            />
            <div className="flex justify-between text-sm font-semibold mt-2">
              <div className="border px-4 py-2 rounded-full">${priceRange[0]}</div>
              <div className="border px-4 py-2 rounded-full">${priceRange[1]}+</div>
            </div>
          </div>

          {/* Rooms and Beds Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Rooms and beds</h3>
            
            {/* Bedrooms */}
            <div className="flex justify-between items-center border-b pb-2">
              <span>Bedrooms</span>
              <div className="flex items-center space-x-3">
                <button onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} className="border px-3 py-1 rounded-full text-lg">-</button>
                <span className="text-sm">{bedrooms === 1 ? "Any" : bedrooms}</span>
                <button onClick={() => setBedrooms(bedrooms + 1)} className="border px-3 py-1 rounded-full text-lg">+</button>
              </div>
            </div>

            {/* Beds */}
            <div className="flex justify-between items-center border-b pb-2 mt-2">
              <span>Beds</span>
              <div className="flex items-center space-x-3">
                <button onClick={() => setBeds(Math.max(1, beds - 1))} className="border px-3 py-1 rounded-full text-lg">-</button>
                <span className="text-sm">{beds === 1 ? "Any" : beds}</span>
                <button onClick={() => setBeds(beds + 1)} className="border px-3 py-1 rounded-full text-lg">+</button>
              </div>
            </div>
          </div>

          {/* Guest Favorite */}
          <div className="flex justify-between items-center">
            <span>Guest Favorite</span>
            <input
              type="checkbox"
              checked={guestFavorite}
              onChange={() => setGuestFavorite(!guestFavorite)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center border-t px-6 py-4">
          <button onClick={onClose} className="text-gray-600 hover:text-black text-sm font-medium">Clear all</button>
          <button onClick={applyFilters} className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
            Show 1,000+ places
          </button>
        </div>

      </div>
    </Dialog>
  );
};

export default FilterModal;
