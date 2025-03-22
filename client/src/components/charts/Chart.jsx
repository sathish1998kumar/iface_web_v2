import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const Charts = ({ data }) => {
  // Donut Chart Data
  const donutData = [
    { name: "Present", value: data.filter((item) => item.attendance === "Present").length },
    { name: "Absent", value: data.filter((item) => item.attendance === "Absent").length },
    { name: "Late", value: data.filter((item) => item.attendance === "Late").length },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

  // Stacked Bar Chart Data
  const barData = data.reduce((acc, item) => {
    const date = item.date;
    const existingEntry = acc.find((entry) => entry.name === date);

    if (existingEntry) {
      existingEntry.Present += item.attendance === "Present" ? 1 : 0;
      existingEntry.Absent += item.attendance === "Absent" ? 1 : 0;
      existingEntry.Late += item.attendance === "Late" ? 1 : 0;
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

  // Area Chart Data
  const areaData = data.reduce((acc, item) => {
    const date = item.date;
    const existingEntry = acc.find((entry) => entry.name === date);

    if (existingEntry) {
      existingEntry.Present += item.attendance === "Present" ? 1 : 0;
      existingEntry.Absent += item.attendance === "Absent" ? 1 : 0;
      existingEntry.Late += item.attendance === "Late" ? 1 : 0;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Donut Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={70} // Increased inner radius for donut effect
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Attendance by Date</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="Present" stackId="a" fill="#00C49F" />
            <Bar dataKey="Absent" stackId="a" fill="#FF8042" />
            <Bar dataKey="Late" stackId="a" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Attendance Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="Present"
              stroke="#00C49F"
              fill="#00C49F"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="Absent"
              stroke="#FF8042"
              fill="#FF8042"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="Late"
              stroke="#0088FE"
              fill="#0088FE"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;