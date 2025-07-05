// src/App.jsx
import React, { useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppRoutes from "./router";

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
    setPendingPayments((prev) =>
      prev.filter((payment) => payment.id !== id)
    );
  };

  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <AppRoutes
          pendingPayments={pendingPayments}
          closePendingPayment={closePendingPayment}
        />
      </Suspense>
    </Router>
  );
};

export default App;
