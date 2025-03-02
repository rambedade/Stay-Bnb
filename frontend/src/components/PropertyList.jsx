import { useEffect, useState, useRef, useCallback } from "react";
import PropertyCard from "./PropertyCard";
import CategoryFilter from "./CategoryFilter"; // ✅ Import CategoryFilter
import { BASE_URL } from "../config";
import { BeatLoader } from "react-spinners"; // ✅ Import spinner

const PropertyList = ({ searchQuery }) => { // ✅ Accept searchQuery as a prop
  const [properties, setProperties] = useState([]); // All properties from API
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered properties
  const [displayedProperties, setDisplayedProperties] = useState([]); // ✅ Properties to show on screen (for infinite scroll)
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // ✅ For smooth infinite scroll effect
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState(null); // ✅ Stores active filters
  const [page, setPage] = useState(1); // ✅ Track current page for infinite scroll
  const observer = useRef(); // ✅ Ref for intersection observer

  const ITEMS_PER_PAGE = 20; // ✅ Load 20 items per page to reduce API calls

  // ✅ Fetch properties on mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data); // ✅ Show all properties initially
        setDisplayedProperties(data.slice(0, ITEMS_PER_PAGE)); // ✅ Show first set of properties
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Filter properties whenever searchQuery changes
  useEffect(() => {
    let updatedProperties = properties;

    if (searchQuery.trim()) {
      updatedProperties = properties.filter(
        (property) =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.smart_location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ✅ Apply filters (if any exist) after searching
    if (activeFilters) {
      updatedProperties = applyFiltersHelper(updatedProperties, activeFilters);
    }

    setFilteredProperties(updatedProperties);
    setDisplayedProperties(updatedProperties.slice(0, ITEMS_PER_PAGE)); // ✅ Reset displayed items after search
    setPage(1); // ✅ Reset page count
  }, [searchQuery, properties, activeFilters]);

  // ✅ Load More Properties when user scrolls to the bottom
  const loadMoreProperties = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      setDisplayedProperties((prev) => [
        ...prev,
        ...filteredProperties.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
      ]);
      setPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    }, 300); // ✅ Reduced delay for faster loading
  };

  // ✅ Infinite Scroll Observer
  const lastPropertyRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedProperties.length < filteredProperties.length) {
          loadMoreProperties();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, displayedProperties, filteredProperties]
  );

  // ✅ Apply Filters Functionality (Without Affecting Search)
  const applyFilters = (filters) => {
    setActiveFilters(filters); // ✅ Store filters in state

    let updatedProperties = properties;

    // ✅ Apply search first (if search query exists)
    if (searchQuery.trim()) {
      updatedProperties = properties.filter(
        (property) =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.smart_location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ✅ Apply filters after search
    updatedProperties = applyFiltersHelper(updatedProperties, filters);

    setFilteredProperties(updatedProperties);
    setDisplayedProperties(updatedProperties.slice(0, ITEMS_PER_PAGE)); // ✅ Reset displayed items
    setPage(1); // ✅ Reset page count
  };

  // ✅ Helper Function to Apply Filters
  const applyFiltersHelper = (propertiesList, filters) => {
    return propertiesList.filter((property) => {
      const price = property.price || 0;
      const rating = property.review_scores_rating ? property.review_scores_rating / 20 : 0;
      const beds = property.beds || 0;
      const bedrooms = property.bedrooms || 0;
      const guestFavorite = property.guestFavorite || false;

      return (
        price >= filters.priceRange[0] &&
        price <= filters.priceRange[1] &&
        rating >= filters.reviewScore &&
        beds >= filters.beds &&
        bedrooms >= filters.bedrooms &&
        (!filters.guestFavorite || guestFavorite)
      );
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader size={30} color={"#fc036b"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">❌ Error: {error}</p>;
  }



  return (
    <div>
      {/* ✅ Pass Filter Functionality to CategoryFilter */}
      <CategoryFilter onApplyFilters={applyFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 mt-6">
        {displayedProperties.length > 0 ? (
          displayedProperties.map((property, index) => {
            if (index === displayedProperties.length - 1) {
              return (
                <div ref={lastPropertyRef} key={property._id}>
                  <PropertyCard property={property} />
                </div>
              );
            } else {
              return <PropertyCard key={property._id} property={property} />;
            }
          })
        ) : (
          <p className="text-center text-xl col-span-full">No properties found.</p>
        )}
      </div>

      {/* ✅ Smooth Loading Spinner at the Bottom */}
      {loadingMore && (
        <div className="flex justify-center mt-6">
          <BeatLoader size={20} color={"#fc036b"} />
        </div>
      )}
    </div>
  );
};

export default PropertyList;
