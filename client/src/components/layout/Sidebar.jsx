import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const isSuperAdmin = role === "Super Admin";
  const isAdmin = role === "Admin";
  const isInCharge = role === "In-Charge";
  const isSupervisor = role === "Supervisor";
  const isEmployee = role === "Employee";
  const isSubstitute = role === "Substitute";

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleSection = (section) => setActiveSection(activeSection === section ? null : section);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    sessionStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      id: "dashboard",
      to: "/dashboard",
      label: "Dashboard",
      icon: "fas fa-tachometer-alt",
      roles: ["Super Admin", "Admin", "In-Charge", "Supervisor", "Employee", "Substitute"]
    },
    {
      id: "reports",
      label: "Reports",
      icon: "fas fa-chart-line",
      roles: ["Super Admin", "Admin"],
      children: [
        { to: "/reports/daily", label: "Details Report", icon: "fas fa-file-alt" },
        { to: "/reports/consolidated", label: "Consolidated Report", icon: "fas fa-layer-group" },
        { to: "/reports/time-based", label: "Time-Based Report", icon: "fas fa-clock" },
        { to: "/reports/incharge-monthly", label: "Incharge Monthly", icon: "fas fa-user-tie" },
        { to: "/reports/designation", label: "Designation Report", icon: "fas fa-id-badge" },
        { to: "/reports/monthly", label: "Monthly Report", icon: "fas fa-calendar-alt" },
        { to: "/reports/continuous-absent", label: "Continuously Absent", icon: "fas fa-user-slash" },
        { to: "/reports/payment-pending", label: "Payment Pending", icon: "fas fa-file-invoice-dollar" }
      ]
    },
    {
      id: "incharge-reports",
      label: "Incharge Reports",
      icon: "fas fa-chart-pie",
      roles: ["Super Admin", "In-Charge"],
      children: [{ to: "/reports/incharge-monthly", label: "Incharge Monthly", icon: "fas fa-user-tie" }]
    },
    {
      id: "lists",
      label: "Lists",
      icon: "fas fa-list",
      roles: ["Super Admin", "Admin"],
      children: [
        { to: "/list/employees", label: "Employee List", icon: "fas fa-users" },
        { to: "/list/users", label: "User List", icon: "fas fa-user" }
      ]
    },
    {
      id: "pages",
      label: "Management",
      icon: "fas fa-clipboard-list",
      roles: ["Super Admin", "In-Charge", "Supervisor"],
      children: [
        ...(isSupervisor || isSuperAdmin ? [{ to: "/list/supervisors", label: "Supervisor List", icon: "fas fa-users-cog" }] : []),
        ...(isInCharge || isSuperAdmin ? [{ to: "/list/incharge", label: "In-Charge List", icon: "fas fa-briefcase" }] : [])
      ]
    },
    {
      id: "employee",
      to: "/employee",
      label: "My Attendance",
      icon: "fas fa-calendar-check",
      roles: ["Super Admin", "Employee"]
    },
    {
      id: "substitute",
      to: "/substitute",
      label: "Substitute Info",
      icon: "fas fa-user-clock",
      roles: ["Super Admin", "Substitute"]
    }
  ];

  // Fix: Include items with 'to' or children
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(role) &&
    (item.to || (item.children && item.children.length > 0))
  );

  return (
    <div className="flex">
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-900 h-screen fixed top-0 left-0 z-50 md:relative transition-all duration-300 ease-in-out shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-sm">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <i className="fas fa-building text-indigo-600 text-sm"></i>
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">WorkFlow</h1>
                <p className="text-blue-200 text-xs">{role}</p>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200"
          >
            <i className={`fas ${isCollapsed ? "fa-bars" : "fa-chevron-left"} text-white text-sm`}></i>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <nav className="px-3 space-y-1">
            {filteredMenuItems.map((item) => (
              <div key={item.id}>
                {item.to ? (
                  <NavItem to={item.to} label={item.label} icon={item.icon} isCollapsed={isCollapsed} />
                ) : (
                  <div>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className={`flex items-center w-full px-3 py-3 text-left rounded-lg transition-all duration-200 group ${
                        activeSection === item.id
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <i className={`${item.icon} text-sm w-5 text-center group-hover:scale-110 transition-transform`}></i>
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 text-sm font-medium flex-1">{item.label}</span>
                          <i className={`fas fa-chevron-${activeSection === item.id ? "up" : "down"} text-xs transition-transform duration-200`}></i>
                        </>
                      )}
                    </button>
                    {!isCollapsed && activeSection === item.id && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <NavItem
                            key={child.to}
                            to={child.to}
                            label={child.label}
                            icon={child.icon}
                            isCollapsed={isCollapsed}
                            isChild
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all duration-200 group ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <i className="fas fa-sign-out-alt text-sm group-hover:scale-110 transition-transform"></i>
            {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

// NavItem Component
const NavItem = ({ to, label, icon, isCollapsed, isChild = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
        isChild ? "text-sm ml-2" : ""
      } ${
        isActive
          ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 shadow-sm border-l-4 border-blue-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      } ${isCollapsed ? "justify-center" : ""}`
    }
  >
    <i className={`${icon} text-sm ${isChild ? "text-xs" : ""} w-5 text-center group-hover:scale-110 transition-transform`}></i>
    {!isCollapsed && (
      <span className={`ml-3 font-medium ${isChild ? "text-xs" : "text-sm"}`}>{label}</span>
    )}
  </NavLink>
);

export default Sidebar;
