import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports/Reports";
import DailyReport from "./pages/Reports/DailyReport"; // Import the DailyReport component
import Layout from "./components/Layout"; 

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
      <Route path="/reports/daily"  element={ <Layout><DailyReport /></Layout>}
      />
    </Routes>
  </Router>
);

export default App;