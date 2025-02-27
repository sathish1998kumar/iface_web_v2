import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CardCount from "./pages/CardCount";
import GoogleMap from "./pages/GoogleMap";
import NotFound from "./pages/NotFound";
// Reports Pages
import Reports from "./pages/Reports/Reports";
import DailyReport from "./pages/Reports/DailyReport";
import ConsolidatedReport from "./pages/Reports/ConsolidatedReport";
import TimeBasedReport from "./pages/Reports/TimeBasedReport";
import InchargeMonthlyReport from "./pages/Reports/InchargeMonthlyReport";
import DesignationReport from "./pages/Reports/DesignationReport";
import MonthlyReport from "./pages/Reports/MonthlyReport";
import ContinuouslyAbsentReport from "./pages/Reports/ContinuouslyAbsentReport";
import PaymentPendingReport from "./pages/Reports/PaymentPendingReport";
// List Pages
import EmployeeList from "./pages/List/EmployeeList";
import UserList from "./pages/List/UserList";
// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./pages/ProtectedRoute"; // Authentication Wrapper

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/CardCount" element={<ProtectedRoute><CardCount /></ProtectedRoute>} />
      <Route path="/GoogleMap" element={<ProtectedRoute><GoogleMap /></ProtectedRoute>} />

      {/* Reports Routes (Inside Layout) */}
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/reports/daily" element={<ProtectedRoute><Layout><DailyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/consolidated" element={<ProtectedRoute><Layout><ConsolidatedReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/time-based" element={<ProtectedRoute><Layout><TimeBasedReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/incharge-monthly" element={<ProtectedRoute><Layout><InchargeMonthlyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/designation" element={<ProtectedRoute><Layout><DesignationReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/monthly" element={<ProtectedRoute><Layout><MonthlyReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/continuous-absent" element={<ProtectedRoute><Layout><ContinuouslyAbsentReport /></Layout></ProtectedRoute>} />
      <Route path="/reports/Payment-Pending-Report" element={<ProtectedRoute><Layout><PaymentPendingReport /></Layout></ProtectedRoute>} />

      {/* List Routes (Inside Layout) */}
      <Route path="/list/employees" element={<ProtectedRoute><Layout><EmployeeList /></Layout></ProtectedRoute>} />
      <Route path="/list/users" element={<ProtectedRoute><Layout><UserList /></Layout></ProtectedRoute>} />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;