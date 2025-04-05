import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown/menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white px-6 py-3 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 cursor-pointer">
            iface v.2
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 px-4 py-2 pl-10 rounded-full text-sm bg-indigo-700/50 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-indigo-300"></i>
          </div>

          {/* Admin Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:bg-indigo-700/50 px-3 py-1.5 rounded-full transition-all duration-300"
            >
              <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <i className="fas fa-user text-lg"></i>
              </div>
              <span className="text-indigo-100 font-medium">Admin</span>
              <i className={`fas fa-chevron-down text-xs text-indigo-200 transition-transform duration-200 ${isDropdownOpen ? "transform rotate-180" : ""}`}></i>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-indigo-800 text-white rounded-xl shadow-lg overflow-hidden border border-indigo-700/30">
                <div className="px-4 py-3 border-b border-indigo-700/30">
                  <p className="text-sm font-medium">Admin Account</p>
                  <p className="text-xs text-indigo-300">admin@iface.com</p>
                </div>
                <ul>
                  <li>
                    <a href="#" className="block px-4 py-3 hover:bg-indigo-700/50 transition-all duration-200 flex items-center space-x-3">
                      <i className="fas fa-user text-indigo-300 w-5"></i>
                      <span>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-3 hover:bg-indigo-700/50 transition-all duration-200 flex items-center space-x-3">
                      <i className="fas fa-cog text-indigo-300 w-5"></i>
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
                <div className="border-t border-indigo-700/30">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 hover:bg-indigo-700/50 transition-all duration-200 flex items-center space-x-3"
                  >
                    <i className="fas fa-sign-out-alt text-indigo-300 w-5"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 focus:outline-none p-2 rounded-full hover:bg-indigo-700/50 transition-all"
          >
            <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-end md:hidden">
          <div
            ref={mobileMenuRef}
            className="bg-gradient-to-b from-indigo-800 to-indigo-900 w-80 h-full p-6 space-y-6 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-white absolute top-4 right-4 text-2xl hover:text-gray-300 focus:outline-none"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-4 pb-4 border-b border-indigo-700">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <i className="fas fa-user text-xl"></i>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-indigo-300">admin@iface.com</p>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 rounded-full text-sm bg-indigo-700/50 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
              <i className="fas fa-search absolute left-3 top-2.5 text-indigo-300"></i>
            </div>

            {/* Mobile Menu Links */}
            <div className="space-y-2">
              <a href="#" className="block py-3 px-4 text-white hover:bg-indigo-700/50 rounded-lg transition-all duration-200 flex items-center space-x-3">
                <i className="fas fa-tachometer-alt text-indigo-300 w-5"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" className="block py-3 px-4 text-white hover:bg-indigo-700/50 rounded-lg transition-all duration-200 flex items-center space-x-3">
                <i className="fas fa-user text-indigo-300 w-5"></i>
                <span>Profile</span>
              </a>
              <a href="#" className="block py-3 px-4 text-white hover:bg-indigo-700/50 rounded-lg transition-all duration-200 flex items-center space-x-3">
                <i className="fas fa-cog text-indigo-300 w-5"></i>
                <span>Settings</span>
              </a>
            </div>

            {/* Logout Button */}
            <div className="pt-4 border-t border-indigo-700">
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 text-white bg-indigo-700 hover:bg-indigo-600 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;