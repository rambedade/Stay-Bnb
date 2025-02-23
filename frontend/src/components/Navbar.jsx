import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ State for search input

  // ✅ Check if user is logged in (Token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userId"); 
    setIsLoggedIn(false);
    setIsDropdownOpen(false); 
    navigate("/"); 
  };

  // ✅ Handle Search Submission
  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    navigate(`/search-results?query=${searchQuery}`);
  };

  return (
    <header className="flex flex-col items-center h-39 w-full shadow-md bg-white px-10 py-3 relative">
      {/* Top Section - Logo & Navigation */}
      <div className="flex justify-between items-center w-full mb-3">
        {/* Left - StayBnb Logo */}
        <button className="flex items-center gap-2 mt-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo2} alt="StayBnb Logo" className="h-10" />
          <h4 className="text-pink-500 text-2xl font-bold">StayBnb</h4>
        </button>

        {/* Middle - Navigation Links */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-8 text-gray-700 font-semibold">
          <span className="cursor-pointer text-black-100 border-black font-medium text-lg">Stays</span>
          <span className="cursor-pointer text-black-100 border-black font-medium text-lg">Experiences</span>
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center gap-6 relative">
          <span className="text-black-100 font-semibold cursor-pointer text-lg">Switch to hosting</span>
          <TbWorld size={22} className="cursor-pointer" />

          {/* ✅ User Menu Button - Toggles Dropdown */}
          <div 
            className="flex items-center gap-2 border px-4 py-2 rounded-full shadow-sm hover:shadow-sm transition-all cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiOutlineMenu />
            <BiUserCircle size={24} />
          </div>

          {/* ✅ Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50 border">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => { navigate("/auth"); setIsDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => { navigate("/auth"); setIsDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              )}

              <hr className="my-2" />
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Airbnb your home</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Host an experience</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Help Centre</button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Search Bar (Now Functional) */}
      <div className="flex items-center border rounded-full border-pink-100 px-4 py-2 shadow-md hover:shadow-lg h-16 transition-all bg-white w-full max-w-3xl relative">
        <input
          type="text"
          placeholder="Search destinations"
          className="outline-none text-sm text-gray-500 bg-transparent w-full px-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} // ✅ Search on Enter
        />
        <button className="bg-red-500 text-white p-3 rounded-full absolute right-3 shadow-md" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
