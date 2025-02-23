import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate(); // ✅ Hook for redirection
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    console.log("Property ID:", id); // ✅ Debugging Log
    if (!id) {
      console.error("❌ No Property ID found!");
      return;
    }

    fetch(`http://localhost:8080/api/properties/${id}`)
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

  // ✅ Handle Reserve Button Click
  const handleReserve = () => {
    const token = localStorage.getItem("token"); // Check if user is logged in

    if (!token) {
      navigate("/auth"); // ✅ Redirect to AuthPage if not logged in
    } else {
      navigate(`/booking/${id}`); // ✅ Redirect to Booking Page if logged in
    }
  };

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading property details...</p>;
  }

  if (!property) {
    return <p className="text-center text-xl mt-10 text-red-500">❌ Property not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* ✅ Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className="md:col-span-1">
          <img src={property.images[0]} className="w-full h-[450px] object-cover rounded-lg" alt="Main Property" />
        </div>
        <div className="grid grid-cols-2 gap-1 md:col-span-2">
          {property.images.slice(1, 5).map((img, index) => (
            <img key={index} src={img} className="w-full h-[220px] object-cover rounded-lg" alt={`Property ${index + 2}`} />
          ))}
        </div>
      </div>

      {/* ✅ Property Info & Reservation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <p className="text-gray-600 text-lg">{property.smart_location}</p>

          <div className="flex items-center gap-2 mt-2 text-gray-700 text-lg">
            <FaStar className="text-yellow-500" />
            <span>
              {property.review_scores_rating / 20} ({property.number_of_reviews} reviews)
            </span>
          </div>
        </div>

        {/* Right Column - Booking Section */}
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 h-100">
          <h2 className="text-2xl font-bold">${property.price} / night</h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Check-in</label>
              <input type="date" className="w-full border p-2 rounded-md mt-1" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Check-out</label>
              <input type="date" className="w-full border p-2 rounded-md mt-1" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Guests</label>
            <select className="w-full border p-2 rounded-md mt-1" value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
            </select>
          </div>

          <div className="mt-6">
            <button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold" onClick={handleReserve}>
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
