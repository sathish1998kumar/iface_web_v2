import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleLogout = () => {
    // Clear session storage or authentication tokens
    localStorage.removeItem("authToken"); // Example: Clear token from local storage
    sessionStorage.clear(); // Clear session storage if used

    // Redirect to login page
    navigate("/login"); // Adjust the path as needed
  };

  return (
    <nav className="bg-indigo-900 text-white px-4 py-4 shadow-lg flex justify-between items-center relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform transition-all duration-500 hover:scale-105">
          iface v.2
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {/* Search Bar */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>

        {/* Filter Dropdown */}
        <select className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300">
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 hover:text-gray-300 transition-all duration-300"
          >
            <i className="fas fa-user-circle text-2xl"></i>
            <span className="text-lg">Admin</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
              <ul>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700 transition-all duration-200">
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i> {/* Toggle Icon */}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end md:hidden">
          <div className="bg-indigo-900 w-64 p-6 space-y-6">
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-white absolute top-4 right-4 text-2xl hover:text-gray-300 focus:outline-none"
            >
              <i className="fas fa-times"></i> {/* Close Icon */}
            </button>

            {/* Mobile Menu Links */}
            <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
              Dashboard
            </a>
            <a href="#" className="block py-2 px-4 text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 w-full text-left text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              Logout
            </button>

            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-lg text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>

            {/* Mobile Filter Dropdown */}
            <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300">
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
