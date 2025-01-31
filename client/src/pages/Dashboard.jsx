import Card from "../components/Card";
import MonthlyChart from "../charts/MonthlyChart";
import DailyChart from "../charts/DailyChart";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import ExportButtons from "../components/ExportButtons";
import logo from "../assets/iface_v.2.png"; // Import your logo

import { FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing React Icons

const dashboardData = {
  totalEmployees: 150, 
  presentEmployees: 120,
  absentEmployees: 30,
  presentPercentage: 80,
  absentPercentage: 20,
  lateEmployees: 5,
  latePercentage: 3,
  monthlyAttendanceData: [75, 80, 85, 90, 95, 85, 80, 78, 88, 92, 96, 98],
  dailyAttendanceData: [80, 85, 82, 90, 88, 85, 91],
  dailyLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  monthlyLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

// Static table data
const tableData = [
  {
    yardName: "Yard A",
    present: 50,
    absent: 10,
    zone: "North",
    inchargeName: "John Doe",
    inchargePhoto: "https://images.pexels.com/photos/2437221/pexels-photo-2437221.jpeg",
  },
  {
    yardName: "Yard B",
    present: 60,
    absent: 5,
    zone: "East",
    inchargeName: "Jane Smith",
    inchargePhoto: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg",
  },
  {
    yardName: "Yard C",
    present: 40,
    absent: 15,
    zone: "South",
    inchargeName: "Alice Johnson",
    inchargePhoto: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
];

const Dashboard = () => {
  const monthlyChartData = {
    labels: dashboardData.monthlyLabels,
    datasets: [
      {
        label: "Attendance Trend (%)",
        data: dashboardData.monthlyAttendanceData,
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
      },
    ],
  };

  const dailyChartData = {
    labels: dashboardData.dailyLabels,
    datasets: [
      {
        label: "Daily Attendance (%)",
        data: dashboardData.dailyAttendanceData,
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        borderColor: "rgba(52, 152, 219, 1)",
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-[80%] overflow-y-auto">
        <Navbar />
        <div className="p-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">Dashboard</h1>

           {/* Summary Cards */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-md text-center">
              <FaUsers className="text-5xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Employees</h3>
              <div className="text-4xl font-bold text-indigo-600">{dashboardData.totalEmployees}</div>
            </div>
            <div className="bg-teal-100 p-6 rounded-lg shadow-md text-center">
              <FaCheckCircle className="text-5xl text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Present Employees</h3>
              <div className="text-4xl font-bold text-teal-600">{dashboardData.presentEmployees}</div>
            </div>
            <div className="bg-rose-100 p-6 rounded-lg shadow-md text-center">
              <FaTimesCircle className="text-5xl text-rose-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Absent Employees</h3>
              <div className="text-4xl font-bold text-rose-600">{dashboardData.absentEmployees}</div>
            </div>
          </div>

          {/* Percentages and Late Employees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-cyan-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Present Percentage</h3>
              <div className="text-4xl font-bold text-cyan-600">{dashboardData.presentPercentage}%</div>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Absent Percentage</h3>
              <div className="text-4xl font-bold text-orange-600">{dashboardData.absentPercentage}%</div>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Late Employees</h3>
              <div className="text-4xl font-bold text-purple-600">{dashboardData.lateEmployees}</div>
              <div className="text-lg text-gray-500">{dashboardData.latePercentage}%</div>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Attendance Report</h3>
              <DailyChart chartData={dailyChartData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Attendance Report</h3>
              <MonthlyChart chartData={monthlyChartData} />
            </div>
          </div>

          {/* Table and Export Buttons */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Employee Table</h3>
            <ExportButtons data={tableData} logo={logo} />
            <Table data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
