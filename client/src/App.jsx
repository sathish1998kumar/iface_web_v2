import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports/Reports";
import DailyReport from "./pages/Reports/DailyReport";
import ConsolidatedReport from "./pages/Reports/ConsolidatedReport";

import Layout from "./components/Layout";
import AttendanceDashboard from "./pages/AttendanceDashboard"; // Import the AttendanceDashboard component
import NotFound from "./pages/NotFound"; // Import the NotFound (404 Page) component

import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => (
  <Router>
    <Routes>
      {/* Route for login page */}
      <Route path="/" element={<Login />} />

      {/* Protected route for dashboard page */}
      <Route path="/dashboard/*" element={<Dashboard />} />

      {/* Route for reports page */}
      <Route path="/reports" element={<Reports />} />

      {/* Route for Daily Report page */}
      <Route path="/reports/daily" element={<Layout><DailyReport /></Layout>} />
      <Route path="/reports/consolidated" element={<Layout><ConsolidatedReport /></Layout>} />


      {/* Route for AttendanceDashboard after login */}
      <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />

      {/* 404 Page Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
