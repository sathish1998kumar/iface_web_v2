import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { BarChart, Bar, Rectangle } from "recharts";

const Charts = ({ data }) => {
  // Pie Chart Data
  const pieData = [
    { name: "Present", value: data.filter((item) => item.attendance === "Present").length },
    { name: "Absent", value: data.filter((item) => item.attendance === "Absent").length },
    { name: "Late", value: data.filter((item) => item.attendance === "Late").length },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  // Line Chart Data
  const lineData = data.reduce((acc, item) => {
    const date = item.date;
    const existingEntry = acc.find((entry) => entry.name === date);

    if (existingEntry) {
      existingEntry[item.attendance] = (existingEntry[item.attendance] || 0) + 1;
    } else {
      acc.push({
        name: date,
        Present: item.attendance === "Present" ? 1 : 0,
        Absent: item.attendance === "Absent" ? 1 : 0,
        Late: item.attendance === "Late" ? 1 : 0,
      });
    }

    return acc;
  }, []);

  // Bar Chart Data
  const barData = data.map((employee) => ({
    name: employee.name,
    Present: employee.attendance === "Present" ? 1 : 0,
    Absent: employee.attendance === "Absent" ? 1 : 0,
    Late: employee.attendance === "Late" ? 1 : 0,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey="Present" stroke="#00C49F" strokeWidth={3} />
            <Line type="monotone" dataKey="Absent" stroke="#FF8042" strokeWidth={3} />
            <Line type="monotone" dataKey="Late" stroke="#0088FE" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Employee Attendance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="Present" fill="#00C49F" activeBar={<Rectangle fill="green" stroke="blue" />} />
            <Bar dataKey="Absent" fill="#FF8042" activeBar={<Rectangle fill="red" stroke="purple" />} />
            <Bar dataKey="Late" fill="#0088FE" activeBar={<Rectangle fill="blue" stroke="green" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;