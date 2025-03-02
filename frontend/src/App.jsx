import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react'; // ✅ Import Vercel Analytics
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
            </Routes>
            <Footer />
            <Analytics /> {/* ✅ Add Vercel Analytics Component */}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
