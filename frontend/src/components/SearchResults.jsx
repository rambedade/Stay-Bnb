import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query"); // ✅ Get search term from URL
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchQuery) return;
    fetch(`http://localhost:8080/api/properties/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) return <p className="text-center text-xl mt-10">Searching for "{searchQuery}"...</p>;
  if (properties.length === 0) return <p className="text-center text-xl mt-10 text-red-500">❌ No results found for "{searchQuery}".</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Link key={property._id} to={`/property/${property._id}`} className="bg-white shadow-lg p-4 rounded-lg">
            <img src={property.images[0]} alt={property.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-3">{property.name}</h2>
            <p className="text-gray-500">{property.smart_location}</p>
            <p className="text-lg font-bold mt-2">${property.price} / night</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
