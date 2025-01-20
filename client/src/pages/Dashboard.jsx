import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dashboardData = {
  totalEmployees: 150,
  presentEmployees: 120,
  absentEmployees: 30,
  presentPercentage: 80,
  absentPercentage: 20,
  monthlyAttendanceData: [75, 80, 85, 90, 95, 85, 80, 78, 88, 92, 96, 98],
  dailyAttendanceData: [80, 85, 82, 90, 88, 85, 91],
  dailyLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  monthlyLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigating
  const monthlyChartData = {
    labels: dashboardData.monthlyLabels,
    datasets: [
      {
        label: "Attendance Trend (%)",
        data: dashboardData.monthlyAttendanceData,
        backgroundColor: "#3498db",
        borderColor: "#2980b9",
        borderWidth: 1,
      },
    ],
  };

  const dailyChartData = {
    labels: dashboardData.dailyLabels,
    datasets: [
      {
        label: "Daily Attendance (%)",
        data: dashboardData.dailyAttendanceData,
        backgroundColor: "#2ecc71",
        borderColor: "#27ae60",
        borderWidth: 1,
      },
    ],
  };

  const handleLogout = () => {
    // Clear any stored session data if necessary (like tokens)
    // Redirect to login page after logout
    navigate("/"); // This will redirect to the login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-[80%] overflow-y-auto">
        <Navbar />
        <div className="p-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Total Employees</h3>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.totalEmployees}</p>
              </div>
              <div className="text-gray-500 text-4xl">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Present Employees</h3>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.presentEmployees}</p>
              </div>
              <div className="text-green-500 text-4xl">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-700">Absent Employees</h3>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.absentEmployees}</p>
              </div>
              <div className="text-red-500 text-4xl">
                <i className="fas fa-times-circle"></i>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Present Percentage</h3>
              <div className="text-4xl font-bold text-gray-900">{dashboardData.presentPercentage}%</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Absent Percentage</h3>
              <div className="text-4xl font-bold text-gray-900">{dashboardData.absentPercentage}%</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Employee Performance</h3>
              <div className="flex justify-center items-center">
                <div className="w-full bg-gray-200 h-4 rounded-full">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${dashboardData.presentPercentage}%` }}
                  ></div>
                </div>
                <p className="ml-2 text-gray-500">{dashboardData.presentPercentage}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Attendance Report</h3>
            <div className="bg-gray-100 w-full h-96 rounded-md overflow-hidden">
              <Bar
                data={dailyChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Daily Attendance Trend (%)" },
                  },
                  scales: { y: { beginAtZero: true, ticks: { stepSize: 10 } } },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Attendance Report</h3>
            <div className="bg-gray-100 w-full h-96 rounded-md overflow-hidden">
              <Bar
                data={monthlyChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Monthly Attendance Trend (%)" },
                  },
                  scales: { y: { beginAtZero: true, ticks: { stepSize: 10 } } },
                }}
              />
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>

          <Routes>
            <Route path="/" element={<h1> </h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
