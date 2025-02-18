import { FaSearch } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  return (
    <header className="flex flex-col items-center h-39 w-full shadow-md bg-white px-10 py-3">
      {/* Top Section - Logo & Navigation */}
      <div className="flex justify-between items-center w-full mb-3">
        {/* Left - StayBnb Logo */}
        <div className="flex items-center gap-2 mt-2">
          <img src={logo2} alt="StayBnb Logo" className="h-10" />
          <h4 className="text-pink-500 text-2xl font-bold">StayBnb</h4>
        </div>

        {/* Middle - Navigation Links (Centered Above Search Bar) */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-8 text-gray-700 font-semibold">
          <span className="cursor-pointer text-black-100 border-black font-medium text-lg ">
            Stays
          </span>
          <span className="cursor-pointer text-black-100 border-black font-medium text-lg">Experiences</span>
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center gap-6">
          <span className="text-sm text-black-100 font-semibold cursor-pointer text-lg">
          Switch to hosting
          </span>
          <TbWorld size={22} className="cursor-pointer " />
          <div className="flex items-center gap-2 border px-4 py-2 rounded-full shadow-sm hover:shadow-sm transition-all cursor-pointer">
            <HiOutlineMenu />
            <BiUserCircle size={24} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* Search Bar */}
<div className="flex items-center border rounded-full border-pink-100 px-4 py-2 shadow-md hover:shadow-lg h-16 transition-all bg-white w-full max-w-3xl relative">
  <div className="flex flex-col items-start px-4">
    <span className="text-xs font-semibold text-gray-800">Where</span>
    <input
      type="text"
      placeholder="Search destinations"
      className="outline-none text-sm text-gray-500 bg-transparent"
    />
  </div>
  <div className="border-[0.3px] border-gray-300 h-8"></div>

  <div className="flex flex-col items-start px-4">
    <span className="text-xs font-semibold text-gray-800">Check in</span>
    <input
      type="text"
      placeholder="Add dates"
      className="outline-none text-sm text-gray-500 bg-transparent"
    />
  </div>
  <div className="border-[0.3px] border-gray-300 h-8"></div>

  <div className="flex flex-col items-start px-4">
    <span className="text-xs font-semibold text-gray-800">Check out</span>
    <input
      type="text"
      placeholder="Add dates"
      className="outline-none text-sm text-gray-500 bg-transparent"
    />
  </div>
  <div className="border-[0.3px] border-gray-300 h-8"></div>

  <div className="flex flex-col items-start px-4">
    <span className="text-xs font-semibold text-gray-800">Who</span>
    <input
      type="text"
      placeholder="Add guests"
      className="outline-none text-sm text-gray-500 bg-transparent"
    />
  </div>

  {/* Search Button Properly Aligned */}
  <button className="bg-red-500 text-white p-3 rounded-full absolute right-3 shadow-md">
    <FaSearch />
  </button>
</div>

    </header>
  );
};

export default Navbar;
