import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const isSuperAdmin = role === "Super Admin";
  const isAdmin = role === "Admin";
  const isInCharge = role === "In-Charge";
  const isSupervisor = role === "Supervisor";
  const isEmployee = role === "Employee";
  const isSubstitute = role === "Substitute";

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex">
      <div
        className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed top-0 left-0 z-50 md:relative transition-all duration-300 shadow-lg flex flex-col ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 bg-gray-900 border-b border-gray-700">
          {!isCollapsed && (
            <h1 className="text-base font-bold uppercase tracking-wide text-indigo-400">
              Welcome {role}
            </h1>
          )}
          <button className="text-white" onClick={toggleSidebar}>
            <i className={`fas ${isCollapsed ? "fa-bars" : "fa-times"}`}></i>
          </button>
        </div>

        {/* Navigation (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            <ul className="space-y-1">
              {/* Dashboard - All Roles */}
              <li>
                <NavItem to="/dashboard" label="Dashboard" icon="fas fa-tachometer-alt" isCollapsed={isCollapsed} />
              </li>

              {/* Reports - Admin + Super Admin */}
              {(isAdmin || isSuperAdmin) && (
                <li>
                  <SectionTitle icon="fas fa-chart-line" label="Reports" isCollapsed={isCollapsed} />
                  <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                    <NavItem to="/reports/daily" label="Details Report" icon="fas fa-file-alt" />
                    <NavItem to="/reports/consolidated" label="Consolidated Report" icon="fas fa-layer-group" />
                    <NavItem to="/reports/time-based" label="Time-Based Report" icon="fas fa-clock" />
                    <NavItem to="/reports/incharge-monthly" label="Incharge Monthly" icon="fas fa-user-tie" />
                    <NavItem to="/reports/designation" label="Designation Report" icon="fas fa-id-badge" />
                    <NavItem to="/reports/monthly" label="Monthly Report" icon="fas fa-calendar-alt" />
                    <NavItem to="/reports/continuous-absent" label="Continuously Absent" icon="fas fa-user-slash" />
                    <NavItem to="/reports/payment-pending" label="Payment Pending" icon="fas fa-file-invoice-dollar" />
                  </ul>
                </li>
              )}

              {/* Incharge Reports */}
              {(isInCharge || isSuperAdmin) && (
                <li>
                  <SectionTitle icon="fas fa-chart-pie" label="Reports" isCollapsed={isCollapsed} />
                  <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                    <NavItem to="/reports/incharge-monthly" label="Incharge Monthly" icon="fas fa-user-tie" />
                  </ul>
                </li>
              )}

              {/* Lists - Admin + Super Admin */}
              {(isAdmin || isSuperAdmin) && (
                <li>
                  <SectionTitle icon="fas fa-list" label="Lists" isCollapsed={isCollapsed} />
                  <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                    <NavItem to="/list/employees" label="Employee List" icon="fas fa-users" />
                    <NavItem to="/list/users" label="User List" icon="fas fa-user" />
                  </ul>
                </li>
              )}

              {/* Pages - InCharge + Supervisor + Super Admin */}
              {(isInCharge || isSupervisor || isSuperAdmin) && (
                <li>
                  <SectionTitle icon="fas fa-clipboard-list" label="Pages" isCollapsed={isCollapsed} />
                  <ul className={`pl-8 space-y-2 ${isCollapsed ? "hidden" : ""}`}>
                    {(isSupervisor || isSuperAdmin) && (
                      <NavItem to="/list/supervisors" label="Supervisor List" icon="fas fa-users-cog" />
                    )}
                    {(isInCharge || isSuperAdmin) && (
                      <NavItem to="/list/incharge" label="In-Charge List" icon="fas fa-briefcase" />
                    )}
                  </ul>
                </li>
              )}

              {/* Employee Page */}
              {(isEmployee || isSuperAdmin) && (
                <li>
                  <NavItem to="/employee" label="My Attendance" icon="fas fa-calendar-check" isCollapsed={isCollapsed} />
                </li>
              )}

              {/* Substitute Page */}
              {(isSubstitute || isSuperAdmin) && (
                <li>
                  <NavItem to="/substitute" label="Substitute Info" icon="fas fa-user-clock" isCollapsed={isCollapsed} />
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 bg-red-600 text-white hover:bg-red-700 hover:text-indigo-300 rounded-md transition-all duration-300"
          >
            <i className="fas fa-sign-out-alt text-sm"></i>
            <span className={`ml-4 text-sm ${isCollapsed ? "hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔁 Reusable NavItem
const NavItem = ({ to, label, icon, isCollapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 ${isActive
          ? "bg-indigo-600 text-white shadow-md"
          : "hover:bg-gray-700 hover:text-indigo-300"
        } transition-all duration-300 rounded-md`
      }
    >
      <i className={`${icon} text-xs`}></i>
      <span className={`ml-4 text-sm ${isCollapsed ? "hidden" : ""}`}>{label}</span>
    </NavLink>
  );
};

// 🔁 Reusable Section Title
const SectionTitle = ({ icon, label, isCollapsed }) => {
  return (
    <div className="flex items-center px-4 py-3">
      <i className={`${icon} text-sm`}></i>
      <span className={`ml-4 text-sm font-semibold ${isCollapsed ? "hidden" : ""}`}>{label}</span>
    </div>
  );
};

export default Sidebar;
