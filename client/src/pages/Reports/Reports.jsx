import { NavLink } from "react-router-dom";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      
      <div className="space-y-4">
        {/* Link to Daily Report */}
        <NavLink
          to="/reports/daily"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Daily Report
        </NavLink>

        {/* You can add more report links here */}
        <NavLink
          to="/reports/consolidated"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Consolidated Report
        </NavLink>

        <NavLink
          to="/reports/time-based"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Time-Based Report
        </NavLink>

        <NavLink
          to="/reports/incharge-monthly"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Incharge Monthly Report
        </NavLink>

        <NavLink
          to="/reports/designation"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Designation Report
        </NavLink>

        <NavLink
          to="/reports/monthly"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Monthly Report
        </NavLink>

        <NavLink
          to="/reports/continuous-absent"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Continuously Absent Report
        </NavLink>
        <NavLink
          to="/reports/Payment-Pending-Report"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
         PaymentPendingReport
        </NavLink>
      </div>
    </div>
  );
};

export default Reports;
