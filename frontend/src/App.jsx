import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RiseLoader from "react-spinners/RiseLoader";
import BookingPage from "./components/BookingPage";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import AuthPage from "./components/AuthPage";  // ✅ Import AuthPage
import BookingHistory from "./components/BookingHistory";
import SearchResults from "./components/SearchResults"; // ✅ Import Search Page
import Footer from "./components/Footer"; // ✅ Import Footer
import ErrorBoundary from "./components/ErrorBoundary"; // ✅ Import ErrorBoundary

function App() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search state lifted to App

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  // ✅ Handle Search Functionality (Lifted to App)
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <RiseLoader color="#fc036b" size={50} />
          </div>
        ) : (
          <>
            {/* ✅ Pass handleSearch function to Navbar */}
            <Navbar onSearch={handleSearch} />

            <ErrorBoundary> {/* ✅ Wrap Routes inside ErrorBoundary */}
              <Routes>
                {/* ✅ Pass searchQuery to PropertyList */}
                <Route path="/" element={<PropertyList searchQuery={searchQuery} />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/search-results" element={<SearchResults />} />
              </Routes>
            </ErrorBoundary>

            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
