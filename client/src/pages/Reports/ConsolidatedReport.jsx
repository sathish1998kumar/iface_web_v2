import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Layout from "../components/Layout"; // Import Layout component

const ConsolidatedReport = () => {
  const employees = [
    { id: 1, name: "John Doe", designation: "Software Engineer", attendance: "Present", totalHours: "160", absentDays: 2 },
    { id: 2, name: "Jane Smith", designation: "UI/UX Designer", attendance: "Present", totalHours: "150", absentDays: 3 },
    { id: 3, name: "Michael Johnson", designation: "Project Manager", attendance: "Absent", totalHours: "120", absentDays: 6 },
    { id: 4, name: "Emily Davis", designation: "Quality Analyst", attendance: "Present", totalHours: "170", absentDays: 1 },
    // Add more employee data as needed
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || employee.attendance === filter;

    return matchesSearch && matchesFilter;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Consolidated Report");
    XLSX.writeFile(workbook, `ConsolidatedReport_${getCurrentDate()}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const logoUrl = "https://via.placeholder.com/100"; // Replace with your logo URL

    // Add logo
    doc.addImage(logoUrl, "PNG", 10, 10, 40, 20);

    // Add title
    doc.setFontSize(18);
    doc.text("Consolidated Attendance Report", 60, 20);

    // Add date
    doc.setFontSize(12);
    doc.text(`Date: ${getCurrentDate()}`, 60, 30);

    // Generate table data
    const tableData = filteredEmployees.map((employee) => [
      employee.id,
      employee.name,
      employee.designation,
      employee.attendance,
      employee.totalHours,
      employee.absentDays,
    ]);

    // Add table
    doc.autoTable({
      head: [["ID", "Name", "Designation", "Attendance", "Total Hours", "Absent Days"]],
      body: tableData,
      startY: 40,
    });

    // Save PDF
    doc.save(`ConsolidatedReport_${getCurrentDate()}.pdf`);
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Consolidated Attendance Report</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name or designation"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
          />

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          {/* Export Buttons */}
          <div className="flex gap-4 ml-auto">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Export to Excel
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Export to PDF
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Designation</th>
                <th className="border px-4 py-2">Attendance</th>
                <th className="border px-4 py-2">Total Hours</th>
                <th className="border px-4 py-2">Absent Days</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border px-4 py-2">{employee.id}</td>
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">{employee.designation}</td>
                  <td className="border px-4 py-2">{employee.attendance}</td>
                  <td className="border px-4 py-2">{employee.totalHours}</td>
                  <td className="border px-4 py-2">{employee.absentDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ConsolidatedReport;
