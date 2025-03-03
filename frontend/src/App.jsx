import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RiseLoader from "react-spinners/RiseLoader";
import BookingPage from "./components/BookingPage";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import AuthPage from "./components/AuthPage";  
import BookingHistory from "./components/BookingHistory";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound"; // ✅ Import NotFound component
import WishlistPage from "./components/WishlistPage"; // ✅ Import WishlistPage

function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <ErrorBoundary> {/* ✅ Wrap inside ErrorBoundary */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <RiseLoader color="#fc036b" size={50} />
            </div>
          ) : (
            <>
              <Navbar onSearch={handleSearch} />
              <Routes>
                <Route path="/" element={<PropertyList searchQuery={searchQuery} />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/auth" element={<AuthPage />} />  
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/wishlist" element={<WishlistPage />} /> {/* ✅ Added Wishlist Route */}
                
                {/*  Catch-all route for unknown URLs */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <Analytics />
            </>
          )}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
