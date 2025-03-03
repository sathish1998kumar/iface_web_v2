import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart = ({ chartData }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-white shadow-xl rounded-xl p-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center"></h3>
      <div className="relative h-80">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  font: { size: 14, family: "Inter, sans-serif" },
                  color: "#4B5563",
                },
              },
              title: {
                display: false,
              },
              tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#374151",
                bodyColor: "#1F2937",
                borderColor: "#D1D5DB",
                borderWidth: 1,
                titleFont: { size: 14, family: "Inter, sans-serif", weight: "600" },
                bodyFont: { size: 12, family: "Inter, sans-serif" },
              },
            },
            scales: {
              x: {
                grid: { color: "rgba(209, 213, 219, 0.1)", drawBorder: false },
                ticks: { color: "#4B5563", font: { size: 12, family: "Inter, sans-serif" } },
              },
              y: {
                beginAtZero: true,
                grid: { color: "rgba(209, 213, 219, 0.1)", drawBorder: false },
                ticks: {
                  stepSize: 10,
                  color: "#4B5563",
                  font: { size: 12, family: "Inter, sans-serif" },
                },
              },
            },
            elements: {
              bar: {
                borderWidth: 1,
                backgroundColor: "#4F46E5", // Vibrant purple
                borderColor: "#4338CA",
                borderRadius: 4,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyChart;
