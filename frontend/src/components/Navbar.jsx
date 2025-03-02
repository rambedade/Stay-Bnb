import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import logo2 from "../assets/logo2.png";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null); // ✅ Reference for detecting outside clicks

  // ✅ Check if user is logged in (Token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // ✅ Auto-close dropdown when mouse leaves
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  // ✅ Handle Logout
// ✅ Handle Logout
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  setIsLoggedIn(false);
  setIsDropdownOpen(false);
  navigate("/");
  
  setTimeout(() => {
    window.location.reload(); // ✅ Refresh the page after logout
  }, 100); // ✅ Small delay to ensure smooth transition
};


  // ✅ Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // ✅ Real-time search updates
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-4 md:px-10 py-7 flex flex-col md:flex-row items-center w-full">
      <div className="flex w-full items-center justify-between md:justify-between">
        {/* ✅ Left - Logo */}
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo2} alt="StayBnb Logo" className="h-10" />
          <h4 className="text-pink-500 text-2xl font-bold">StayBnb</h4>
        </button>

        {/* ✅ Center - Search Bar (Mobile Below, Desktop Centered) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
          <div className="flex items-center border rounded-full border-gray-300 px-4 py-3 md:py-2 shadow-sm hover:shadow-md h-14 transition-all bg-white w-full">
            <input
              type="text"
              placeholder="Search destinations"
              className="outline-none text-lg font-medium text-gray-500 bg-transparent w-full px-4"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="bg-red-500 text-white p-3 rounded-full shadow-md">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ✅ Right - User Menu (Now Properly Aligned) */}
        <div className="flex items-center gap-4 md:gap-6 relative">
          <span className="hidden md:block text-black font-semibold cursor-pointer text-md">
            Switch to hosting
          </span>

          {/* ✅ User Menu Button */}
          {/* ✅ User Menu Button */}
          <div
            className="flex items-center h-12 w-22 gap-2 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all cursor-pointer bg-white relative z-20"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiOutlineMenu />
            <BiUserCircle size={28} />
          </div>

          {/* ✅ Dropdown Menu (Now Closes When Clicking Outside & Mouse Leaves) */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 border"
              onMouseLeave={handleMouseLeave} // ✅ Auto-close on mouse leave
            >
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/auth");
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      navigate("/auth");
                      setIsDropdownOpen(false);
                    }}
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
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Airbnb your home
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Host an experience
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Help Centre
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Search Bar (Below Logo & User Menu) */}
      <div className="w-full flex justify-center mt-3 md:hidden">
        <div className="flex items-center border rounded-full border-gray-300 px-4 py-3 shadow-sm hover:shadow-md h-14 transition-all bg-white w-full">
          <input
            type="text"
            placeholder="Search destinations"
            className="outline-none text-sm font-semibold text-gray-500 bg-transparent w-full px-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="bg-red-500 text-white p-3 rounded-full shadow-md">
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
