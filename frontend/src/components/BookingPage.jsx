import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm"; // ✅ Import Payment Form
import { BASE_URL } from "../config";

const BookingPage = () => {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [bookingId, setBookingId] = useState(null); // ✅ Store booking ID

  useEffect(() => {
    fetch(`${BASE_URL}/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching property details:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle Confirm Booking Button (Send Booking to Backend First)
  const handleConfirmBooking = async () => {
    if (!checkIn || !checkOut) {
      setError("⚠️ Please select check-in and check-out dates.");
      return;
    }

    const token = localStorage.getItem("token"); // ✅ Get JWT token from localStorage
    if (!token) {
      setError("⚠️ You must be logged in to book.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send user token for authentication
        },
        body: JSON.stringify({
          propertyId: id,
          checkIn,
          checkOut,
          guests,
        }),
      });

      const data = await response.json();
      console.log("✅ Booking API Response:", data);

      if (response.ok) {
        setBookingId(data.booking._id); // ✅ Store booking ID from response
        setShowPaymentForm(true); // ✅ Show Payment Form
      } else {
        setError(data.message || "❌ Booking failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Error confirming booking:", err);
      setError("❌ Something went wrong. Try again.");
    }
  };

  if (loading)
    return <p className="text-center text-xl font-semibold mt-10">Loading booking page...</p>;
  if (!property)
    return <p className="text-center text-xl mt-10 text-red-500 font-semibold">❌ Property not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
        🏡 {property.name}
      </h1>
      <p className="text-gray-600 text-center mb-6">{property.smart_location}</p>

      {!showPaymentForm ? (
        <div className="bg-white shadow-xl p-6 rounded-lg border border-gray-200 max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700">Check-in</label>
            <input
              type="date"
              className="w-full border p-3 rounded-md text-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700">Check-out</label>
            <input
              type="date"
              className="w-full border p-3 rounded-md text-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700">Guests</label>
            <select
              className="w-full border p-3 rounded-md text-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-md font-semibold text-center mb-4">{error}</p>}

          <button
            onClick={handleConfirmBooking}
            className="w-full bg-red-500 text-white py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out"
          >
            ✅ Confirm Booking
          </button>
        </div>
      ) : (
        <PaymentForm bookingDetails={{ bookingId, propertyId: id, checkIn, checkOut, guests }} />
      )}
    </div>
  );
};

export default BookingPage;
