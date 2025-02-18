import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryFilter from "./components/CategoryFilter";
import PropertyList from "./components/PropertyList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Amazing pools");

  return (
    <div>
      <Navbar />
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PropertyList selectedCategory={selectedCategory} />
    </div>
  );
}

export default App;
