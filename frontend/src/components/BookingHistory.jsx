import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]); // ✅ Store bookings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Fetch confirmed bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/bookings/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } else {
        setError(data.message || "Failed to fetch bookings.");
      }
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Booking Cancellation
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}/cancel`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // ✅ Remove canceled booking from state
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } else {
        alert(data.message || "Failed to cancel booking.");
      }
    } catch (err) {
      console.error("❌ Error canceling booking:", err);
      alert("Something went wrong. Try again.");
    }
  };

  if (loading) return <p className="text-center text-xl mt-10">Loading booking history...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Booking History</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No confirmed bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md p-6 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{booking.propertyId?.name || "Unknown Property"}</h2>
            <p className="text-gray-600">{booking.propertyId?.smart_location || "Unknown Location"}</p>
            <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p className="text-gray-600 font-semibold">
              Status: <span className="text-green-500">Confirmed</span>
            </p>
            <button
              onClick={() => handleCancelBooking(booking._id)}
              className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out"
            >
              ❌ Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
