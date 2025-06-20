import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";

// Lazy loaded components
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CardCount = lazy(() => import("./pages/CardCount"));
const GoogleMap = lazy(() => import("./pages/GoogleMap"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Reports = lazy(() => import("./pages/Reports/Reports"));
const DailyReport = lazy(() => import("./pages/Reports/DailyReport"));
const ConsolidatedReport = lazy(() =>
  import("./pages/Reports/ConsolidatedReport")
);
const TimeBasedReport = lazy(() => import("./pages/Reports/TimeBasedReport"));
const InchargeMonthlyReport = lazy(() =>
  import("./pages/Reports/InchargeMonthlyReport")
);
const DesignationReport = lazy(() =>
  import("./pages/Reports/DesignationReport")
);
const MonthlyReport = lazy(() => import("./pages/Reports/MonthlyReport"));
const ContinuouslyAbsentReport = lazy(() =>
  import("./pages/Reports/ContinuouslyAbsentReport")
);
const PaymentPendingReport = lazy(() =>
  import("./pages/Reports/PaymentPendingReport")
);
const EmployeeList = lazy(() => import("./pages/List/EmployeeList"));
const UserList = lazy(() => import("./pages/List/UserList"));

const App = () => {
  const [pendingPayments, setPendingPayments] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      company: "Chennai ABC Pvt Ltd",
      amount: "10,000",
      status: "Pending",
      details: "Invoice from Chennai branch pending",
      date: "2024-02-01",
    },
    {
      id: 4,
      name: "Vignesh",
      company: "Trichy DEF Solutions",
      amount: "20,000",
      status: "Pending",
      details: "Invoice from Trichy branch pending",
      date: "2024-02-04",
    },
    {
      id: 6,
      name: "Manikandan",
      company: "Thanjavur JKL Tech",
      amount: "25,000",
      status: "Pending",
      details: "Invoice from Thanjavur branch pending",
      date: "2024-02-06",
    },
    {
      id: 9,
      name: "Krishna",
      company: "Cuddalore STU Enterprises",
      amount: "28,000",
      status: "Pending",
      details: "Invoice from Cuddalore branch pending",
      date: "2024-02-09",
    },
  ]);

  const closePendingPayment = (id) => {
    setPendingPayments(pendingPayments.filter((payment) => payment.id !== id));
  };

  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard
                  pendingPayments={pendingPayments}
                  closePendingPayment={closePendingPayment}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CardCount"
            element={
              <ProtectedRoute>
                <CardCount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/GoogleMap"
            element={
              <ProtectedRoute>
                <GoogleMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/daily"
            element={
              <ProtectedRoute>
                <Layout>
                  <DailyReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/consolidated"
            element={
              <ProtectedRoute>
                <Layout>
                  <ConsolidatedReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/time-based"
            element={
              <ProtectedRoute>
                <Layout>
                  <TimeBasedReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/incharge-monthly"
            element={
              <ProtectedRoute>
                <Layout>
                  <InchargeMonthlyReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/designation"
            element={
              <ProtectedRoute>
                <Layout>
                  <DesignationReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/monthly"
            element={
              <ProtectedRoute>
                <Layout>
                  <MonthlyReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/continuous-absent"
            element={
              <ProtectedRoute>
                <Layout>
                  <ContinuouslyAbsentReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports/payment-pending"
            element={
              <ProtectedRoute>
                <Layout>
                  <PaymentPendingReport />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list/employees"
            element={
              <ProtectedRoute>
                <Layout>
                  <EmployeeList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/list/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
