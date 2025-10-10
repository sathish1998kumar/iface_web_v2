import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";

// Lazy imports
const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const CardCount = lazy(() => import("./pages/dashboard/CardCount"));
const GoogleMap = lazy(() => import("./pages/map/GoogleMap"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Reports
const Reports = lazy(() => import("./pages/reports/Reports"));
const reportPages = {
  daily: lazy(() => import("./pages/reports/DailyReport")),
  consolidated: lazy(() => import("./pages/reports/ConsolidatedReport")),
  timeBased: lazy(() => import("./pages/reports/TimeBasedReport")),
  inchargeMonthly: lazy(() => import("./pages/reports/InchargeMonthlyReport")),
  designation: lazy(() => import("./pages/reports/DesignationReport")),
  monthly: lazy(() => import("./pages/reports/MonthlyReport")),
  continuousAbsent: lazy(() =>
    import("./pages/reports/ContinuouslyAbsentReport")
  ),
  paymentPending: lazy(() => import("./pages/reports/PaymentPendingReport")),
};

// Lists
const EmployeeList = lazy(() => import("./pages/List/EmployeeList"));
const UserList = lazy(() => import("./pages/List/UserList"));
const SupervisorList = lazy(() => import("./pages/List/SupervisorList"));
const InchargeList = lazy(() => import("./pages/List/InchargeList"));

// New Pages
const InchargePage = lazy(() => import("./pages/InchargePage"));
const SupervisorPage = lazy(() => import("./pages/supervisor/SupervisorPage"));
const EmployeePage = lazy(() => import("./pages/employee/EmployeePage"));
const SubstitutePage = lazy(() => import("./pages/SubstitutePage"));

// Wrappers for reuse
const withProtection = (Component, props = {}) => (
  <ProtectedRoute>
    <Component {...props} />
  </ProtectedRoute>
);

const withLayout = (Component, props) => (
  <ProtectedRoute>
    <Layout>
      <Component {...props} />
    </Layout>
  </ProtectedRoute>
);

const AppRoutes = ({ pendingPayments, closePendingPayment }) => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route
      path="/dashboard/*"
      element={withLayout(Dashboard, {
        pendingPayments,
        closePendingPayment,
      })}
    />
    <Route path="/cardcount" element={withProtection(CardCount)} />
    <Route path="/googlemap" element={withProtection(GoogleMap)} />

    {/* Reports */}
    <Route path="/reports" element={withProtection(Reports)} />
    <Route path="/reports/daily" element={withLayout(reportPages.daily)} />
    <Route
      path="/reports/consolidated"
      element={withLayout(reportPages.consolidated)}
    />
    <Route
      path="/reports/time-based"
      element={withLayout(reportPages.timeBased)}
    />
    <Route
      path="/reports/incharge-monthly"
      element={withLayout(reportPages.inchargeMonthly)}
    />
    <Route
      path="/reports/designation"
      element={withLayout(reportPages.designation)}
    />
    <Route path="/reports/monthly" element={withLayout(reportPages.monthly)} />
    <Route
      path="/reports/continuous-absent"
      element={withLayout(reportPages.continuousAbsent)}
    />
    <Route
      path="/reports/payment-pending"
      element={withLayout(reportPages.paymentPending)}
    />

    {/* Lists */}
    <Route path="/list/employees" element={withLayout(EmployeeList)} />
    <Route path="/list/users" element={withLayout(UserList)} />
    <Route path="/list/incharge" element={withLayout(InchargeList)} />
    <Route path="/list/supervisors" element={withLayout(SupervisorList)} />

    <Route path="/incharge" element={withLayout(InchargePage)} />
    <Route path="/supervisor" element={withLayout(SupervisorPage)} />
    <Route path="/substitute" element={withLayout(SubstitutePage)} />
    <Route path="/employee" element={withLayout(EmployeePage)} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
