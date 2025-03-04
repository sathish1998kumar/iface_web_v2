import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Typography } from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CardCount from "./pages/CardCount";
import GoogleMap from "./pages/GoogleMap";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports/Reports";
import DailyReport from "./pages/Reports/DailyReport";
import ConsolidatedReport from "./pages/Reports/ConsolidatedReport";
import TimeBasedReport from "./pages/Reports/TimeBasedReport";
import InchargeMonthlyReport from "./pages/Reports/InchargeMonthlyReport";
import DesignationReport from "./pages/Reports/DesignationReport";
import MonthlyReport from "./pages/Reports/MonthlyReport";
import ContinuouslyAbsentReport from "./pages/Reports/ContinuouslyAbsentReport";
import PaymentPendingReport from "./pages/Reports/PaymentPendingReport";
import EmployeeList from "./pages/List/EmployeeList";
import UserList from "./pages/List/UserList";
import Layout from "./components/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";
import PaymentDetailsReport from "./pages/Reports/PaymentPendingReport";

const App = () => {
  // Pending payments state
  const [pendingPayments, setPendingPayments] = useState([
    { id: 1, name: "Arun Kumar", company: "Chennai ABC Pvt Ltd", amount: "₹10,000", status: "Pending", details: "Invoice from Chennai branch pending", date: "2024-02-01" },
    { id: 4, name: "Vignesh", company: "Trichy DEF Solutions", amount: "₹20,000", status: "Pending", details: "Invoice from Trichy branch pending", date: "2024-02-04" },
    { id: 6, name: "Manikandan", company: "Thanjavur JKL Tech", amount: "₹25,000", status: "Pending", details: "Invoice from Thanjavur branch pending", date: "2024-02-06" },
    { id: 9, name: "Krishna", company: "Cuddalore STU Enterprises", amount: "₹28,000", status: "Pending", details: "Invoice from Cuddalore branch pending", date: "2024-02-09" },

  ]);

  // Function to remove a pending payment
  const closePendingPayment = (id) => {
    setPendingPayments(pendingPayments.filter(payment => payment.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard pendingPayments={pendingPayments} closePendingPayment={closePendingPayment} /></ProtectedRoute>} />
        <Route path="/CardCount" element={<ProtectedRoute><CardCount /></ProtectedRoute>} />
        <Route path="/GoogleMap" element={<ProtectedRoute><GoogleMap /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/reports/daily" element={<ProtectedRoute><Layout><DailyReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/consolidated" element={<ProtectedRoute><Layout><ConsolidatedReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/time-based" element={<ProtectedRoute><Layout><TimeBasedReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/incharge-monthly" element={<ProtectedRoute><Layout><InchargeMonthlyReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/designation" element={<ProtectedRoute><Layout><DesignationReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/monthly" element={<ProtectedRoute><Layout><MonthlyReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/continuous-absent" element={<ProtectedRoute><Layout><ContinuouslyAbsentReport /></Layout></ProtectedRoute>} />
        <Route path="/reports/payment-pending" element={<ProtectedRoute><Layout><PaymentPendingReport /></Layout></ProtectedRoute>} />
        <Route path="/list/employees" element={<ProtectedRoute><Layout><EmployeeList /></Layout></ProtectedRoute>} />
        <Route path="/list/users" element={<ProtectedRoute><Layout><UserList /></Layout></ProtectedRoute>} />
        <Route path="/payments" element={<PaymentDetailsReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;