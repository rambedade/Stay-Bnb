const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/property");
const fs = require("fs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log(" MongoDB Connected");

    const rawData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    
    const properties = rawData.data.map((property) => ({
      name: property.name || "No name provided",
      smart_location: property.smart_location || "Location not available",
      price: property.price || 0,
      images: property.images || [],
      accommodates: property.accommodates || 1, // Default to 1
      bedrooms: property.bedrooms || 1, // Default to 1
      bathrooms: property.bathrooms || 1, // Default to 1
      host_name: property.host_name || "Unknown Host",
      host_thumbnail_url: property.host_thumbnail_url || "https://via.placeholder.com/100", // Placeholder image
      review_scores_rating: property.review_scores_rating || 0, // Default to 0
      number_of_reviews: property.number_of_reviews || 0, // Default to 0
      guestFavorite: property.guestFavorite || false,
    }));

    await Property.insertMany(properties);
    console.log("Properties Imported Successfully!");

    mongoose.connection.close();
  })
  .catch((err) => console.error(" MongoDB Connection Failed:", err));
