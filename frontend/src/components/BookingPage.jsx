import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm"; // ✅ Import Payment Form
import {BASE_URL} from "../config"

const BookingPage = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false); // ✅ Toggle Payment Form

  useEffect(() => {
    fetch(`${BASE_URL}/api/properties/${id}`)
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

  // ✅ Handle Confirm Booking Button (Show Payment Form)
  const handleConfirmBooking = () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    setError(""); 
    setShowPaymentForm(true); // ✅ Show Payment Form
  };

  if (loading) return <p className="text-center text-xl mt-10">Loading booking page...</p>;
  if (!property) return <p className="text-center text-xl mt-10 text-red-500">❌ Property not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Book {property.name}</h1>
      <p className="text-gray-600 mb-4">{property.smart_location}</p>

      {!showPaymentForm ? (
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <label className="block mb-2 font-semibold">Check-in</label>
          <input 
            type="date" 
            className="w-full border p-2 rounded-md mb-4" 
            value={checkIn} 
            onChange={(e) => setCheckIn(e.target.value)} 
          />

          <label className="block mb-2 font-semibold">Check-out</label>
          <input 
            type="date" 
            className="w-full border p-2 rounded-md mb-4" 
            value={checkOut} 
            onChange={(e) => setCheckOut(e.target.value)} 
          />

          <label className="block mb-2 font-semibold">Guests</label>
          <select 
            className="w-full border p-2 rounded-md mb-4" 
            value={guests} 
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
          </select>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            onClick={handleConfirmBooking} 
            className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold mt-4"
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <PaymentForm 
          bookingDetails={{ propertyId: id, checkIn, checkOut, guests }}
        />
      )}
    </div>
  );
};

export default BookingPage;
