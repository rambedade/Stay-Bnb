const categories = [
    { name: "Amazing pools", icon: "🏊‍♂️" },
    { name: "Icons", icon: "⭐" },
    { name: "Beachfront", icon: "🏖️" },
    { name: "OMG!", icon: "🎉" },
    { name: "Lakefront", icon: "🏞️" },
    { name: "Bed & breakfasts", icon: "🥞" },
    { name: "Amazing views", icon: "🌄" },
    { name: "Farms", icon: "🌾" },
    { name: "Countryside", icon: "🏡" },
    { name: "Rooms", icon: "🛏️" },
  ];
  
  const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
    return (
      <div className="flex items-center justify-center gap-6 px-10 py-4 border-b">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`cursor-pointer flex flex-col items-center text-gray-600 ${
              selectedCategory === category.name ? "text-black font-bold border-b-2 border-black pb-1" : ""
            }`}
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryFilter;
  