import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import CategoryFilter from "./CategoryFilter"; // ✅ Import CategoryFilter


const PropertyList = ({ selectedCategory }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/properties")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Apply Filters when user selects options in FilterModal
  const applyFilters = (filters) => {
    const filtered = properties.filter(property => 
      property.price >= filters.priceRange[0] &&
      property.price <= filters.priceRange[1] &&
      property.review_scores_rating / 20 >= filters.reviewScore &&
      property.beds >= filters.beds &&
      property.bedrooms >= filters.bedrooms &&
      (!filters.guestFavorite || property.guestFavorite)
    );
    setFilteredProperties(filtered);
  };

  if (loading) return <p className="text-center text-xl mt-10">Loading properties...</p>;
  if (error) return <p className="text-center text-red-500 text-xl mt-10">❌ Error: {error}</p>;

  return (
    <div>
      <CategoryFilter onApplyFilters={applyFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 mt-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
        ) : (
          <p className="text-center text-xl col-span-full">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
