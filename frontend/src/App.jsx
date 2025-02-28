import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RiseLoader from "react-spinners/RiseLoader"
import BookingPage from "./components/BookingPage";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import AuthPage from "./components/AuthPage";  // ✅ Import AuthPage
import BookingHistory from "./components/BookingHistory";
import SearchResults from "./components/SearchResults"; // Import Search Page

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  return (
    <Router>
      <div>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <RiseLoader color="#fc036b" size={50} />
          </div>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<PropertyList />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/auth" element={<AuthPage />} />  {/* ✅ Single Auth Page */}
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/search-results" element={<SearchResults />} /> {/* ✅ Add Search Results Page */}
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
