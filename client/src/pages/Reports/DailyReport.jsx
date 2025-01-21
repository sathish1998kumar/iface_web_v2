import React, { useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import emp1 from '../emp1.png';  // Import your image

const DailyReport = () => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      photo: emp1,
      designation: "Software Engineer",
      attendance: "Present",
      workHours: "8 Hours",
      checkIn: "9:00 AM",
      checkOut: "5:00 PM",
      zone: "Zone 1",
      yard: "Yard A",
      date: "2025-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: emp1,
      designation: "UI/UX Designer",
      attendance: "Present",
      workHours: "7.5 Hours",
      checkIn: "9:30 AM",
      checkOut: "5:00 PM",
      zone: "Zone 2",
      yard: "Yard B",
      date: "2025-01-15",
    },
    {
      id: 3,
      name: "Michael Johnson",
      photo: emp1,
      designation: "Project Manager",
      attendance: "Absent",
      workHours: "-",
      checkIn: "-",
      checkOut: "-",
      zone: "Zone 3",
      yard: "Yard C",
      date: "2025-01-16",
    },
    {
      id: 4,
      name: "Emily Davis",
      photo: emp1,
      designation: "Quality Analyst",
      attendance: "Present",
      workHours: "8 Hours",
      checkIn: "9:15 AM",
      checkOut: "5:15 PM",
      zone: "Zone 4",
      yard: "Yard D",
      date: "2025-01-16",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter employees based on search, filter, and date range
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.designation.toLowerCase().includes(search.toLowerCase()) ||
      employee.attendance.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? employee.attendance === filter : true;

    const employeeDate = new Date(employee.date);
    const matchesDateRange =
      (!startDate || employeeDate >= new Date(startDate)) &&
      (!endDate || employeeDate <= new Date(endDate));

    return matchesSearch && matchesFilter && matchesDateRange;
  });

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Report");
    XLSX.writeFile(workbook, `DailyReport_${new Date().toLocaleDateString()}.xlsx`);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("Daily Employee Report", 70, 15);

    // Table data
    const tableData = filteredEmployees.map((employee) => [
      employee.id,
      employee.name,
      employee.designation,
      employee.attendance,
      employee.workHours,
      employee.checkIn,
      employee.checkOut,
      employee.zone,
      employee.yard,
    ]);

    doc.autoTable({
      head: [
        [
          "ID",
          "Name",
          "Designation",
          "Attendance",
          "Work Hours",
          "Check-In",
          "Check-Out",
          "Zone",
          "Yard",
        ],
      ],
      body: tableData,
      startY: 30,
    });

    doc.save(`DailyReport_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daily Employee Report</h1>

      {/* Search and Filter Section */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80"
          placeholder="Search by name, designation, or attendance"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md px-4 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-40"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-40"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="ml-auto flex gap-4 mt-4 sm:mt-0">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={exportToPDF}
          >
            Export to PDF
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Designation</th>
              <th className="border px-4 py-2">Attendance</th>
              <th className="border px-4 py-2">Work Hours</th>
              <th className="border px-4 py-2">Check-In</th>
              <th className="border px-4 py-2">Check-Out</th>
              <th className="border px-4 py-2">Zone</th>
              <th className="border px-4 py-2">Yard</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="border px-4 py-2">
                  <img src={employee.photo} alt={employee.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="border px-4 py-2">{employee.id}</td>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.designation}</td>
                <td className="border px-4 py-2">{employee.attendance}</td>
                <td className="border px-4 py-2">{employee.workHours}</td>
                <td className="border px-4 py-2">{employee.checkIn}</td>
                <td className="border px-4 py-2">{employee.checkOut}</td>
                <td className="border px-4 py-2">{employee.zone}</td>
                <td className="border px-4 py-2">{employee.yard}</td>
                <td className="border px-4 py-2">
                  {new Date(employee.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyReport;
