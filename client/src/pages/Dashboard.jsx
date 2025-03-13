import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts";
import { Bar as BarJS } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as TooltipJS, Legend as LegendJS } from "chart.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importing React Icons
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, Paper } from "@mui/material"; // Importing MUI components
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, TooltipJS, LegendJS);

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
  attendanceDistribution: [
    { name: "Present", value: 120 },
    { name: "Absent", value: 30 },
    { name: "Late", value: 5 },
  ],
  employeePerformance: [
    { name: "John Doe", performance: 85 },
    { name: "Jane Smith", performance: 90 },
    { name: "Emily Brown", performance: 78 },
    { name: "Chris Wilson", performance: 92 },
  ],
};

const Dashboard = ({ pendingPayments = [], closePendingPayment = () => { } }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pendingPayments && Array.isArray(pendingPayments) && pendingPayments.length > 0) setOpen(true);
  }, [pendingPayments]);

  // Pie Chart Data
  const pieData = dashboardData.attendanceDistribution;
  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  // Line Chart Data
  const lineData = dashboardData.monthlyLabels.map((label, index) => ({
    name: label,
    Attendance: dashboardData.monthlyAttendanceData[index],
  }));

  // Bar Chart Data
  const barData = dashboardData.employeePerformance;

  // Area Chart Data
  const areaData = dashboardData.dailyLabels.map((label, index) => ({
    name: label,
    Attendance: dashboardData.dailyAttendanceData[index],
  }));

  // Daily Chart Data (Chart.js)
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

  // Monthly Chart Data (Chart.js)
  const monthlyChartData = {
    labels: dashboardData.monthlyLabels,
    datasets: [
      {
        label: "Monthly Attendance (%)",
        data: dashboardData.monthlyAttendanceData,
        backgroundColor: "rgba(34, 202, 236, 0.2)",
        borderColor: "rgba(34, 202, 236, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-[80%] overflow-y-auto">
        <Navbar />
        <div className="p-8">
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">Erode Corporation</h3>

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
            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Attendance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="Attendance" stroke="#00C49F" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Employee Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="performance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Area Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area type="monotone" dataKey="Attendance" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Daily Attendance Report (Chart.js) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Attendance Report</h3>
              <BarJS data={dailyChartData} />
            </div>

            {/* Monthly Attendance Report (Chart.js) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Attendance Report</h3>
              <BarJS data={monthlyChartData} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#1976D2", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 2 }}>
          <Typography variant="h6">Pending Payments</Typography>
          <IconButton onClick={() => setOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: "#FAFAFA", px: 3, py: 2 }}>
          {pendingPayments.length > 0 ? (
            pendingPayments.map((payment) => (
              <Paper key={payment.id} elevation={3} sx={{ display: "flex", flexDirection: "column", p: 2, mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {payment.name} - <span style={{ color: "#43A047" }}>{payment.amount}</span>
                  </Typography>
                  <IconButton color="error" onClick={() => closePendingPayment(payment.id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Typography variant="caption" sx={{ color: "#757575", mt: 1 }}>
                  Company: {payment.company}
                </Typography>
                <Typography variant="caption" sx={{ color: "#757575", mt: 1 }}>
                  Date: {payment.date}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography sx={{ color: "#757575", textAlign: "center" }}>No pending payments!</Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#F5F5F5", px: 3, py: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate("/reports/Payment-Pending-Report")}>
            View Details
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;