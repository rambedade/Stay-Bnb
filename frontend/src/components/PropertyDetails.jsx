import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaUsers, FaBed, FaBath } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`) // ✅ Fixed syntax
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching property details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading property details...</p>;
  }

  if (!property) {
    return <p className="text-center text-xl mt-10 text-red-500">❌ Property not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      {/* ✅ Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className="md:col-span-1">
          <img
            src={property.images[0]}
            className="w-full h-[400px] md:h-[450px] object-cover rounded-lg"
            alt="Main Property"
          />
        </div>
        <div className="grid grid-cols-2 gap-1 md:col-span-2">
          {property.images.slice(1, 5).map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-full h-[180px] md:h-[220px] object-cover rounded-lg"
              alt={`Property Image ${index + 2}`}
            />
          ))}
        </div>
      </div>

      {/* ✅ Property Info & Booking Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <p className="text-gray-600 text-lg">{property.smart_location}</p>

          <div className="flex items-center gap-2 mt-2 text-gray-700 text-lg">
            <FaStar className="text-yellow-500" />
            <span>
              {property.review_scores_rating / 20} ({property.number_of_reviews} reviews)
            </span>
          </div>

          {/* Guest Favorite Badge */}
          {property.guestFavorite && (
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between mt-6">
              <span className="text-lg font-semibold">Guest favourite</span>
              <p className="text-gray-500 text-sm sm:text-md">One of the most loved homes on Airbnb</p>
            </div>
          )}

          {/* Host Information */}
          <div className="mt-6 flex items-center gap-4 border-t pt-6">
            <img
              src={property.host_thumbnail_url}
              alt="Host"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border"
            />
            <div>
              <p className="font-semibold text-lg">Hosted by {property.host_name}</p>
              <p className="text-gray-500">{property.host_since} months hosting</p>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="mt-8 border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏡</span>
              <p>
                <span className="font-semibold">Outdoor entertainment</span> - The pool and alfresco dining are great for summer trips.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🔑</span>
              <p>
                <span className="font-semibold">Exceptional check-in experience</span> - Guests gave the check-in process a 5-star rating.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">💬</span>
              <p>
                <span className="font-semibold">Exceptional Host communication</span> - Guests rated communication 5 stars.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Right Column - Booking Section (Responsive) */}
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 lg:h-[360px] lg:sticky lg:top-20">
          <h2 className="text-2xl font-bold">${property.price} / night</h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Check-in</label>
              <input type="date" className="w-full border p-2 rounded-md mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Check-out</label>
              <input type="date" className="w-full border p-2 rounded-md mt-1" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Guests</label>
            <select className="w-full border p-2 rounded-md mt-1">
              <option>1 guest</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4 guests</option>
            </select>
          </div>

          <div className="mt-6">
            <button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold">
              Reserve
            </button>
            <p className="text-center text-gray-500 text-sm mt-2">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
