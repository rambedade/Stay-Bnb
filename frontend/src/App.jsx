import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyList from "./components/PropertyList";
import PropertyDetails from "./components/PropertyDetails";
import AuthPage from "./components/AuthPage";  // ✅ Import AuthPage

function App() {
  return (
    <Router>
      <div>
        <Navbar />  
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/auth" element={<AuthPage />} />  {/* ✅ Single Auth Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
