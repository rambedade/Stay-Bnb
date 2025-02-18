// Import required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // Middleware to allow Cross-Origin Resource Sharing (CORS)
const fs = require("fs"); // File system module to read/write JSON files
const dotenv = require("dotenv"); // Load environment variables from a .env file
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For user authentication

// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Apply Middleware
app.use(cors()); // Enable CORS to allow frontend requests from different origins
app.use(express.json()); // Parse incoming JSON requests

// Define the port for the server (default to 5000 if not set in .env)
const PORT = process.env.PORT || 5000;

// Load SECRET_KEY from .env
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key"; // Fallback key if .env is missing

console.log("Loaded SECRET_KEY:", SECRET_KEY); // Debug log to check if the key is loaded

// console.log("All Environment Variables:", process.env);


// Root route - Just to check if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the StayBnb API!");
});

/**
 * 📌 API: Get All Properties
 * This endpoint returns a list of all properties from the data.json file.
 */
app.get("/api/properties", (req, res) => {
  try {
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    res.json(rawData.data);
  } catch (error) {
    res.status(500).json({ message: "Error reading property data", error: error.message });
  }
});



/**
 * 📌 API: Get Property by ID
 */
app.get("/api/properties/:id", (req, res) => {
  try {
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    const property = rawData.data.find((p) => p.id === req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property", error: error.message });
  }
});

/**
 * 📌 API: Add a New Property (Admin only)
 */
app.post("/api/properties", (req, res) => {
  try {
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    const properties = rawData.data;

    const newProperty = { ...req.body, id: (Math.floor(Math.random() * 10000000)).toString() };
    properties.push(newProperty);

    fs.writeFileSync("data.json", JSON.stringify({ data: properties }, null, 2));

    res.status(201).json({ message: "Property added successfully!", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error adding property", error: error.message });
  }
});

/**
 * 📌 API: Update Property (Admin only)
 */
app.put("/api/properties/:id", (req, res) => {
  try {
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    let properties = rawData.data;

    const propertyIndex = properties.findIndex((p) => p.id === req.params.id);
    if (propertyIndex === -1) return res.status(404).json({ message: "Property not found" });

    properties[propertyIndex] = { ...properties[propertyIndex], ...req.body };
    fs.writeFileSync("data.json", JSON.stringify({ data: properties }, null, 2));

    res.json({ message: "Property updated successfully", property: properties[propertyIndex] });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
});

/**
 * 📌 API: Delete a Property (Admin only)
 */
app.delete("/api/properties/:id", (req, res) => {
  try {
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    let properties = rawData.data;

    const newProperties = properties.filter((p) => p.id !== req.params.id);
    if (properties.length === newProperties.length) return res.status(404).json({ message: "Property not found" });

    fs.writeFileSync("data.json", JSON.stringify({ data: newProperties }, null, 2));
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
});

/**
 * 📌 API: Register a New User
 */
app.post("/api/users/register", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    // Check if users.json exists, create if missing
    if (!fs.existsSync("users.json")) {
      fs.writeFileSync("users.json", JSON.stringify({ users: [] }, null, 2));
    }

    const rawData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const users = rawData.users;

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(10));
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };

    users.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify({ users }, null, 2));

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

/**
 * 📌 API: User Login
 */
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const rawData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    const users = rawData.users;

    const user = users.find((user) => user.email === email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

/**
 * 📌 Middleware: Authenticate JWT
 */
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

/**
 * 📌 API: Get User Profile (Protected)
 */
app.get("/api/users/profile/:id", authenticateJWT, (req, res) => {
  const rawData = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  const users = rawData.users;

  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user.id, name: user.name, email: user.email });
});

// Start the Express server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
