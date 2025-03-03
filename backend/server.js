const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Property = require("./models/property");
const User = require("./models/User");
const Booking = require("./models/Booking")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 1010;
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

app.get("/api/properties/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const properties = await Property.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, 
        { smart_location: { $regex: query, $options: "i" } }
      ],
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error searching properties", error: error.message });
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

// ✅ USER SIGNUP 
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
});

// 📌 User Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// ✅ JWT Middleware - Protect Routes
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token. Please log in again." });
  }
};


// ✅ Create Booking Route
app.post("/api/bookings", verifyToken, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;
    const userId = req.user.id;

    console.log("📢 Creating booking for user:", userId);

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Check-in date must be before check-out date." });
    }

    const overlappingBooking = await Booking.findOne({
      propertyId,
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: "This property is already booked for the selected dates." });
    }

    // ✅ Create new booking WITH status set to "Pending"
    const booking = new Booking({
      userId,
      propertyId,
      checkIn,
      checkOut,
      guests,
      status: "Pending",
    });

    await booking.save();
    console.log("✅ Booking saved with ID:", booking._id);

    res.status(201).json({ message: "Booking created!", booking });
  } catch (error) {
    console.error("❌ Error saving booking:", error);
    res.status(500).json({ message: "Error saving booking", error: error.message });
  }
});

// ✅ Confirm Booking After Payment
app.patch("/api/bookings/:id/confirm", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("📢 Confirming booking:", id, "for user:", userId);

    const booking = await Booking.findOne({ _id: id, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    booking.status = "Confirmed";
    await booking.save();

    console.log("✅ Booking confirmed:", booking._id);
    res.json({ message: "Booking confirmed!", booking });
  } catch (error) {
    console.error("❌ Error confirming booking:", error);
    res.status(500).json({ message: "Error confirming booking", error: error.message });
  }
});

// ✅ Get Only Confirmed Bookings for User
app.get("/api/bookings/user", verifyToken, async (req, res) => {
  try {
    let userId = req.user.id;
    console.log("📢 Fetching confirmed bookings for user:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const bookings = await Booking.find({ userId, status: "Confirmed" })
      .populate({
        path: "propertyId",
        select: "name smart_location",
      });

    if (!bookings || bookings.length === 0) {
      return res.json({ message: "No confirmed bookings found", bookings: [] });
    }

    console.log("✅ Found confirmed bookings for user:", userId, bookings);
    res.json({ message: "Confirmed bookings retrieved successfully", bookings });
  } catch (error) {
    console.error("❌ Error fetching confirmed bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

app.delete("/api/bookings/:id/cancel", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // ✅ Get user ID from token

    console.log("📢 Cancelling booking:", id, "for user:", userId);

    // ✅ Find the booking and ensure it belongs to the logged-in user
    const booking = await Booking.findOne({ _id: id, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // ✅ Ensure cancellation is allowed only before check-in
    if (new Date(booking.checkIn) <= new Date()) {
      return res.status(400).json({ message: "You cannot cancel a booking after check-in date." });
    }

    // ✅ Delete the booking
    await Booking.findByIdAndDelete(id);

    console.log("✅ Booking cancelled:", id);
    res.json({ message: "Booking successfully cancelled." });
  } catch (error) {
    console.error("❌ Error cancelling booking:", error);
    res.status(500).json({ message: "Error cancelling booking", error: error.message });
  }
});


// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
