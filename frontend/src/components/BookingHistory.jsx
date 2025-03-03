import { useEffect, useState } from "react";
import { BASE_URL } from "../config"; // Ensure BASE_URL is set to your backend URL

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]); // ✅ Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      console.log("🔍 Token being sent:", token); // ✅ Debugging log
    
      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }
    
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/user`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        console.log("🔍 API Response:", data); // ✅ Debugging log
    
        if (response.ok) {
          setBookings(Array.isArray(data.bookings) ? data.bookings : []); // ✅ Ensure it's always an array
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
    
    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-xl mt-10">Loading booking history...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Booking History</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md p-6 rounded-lg mb-4">
            <h2 className="text-xl font-semibold">
              {booking.propertyId?.name || "Unknown Property"}
            </h2>
            <p className="text-gray-600">
              {booking.propertyId?.smart_location || "Unknown Location"}
            </p>
            <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p className="text-gray-600 font-semibold">
              Status: <span className="text-green-500">Confirmed</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
