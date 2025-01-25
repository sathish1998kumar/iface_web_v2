import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar collapsed state
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleLogout = () => {
    // Clear session storage or authentication tokens
    localStorage.removeItem("authToken"); // Example: Clear token from local storage
    sessionStorage.clear(); // Clear session storage if used

    // Redirect to login page
    navigate("/login"); // Adjust the path as needed
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed top-0 left-0 z-50 md:relative transition-all duration-300 shadow-lg ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 h-16 bg-gray-900 border-b border-gray-700">
          {!isCollapsed && (
            <h1 className="text-base font-bold uppercase tracking-wide text-indigo-400 transition-all duration-300">
              Welcome Admin
            </h1>
          )}
          <button
            className="text-white"
            onClick={toggleSidebar}
          >
            <i className={`fas ${isCollapsed ? "fa-bars" : "fa-times"}`}></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "hover:bg-gray-700 hover:text-indigo-300"
                  } transition-all duration-300 rounded-md`
                }
              >
                <i className="fas fa-tachometer-alt text-sm"></i>
                <span
                  className={`ml-4 text-sm ${isCollapsed ? "hidden" : ""}`}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            {/* Reports Section */}
            <li>
            <div className="flex items-center px-4 py-3">
                <i className="fas fa-chart-line text-sm"></i>
                <span
                  className={`ml-4 text-sm font-semibold ${isCollapsed ? "hidden" : ""}`}
                >
                  Reports
                </span>
              </div>
              {/* Sub-navigation under Reports */}
              <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                <li>
                  <NavLink
                   to="/reports/daily"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-file-alt text-xs"></i>
                    <span className="ml-4 text-sm">Details Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                        to="/reports/consolidated"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-layer-group text-xs"></i>
                    <span className="ml-4 text-sm">Consolidated Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports/time-based"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-clock text-xs"></i>
                    <span className="ml-4 text-sm">Time-Based Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports/incharge-monthly"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-user-tie text-xs"></i>
                    <span className="ml-4 text-sm">Incharge Monthly Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports/designation"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-id-badge text-xs"></i>
                    <span className="ml-4 text-sm">Designation Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports/monthly"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-calendar-alt text-xs"></i>
                    <span className="ml-4 text-sm">Monthly Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reports/continuous-absent"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-user-slash text-xs"></i>
                    <span className="ml-4 text-sm">Continuously Absent Report</span>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* List Section */}
            <li>
            <div className="flex items-center px-4 py-3">
                <i className="fas fa-list text-sm"></i>
                <span
                  className={`ml-4 text-sm font-semibold ${isCollapsed ? "hidden" : ""}`}
                >
                  List
                </span>
              </div>
              {/* Sub-navigation under List */}
              <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                <li>
                  <NavLink
                    to="/list/employees"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-users text-xs"></i>
                    <span className="ml-4 text-sm">Employee List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/list/users"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md"
                          : "hover:bg-gray-700 hover:text-indigo-300"
                      } transition-all duration-300 rounded-md`
                    }
                  >
                    <i className="fas fa-user text-xs"></i>
                    <span className="ml-4 text-sm">User List</span>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 bg-red-600 text-white hover:bg-red-700 hover:text-indigo-300 rounded-md transition-all duration-300"
              >
                <i className="fas fa-sign-out-alt text-sm"></i>
                <span className={`ml-4 text-sm ${isCollapsed ? "hidden" : ""}`}>
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
       {/* Main Content Area */}
       <div className="flex-1 ml-14 md:ml-0 p-0">
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default Sidebar;
