import React, { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleLogout = () => {
    console.log("Logged out");
    // Add logout logic here, e.g., clear session, redirect, etc.
  };

  return (
    <nav className="bg-indigo-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">iface v.2</h1>
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
            className="px-4 py-2 rounded-md text-sm bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter Dropdown */}
        <select className="px-4 py-2 bg-gray-700 text-white rounded-md">
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <i className="fas fa-user-circle text-xl"></i>
            <span>Admin</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white shadow-md rounded-md">
              <ul>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700 transition-all">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-700 transition-all">
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-all"
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
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 right-0 w-full bg-indigo-800 text-white p-4 md:hidden">
          <a href="#" className="block py-2 px-4 hover:bg-gray-700">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700">
            Profile
          </a>
          <button
            onClick={handleLogout}
            className="block py-2 px-4 w-full text-left hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
