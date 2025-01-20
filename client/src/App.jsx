import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => (
  <Router>
    <Routes>
      {/* Route for login page */}
      <Route path="/" element={<Login />} />

      {/* Protected route for dashboard and nested routes */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        {/* <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  </Router>
);

export default App;
