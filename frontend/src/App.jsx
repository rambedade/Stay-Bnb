import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails"; // Import the new details page

function App() {
  return (
    <Router>
      <Navbar /> {/* Keep Navbar always visible */}
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
