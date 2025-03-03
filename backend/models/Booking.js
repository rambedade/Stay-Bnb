const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ References User
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }, // ✅ References Property
  checkIn: { type: Date, required: true }, // ✅ Check-in date
  checkOut: { type: Date, required: true }, // ✅ Check-out date
  guests: { type: Number, required: true }, // ✅ Number of guests
  status: { type: String, default: "Pending" }, // ✅ Default status before payment
});

module.exports = mongoose.model("Booking", bookingSchema);
