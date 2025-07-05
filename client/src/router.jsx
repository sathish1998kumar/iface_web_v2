// src/router.jsx
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./components/Layout";

// Lazy imports
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CardCount = lazy(() => import("./pages/CardCount"));
const GoogleMap = lazy(() => import("./pages/GoogleMap"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Reports
const Reports = lazy(() => import("./pages/Reports/Reports"));
const reportPages = {
  daily: lazy(() => import("./pages/Reports/DailyReport")),
  consolidated: lazy(() => import("./pages/Reports/ConsolidatedReport")),
  timeBased: lazy(() => import("./pages/Reports/TimeBasedReport")),
  inchargeMonthly: lazy(() => import("./pages/Reports/InchargeMonthlyReport")),
  designation: lazy(() => import("./pages/Reports/DesignationReport")),
  monthly: lazy(() => import("./pages/Reports/MonthlyReport")),
  continuousAbsent: lazy(() => import("./pages/Reports/ContinuouslyAbsentReport")),
  paymentPending: lazy(() => import("./pages/Reports/PaymentPendingReport")),
};

// Lists
const EmployeeList = lazy(() => import("./pages/List/EmployeeList"));
const UserList = lazy(() => import("./pages/List/UserList"));
const InchargeList = lazy(() => import("./pages/List/InchargeList"));
const SupervisorList = lazy(() => import("./pages/List/SupervisorList"));


// Wrappers for reuse
const withProtection = (Component, props = {}) => (
  <ProtectedRoute>
    <Component {...props} />
  </ProtectedRoute>
);

const withLayout = (Component) => (
  <ProtectedRoute>
    <Layout>
      <Component />
    </Layout>
  </ProtectedRoute>
);

const AppRoutes = ({ pendingPayments, closePendingPayment }) => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route path="/dashboard/*" element={withProtection(Dashboard, { pendingPayments, closePendingPayment })} />
    <Route path="/cardcount" element={withProtection(CardCount)} />
    <Route path="/googlemap" element={withProtection(GoogleMap)} />

    {/* Reports */}
    <Route path="/reports" element={withProtection(Reports)} />
    <Route path="/reports/daily" element={withLayout(reportPages.daily)} />
    <Route path="/reports/consolidated" element={withLayout(reportPages.consolidated)} />
    <Route path="/reports/time-based" element={withLayout(reportPages.timeBased)} />
    <Route path="/reports/incharge-monthly" element={withLayout(reportPages.inchargeMonthly)} />
    <Route path="/reports/designation" element={withLayout(reportPages.designation)} />
    <Route path="/reports/monthly" element={withLayout(reportPages.monthly)} />
    <Route path="/reports/continuous-absent" element={withLayout(reportPages.continuousAbsent)} />
    <Route path="/reports/payment-pending" element={withLayout(reportPages.paymentPending)} />

    {/* Lists */}
    <Route path="/list/employees" element={withLayout(EmployeeList)} />
    <Route path="/list/users" element={withLayout(UserList)} />
    <Route path="/list/incharge" element={withLayout(InchargeList)} />
    <Route path="/list/supervisors" element={withLayout(SupervisorList)} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;