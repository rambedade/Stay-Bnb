import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-xl">
      {/* Image Carousel */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={property.images[currentImage]}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        {/* Left & Right Carousel Controls */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
          onClick={prevImage}
        >
          ◀
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
          onClick={nextImage}
        >
          ▶
        </button>
        {/* Favorite Icon */}
        <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          <FaHeart className="text-gray-600 hover:text-red-500" />
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        {property.guestFavorite && (
          <span className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">
            Guest Favourite
          </span>
        )}
        <h3 className="text-lg font-bold">{property.name}</h3>
        <p className="text-gray-500">{property.smart_location}</p>
        <p className="text-gray-400 text-sm">{property.accommodates} guests • {property.bedrooms} bedrooms • {property.beds} beds</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-700 font-bold text-lg">
            ₹{property.price} / night
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
