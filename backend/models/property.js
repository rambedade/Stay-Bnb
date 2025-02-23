const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  smart_location: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  accommodates: { type: Number, required: false }, // ✅ Made optional
  bedrooms: { type: Number, required: false }, // ✅ Made optional
  bathrooms: { type: Number, required: false }, // ✅ Made optional
  host_name: { type: String, required: false }, // ✅ Made optional
  host_thumbnail_url: { type: String, required: false }, // ✅ Made optional
  review_scores_rating: { type: Number, required: false }, // ✅ Made optional
  number_of_reviews: { type: Number, required: false }, // ✅ Made optional
  guestFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Property", PropertySchema);
