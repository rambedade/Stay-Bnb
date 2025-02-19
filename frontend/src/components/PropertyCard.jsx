import { useState } from "react";
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div
      className="bg-white rounded-sm overflow-hidden shadow-md cursor-pointer transition-all hover:shadow-lg border-none"
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Reset hover state when mouse leaves
    >
      {/* Image Carousel */}
      <div className="relative w-full h-84 overflow-hidden rounded-t-xl rounded-b-xl">
        <img
          src={property.images[currentImage]}
          alt={property.name}
          className="w-full h-full object-cover"
        />

        {/* Left & Right Carousel Arrows - Visible Only on Hover */}
        <button
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-1.5 rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={prevImage}
        >
          <FaChevronLeft size={14} />
        </button>
        <button
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-1.5 rounded-full shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={nextImage}
        >
          <FaChevronRight size={14} />
        </button>

        {/* Image Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {property.images.map((_, index) => (
            <span
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                currentImage === index ? "bg-white" : "bg-gray-400 opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Guest Favorite Badge */}
        {property.guestFavorite && (
          <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Guest favourite
          </span>
        )}

        {/* Favorite (Heart) Icon */}
        <div
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md cursor-pointer"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart
            className={`text-lg ${
              isFavorite ? "text-red-500" : "text-gray-700"
            } transition-colors duration-300`}
          />
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.name}</h3>
        <p className="text-gray-500">{property.smart_location}</p>
        <p className="text-gray-400 text-sm">
          {property.accommodates} guests • {property.bedrooms} bedrooms • {property.beds} beds
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-800 font-bold text-lg">
            ${property.price} / night
          </span>
          <span className="flex items-center gap-1 text-gray-700">
            <FaStar className="text-yellow-500" /> {property.review_scores_rating / 20}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
