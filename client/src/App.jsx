import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports/Reports";
import DailyReport from "./pages/Reports/DailyReport";
import ConsolidatedReport from "./pages/Reports/ConsolidatedReport";
import TimeBasedReport from "./pages/Reports/TimeBasedReport";
import InchargeMonthlyReport from "./pages/Reports/InchargeMonthlyReport";
import DesignationReport from "./pages/Reports/DesignationReport";
import MonthlyReport from "./pages/Reports/MonthlyReport";
import ContinuouslyAbsentReport from "./pages/Reports/ContinuouslyAbsentReport";

import Layout from "./components/Layout";
import AttendanceDashboard from "./pages/AttendanceDashboard"; // Import the AttendanceDashboard component
import NotFound from "./pages/NotFound"; // Import the NotFound (404 Page) component

import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute
import EmployeeList from "./pages/List/EmployeeList"; // Import EmployeeList
import UserList from "./pages/List/UserList"; // Import UserList
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => (
  <Router>
    <Routes>
      {/* Route for login page */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected route for dashboard page */}
      <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      {/* Route for reports page */}
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />

      {/* Route for Daily Report page */}
      <Route path="/reports/daily" element={<ProtectedRoute><Layout><DailyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/consolidated" element={<ProtectedRoute><Layout><ConsolidatedReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/time-based" element={<ProtectedRoute><Layout><TimeBasedReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/incharge-monthly" element={<ProtectedRoute><Layout><InchargeMonthlyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/designation" element={<ProtectedRoute><Layout><DesignationReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/monthly" element={<ProtectedRoute><Layout><MonthlyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/continuous-absent" element={<ProtectedRoute><Layout><ContinuouslyAbsentReport /></Layout></ProtectedRoute>} />

      {/* Protected route for AttendanceDashboard after login */}
      <Route path="/attendance-dashboard" element={<ProtectedRoute><AttendanceDashboard /></ProtectedRoute>} />

      {/* Routes for EmployeeList and UserList with Layout */}
      <Route path="/list/employees" element={<ProtectedRoute><Layout><EmployeeList /></Layout></ProtectedRoute>} />
      <Route path="/list/users" element={<ProtectedRoute><Layout><UserList /></Layout></ProtectedRoute>} />

      {/* 404 Page Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
