import  { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white ${
          isOpen ? "w-64" : "w-20"
        } min-h-screen transition-all duration-300 shadow-lg absolute top-0 left-0 z-50 overflow-y-auto md:relative md:w-64`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 h-16 bg-gray-900 border-b border-gray-700">
          {isOpen && (
            <h1 className="text-base font-bold uppercase tracking-wide text-indigo-400 transition-all duration-300">
              Welcome Admin
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none hover:text-gray-400"
          >
            <i
              className={`fas ${
                isOpen ? "fa-angle-left" : "fa-angle-right"
              } text-sm`}
            ></i>
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
                {isOpen && <span className="ml-4 text-sm">Dashboard</span>}
              </NavLink>
            </li>

            {/* Reports */}
            <li>
              <div className="flex items-center px-4 py-3">
                <i className="fas fa-chart-line text-sm"></i>
                {isOpen && <span className="ml-4 text-sm">Reports</span>}
              </div>
              {isOpen && (
                <ul className="pl-8 space-y-2">
                  <li>
                    <NavLink
                      to="/reports/details"
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
                      <span className="ml-4 text-sm">
                        Incharge Monthly Report
                      </span>
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
                      <span className="ml-4 text-sm">
                        Continuously Absent Report
                      </span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* List */}
            <li>
              <div className="flex items-center px-4 py-3">
                <i className="fas fa-list text-sm"></i>
                {isOpen && <span className="ml-4 text-sm">List</span>}
              </div>
              {isOpen && (
                <ul className="pl-8 space-y-2">
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
              )}
            </li>

            {/* Logout */}
            <li>
              <NavLink
                to="/logout"
                className="flex items-center px-4 py-3 bg-red-600 text-white hover:bg-red-700 transition duration-300 rounded-md"
              >
                <i className="fas fa-sign-out-alt text-sm"></i>
                {isOpen && <span className="ml-4 text-sm">Logout</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
