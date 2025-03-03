const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Property = require("./models/property");
const User = require("./models/User");
const Booking = require("./models/Booking");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.get("/", (req, res) => res.send("Welcome to StayBnb API!"));

// ✅ Fetch All Properties
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
});

// ✅ Fetch Single Property by ID
app.get("/api/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property", error: error.message });
  }
});

// ✅ JWT Middleware - Protect Routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token. Please log in again." });
  }
};

// ✅ Booking API (Protected Route) - Store Bookings with Correct `userId`
app.post("/api/bookings", verifyToken, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;
    const userId = req.user.id; // ✅ Ensure `userId` is correctly extracted from the token

    console.log("📢 Creating booking for user:", userId); // Debugging log

    // Create new booking
    const booking = new Booking({
      userId,
      propertyId,
      checkIn,
      checkOut,
      guests,
    });

    await booking.save();
    console.log("✅ Booking saved:", booking);

    res.status(201).json({ message: "Booking confirmed!", booking });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking", error: error.message });
  }
});

// ✅ Get User's Booking History (Protected Route)
app.get("/api/bookings/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Get user ID from the token

    console.log("📢 Fetching bookings for user:", userId); // Debugging log

    // ✅ Ensure propertyId is populated correctly
    const bookings = await Booking.find({ userId }).populate({
      path: "propertyId",
      select: "name smart_location", // Only get required fields
    });

    if (!bookings || bookings.length === 0) {
      console.log("🚨 No bookings found for user:", userId);
      return res.json({ message: "No bookings found", bookings: [] });
    }

    console.log("✅ Found bookings for user:", userId, bookings);
    res.json({ message: "Bookings retrieved successfully", bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
