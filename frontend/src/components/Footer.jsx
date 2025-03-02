import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="fixed h-8 bottom-0 left-0 w-full bg-white border-t border-gray-300 
      py-3 px-4 md:py-4 md:px-8 text-gray-800 flex flex-col md:flex-row md:justify-between items-center text-sm md:text-lg">
      
      {/* Left Section */}
      <div className="flex flex-wrap justify-center md:justify-start space-x-3 md:space-x-6 mb-2 md:mb-0">
        <p className="font-semibold">&copy; {new Date().getFullYear()} StayBnB, Inc.</p>
        <a href="#" className="hover:underline">Privacy</a>
        <a href="#" className="hover:underline">Terms</a>
        <a href="#" className="hover:underline">Sitemap</a>
        <a href="#" className="hover:underline">Company details</a>
      </div>

      {/* Right Section */}
      <div className="flex space-x-4 md:space-x-8 items-center">
        <button className="flex items-center space-x-1 hover:underline">
          <TbWorld size={16} className="hidden md:inline" />
          <span className="font-semibold">English (IN)</span>
        </button>
        <span className="font-semibold">$ USD</span>
        <button className="hover:underline">Support & resources ▾</button>
      </div>
    </footer>
  );
};

export default Footer;
