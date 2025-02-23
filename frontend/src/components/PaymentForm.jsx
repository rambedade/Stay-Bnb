import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ bookingDetails }) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Format Card Number (Auto-Insert Spaces)
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(.{4})/g, "$1 ") // Add space every 4 digits
      .trim()
      .slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  // ✅ Format Expiry Date (MM/YY)
  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/^(\d{2})(\d{0,2})/, "$1/$2") // Auto-add "/"
      .slice(0, 5); // Limit to MM/YY format
  };

  // ✅ Validate Inputs
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Cardholder name is required.";
    if (cardNumber.replace(/\s/g, "").length !== 16) newErrors.cardNumber = "Enter a valid 16-digit card number.";
    if (expiryDate.length !== 5) newErrors.expiryDate = "Enter a valid expiry date (MM/YY).";
    if (cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits.";
    return newErrors;
  };

  // ✅ Handle Fake Payment Submission
  const handlePayment = (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("✅ Payment Successful! Redirecting to your bookings...");
      setTimeout(() => {
        navigate("/booking-history");
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Secure Payment</h2>

      {successMessage && <p className="text-green-600 font-semibold text-center mb-4">{successMessage}</p>}

      <form onSubmit={handlePayment} className="space-y-4">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            className="w-full border p-3 rounded-md text-lg"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            className="w-full border p-3 rounded-md text-lg tracking-widest"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength="19"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        {/* Expiry & CVV */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              className="w-full border p-3 rounded-md text-lg"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              maxLength="5"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              className="w-full border p-3 rounded-md text-lg"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></span>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
