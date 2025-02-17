// Import required modules
const express = require("express"); // Express framework for building the server
const cors = require("cors"); // Middleware to allow Cross-Origin Resource Sharing (CORS)
const fs = require("fs"); // File system module to read/write JSON files
const dotenv = require("dotenv"); // Load environment variables from a .env file

// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Apply Middleware
app.use(cors()); // Enable CORS to allow frontend requests from different origins
app.use(express.json()); // Parse incoming JSON requests

// Define the port for the server (default to 5000 if not set in .env)
const PORT = process.env.PORT || 5000;

//just to check the server is running

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
    // Read the JSON file containing property data
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    
    // Extract the 'data' array from the JSON file
    const properties = rawData.data;

    // Send the list of properties as a JSON response
    res.json(properties);
  } catch (error) {
    // Handle any errors while reading the file
    res.status(500).json({ message: "Error reading property data", error: error.message });
  }
});

/**
 * 📌 API: Get Property by ID
 * This endpoint returns details of a specific property based on its ID.
 */
app.get("/api/properties/:id", (req, res) => {
  try {
    // Read the JSON file containing property data
    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    
    // Extract the 'data' array from the JSON file
    const properties = rawData.data;

    // Find the property that matches the requested ID
    const property = properties.find((p) => p.id === req.params.id);

    // If property is not found, return a 404 error
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Send the property details as a JSON response
    res.json(property);
  } catch (error) {
    // Handle any errors while reading the file
    res.status(500).json({ message: "Error retrieving property", error: error.message });
  }
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
