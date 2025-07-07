import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts";
import { Bar as BarJS } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as TooltipJS, Legend as LegendJS } from "chart.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaChartLine, FaChartPie, FaChartBar, FaChartArea } from "react-icons/fa";
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, TooltipJS, LegendJS);

const dashboardData = {
  totalEmployees: 1150,
  presentEmployees: 1120,
  absentEmployees: 130,
  presentPercentage: 80,
  absentPercentage: 20,
  lateEmployees: 5,
  latePercentage: 3.33,
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
    { name: "Doe", performance: 85 },
    { name: "Smith", performance: 90 },
    { name: "Brown", performance: 78 },
    { name: "Wilson", performance: 92 },
  ],
  departments: [
    { name: "HR", employees: 15, present: 12 },
    { name: "Finance", employees: 20, present: 18 },
    { name: "IT", employees: 35, present: 32 },
    { name: "Operations", employees: 50, present: 40 },
    { name: "Marketing", employees: 30, present: 28 },
  ]
};

const Dashboard = ({ pendingPayments = [], closePendingPayment = () => { } }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pendingPayments && Array.isArray(pendingPayments) && pendingPayments.length > 0) setOpen(true);
  }, [pendingPayments]);

  // Chart Data
  const pieData = dashboardData.attendanceDistribution;
  const COLORS = ["#4CAF50", "#F44336", "#FFC107"];

  const lineData = dashboardData.monthlyLabels.map((label, index) => ({
    name: label,
    Attendance: dashboardData.monthlyAttendanceData[index],
  }));

  const barData = dashboardData.employeePerformance;

  const areaData = dashboardData.dailyLabels.map((label, index) => ({
    name: label,
    Attendance: dashboardData.dailyAttendanceData[index],
  }));

  const departmentData = dashboardData.departments.map(dept => ({
    name: dept.name,
    Present: dept.present,
    Absent: dept.employees - dept.present,
  }));

  const dailyChartData = {
    labels: dashboardData.dailyLabels,
    datasets: [
      {
        label: "Daily Attendance (%)",
        data: dashboardData.dailyAttendanceData,
        backgroundColor: "rgba(63, 81, 181, 0.3)",
        borderColor: "rgba(63, 81, 181, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const monthlyChartData = {
    labels: dashboardData.monthlyLabels,
    datasets: [
      {
        label: "Monthly Attendance (%)",
        data: dashboardData.monthlyAttendanceData,
        backgroundColor: "rgba(0, 150, 136, 0.3)",
        borderColor: "rgba(0, 150, 136, 1)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const departmentChartData = {
    labels: dashboardData.departments.map(d => d.name),
    datasets: [
      {
        label: "Present",
        data: dashboardData.departments.map(d => d.present),
        backgroundColor: "rgba(76, 175, 80, 0.5)",
      },
      {
        label: "Absent",
        data: dashboardData.departments.map(d => d.employees - d.present),
        backgroundColor: "rgba(244, 67, 54, 0.5)",
      },
    ],
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <motion.h3
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Erode Corporation Dashboard
            </motion.h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            </motion.div>
          </div>

          {/* Summary Cards */}
          <Grid container spacing={3} className="mb-8">
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
              >
                <Paper elevation={3} className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="subtitle2" className="opacity-80">Total Employees</Typography>
                      <Typography variant="h4" className="font-bold">{dashboardData.totalEmployees}</Typography>
                    </div>
                    <FaUsers className="text-3xl opacity-70" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-blue-400">
                    <Typography variant="caption" className="opacity-80">Across 5 departments</Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4 }}
              >
                <Paper elevation={3} className="p-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="subtitle2" className="opacity-80">Present Today</Typography>
                      <Typography variant="h4" className="font-bold">{dashboardData.presentEmployees}</Typography>
                    </div>
                    <FaCheckCircle className="text-3xl opacity-70" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-green-400">
                    <Typography variant="caption" className="opacity-80">{dashboardData.presentPercentage}% of workforce</Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              >
                <Paper elevation={3} className="p-6 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="subtitle2" className="opacity-80">Absent Today</Typography>
                      <Typography variant="h4" className="font-bold">{dashboardData.absentEmployees}</Typography>
                    </div>
                    <FaTimesCircle className="text-3xl opacity-70" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-red-400">
                    <Typography variant="caption" className="opacity-80">{dashboardData.absentPercentage}% of workforce</Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6 }}
              >
                <Paper elevation={3} className="p-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="subtitle2" className="opacity-80">Late Arrivals</Typography>
                      <Typography variant="h4" className="font-bold">{dashboardData.lateEmployees}</Typography>
                    </div>
                    <FaClock className="text-3xl opacity-70" />
                  </div>
                  <div className="mt-4 pt-2 border-t border-amber-400">
                    <Typography variant="caption" className="opacity-80">{dashboardData.latePercentage}% of present staff</Typography>
                  </div>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Main Charts Section */}
          <Grid container spacing={3} className="mb-8">
            {/* Attendance Distribution Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Paper elevation={2} className="p-4 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <FaChartPie className="text-blue-500 mr-2" />
                    <Typography variant="h6" className="font-semibold">Attendance Distribution</Typography>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} employees`, 'Count']}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }}
                          iconSize={10}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            {/* Monthly Attendance Trend */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Paper elevation={2} className="p-4 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <FaChartLine className="text-green-500 mr-2" />
                    <Typography variant="h6" className="font-semibold">Monthly Attendance Trend</Typography>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} domain={[70, 100]} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Attendance"
                          stroke="#4CAF50"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5, strokeWidth: 0 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            {/* Department-wise Attendance */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Paper elevation={2} className="p-4 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <FaChartBar className="text-purple-500 mr-2" />
                    <Typography variant="h6" className="font-semibold">Department Attendance</Typography>
                  </div>
                  <div className="h-64">
                    <BarJS
                      data={departmentChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            stacked: true,
                            grid: {
                              display: false
                            }
                          },
                          y: {
                            stacked: true,
                            grid: {
                              color: '#f0f0f0'
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              usePointStyle: true,
                              pointStyle: 'circle'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            {/* Employee Performance */}
            <Grid item xs={12} md={6}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Paper elevation={2} className="p-4 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <FaChartBar className="text-indigo-500 mr-2" />
                    <Typography variant="h6" className="font-semibold">Employee Performance</Typography>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} domain={[70, 100]} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }}
                        />
                        <Bar
                          dataKey="performance"
                          fill="#3F51B5"
                          radius={[4, 4, 0, 0]}
                          animationDuration={2000}
                        >
                          {barData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.performance > 90 ? "#4CAF50" : entry.performance > 80 ? "#3F51B5" : "#FFC107"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </motion.div>
            </Grid>

            {/* Daily Attendance Trend */}
            <Grid item xs={12} md={6}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Paper elevation={2} className="p-4 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <FaChartArea className="text-teal-500 mr-2" />
                    <Typography variant="h6" className="font-semibold">Daily Attendance Trend</Typography>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaData}>
                        <defs>
                          <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#009688" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#009688" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} domain={[75, 95]} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: 'none'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="Attendance"
                          stroke="#009688"
                          fillOpacity={1}
                          fill="url(#colorAttendance)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Additional Reports Section */}
          <Typography variant="h5" className="font-bold mb-4 mt-8">Detailed Reports</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-4 rounded-xl">
                <Typography variant="h6" className="font-semibold mb-4">Weekly Attendance</Typography>
                <div className="h-64">
                  <BarJS
                    data={dailyChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 75,
                          max: 100,
                          grid: {
                            color: '#f0f0f0'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="p-4 rounded-xl">
                <Typography variant="h6" className="font-semibold mb-4">Annual Attendance</Typography>
                <div className="h-64">
                  <BarJS
                    data={monthlyChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 70,
                          max: 100,
                          grid: {
                            color: '#f0f0f0'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

      {/* Payment Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#3F51B5",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>Pending Payments</Typography>
          <IconButton
            onClick={() => setOpen(false)}
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: "#FAFAFA", px: 3, py: 2 }}>
          {pendingPayments.length > 0 ? (
            pendingPayments.map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                    mb: 2,
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {payment.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#43A047", fontWeight: 600, mt: 0.5 }}>
                        ₹{payment.amount}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => closePendingPayment(payment.id)}
                      sx={{
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 67, 54, 0.2)'
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      {payment.company}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#757575" }}>
                      {payment.date}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            ))
          ) : (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
              textAlign: 'center'
            }}>
              <img
                src="/images/empty-state.svg"
                alt="No pending payments"
                style={{ width: '120px', opacity: 0.6, marginBottom: '16px' }}
              />
              <Typography variant="body1" sx={{ color: "#757575" }}>
                No pending payments!
              </Typography>
              <Typography variant="caption" sx={{ color: "#9e9e9e", mt: 1 }}>
                All payments are up to date
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#F5F5F5", px: 3, py: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 2,
              py: 1
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/reports/payment-pending")}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }
            }}
          >
            View All Payments
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;