import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import {
  FaSortUp,
  FaSortDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaEye,
} from "react-icons/fa";

const DataTable = ({ data, columns, title }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  // Handle Sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Search & Filter
  const filteredData = sortedData.filter((row) =>
    columns.some((col) => row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Export Functions
  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const exportToPDF = () => {
    const input = document.getElementById("report-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`${title}_${getFormattedDate()}.pdf`);
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title}_${getFormattedDate()}.xlsx`);
  };

  const exportToCSV = () => {
    const csvContent = [
      columns.map((col) => col.label).join(","),
      ...data.map((row) => columns.map((col) => row[col.key]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}_${getFormattedDate()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle Column Visibility
  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">{title}</h1>

    {/* Controls Container */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4 items-center justify-between">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-4 py-2 rounded w-full sm:w-64 shadow-sm text-sm sm:text-base"
      />

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
        {/* Show Columns Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowColumnDropdown(!showColumnDropdown)} 
            className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base"
          >
            <FaEye /> Show Columns
          </button>
          {showColumnDropdown && (
            <div className="absolute right-0 sm:right-auto mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20">
              {columns.map((col) => (
                <label key={col.key} className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={visibleColumns[col.key]}
                    onChange={() => toggleColumnVisibility(col.key)}
                    className="mr-2"
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Export Buttons */}
        <button onClick={exportToPDF} className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm md:text-base">
          Export PDF
        </button>
        <button onClick={exportToExcel} className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm md:text-base">
          Export Excel
        </button>
        <button onClick={exportToCSV} className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm md:text-base">
          Export CSV
        </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border border-gray-300 shadow-md rounded-lg">
      <div className="max-h-[600px] overflow-y-auto">
        <table
          id="report-table"
          className="table-auto border-separate border-spacing-0 w-full min-w-full bg-white"
          style={{ tableLayout: "auto" }} // Allows columns to adjust dynamically
        >
          {/* Table Header */}
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr className="text-gray-800">
              {columns.map(
                (col) =>
                  visibleColumns[col.key] && (
                    <th
                      key={col.key}
                      className="border border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-300 text-sm sm:text-base"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}{" "}
                      {sortConfig.key === col.key &&
                        (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
                    </th>
                  )
              )}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                {columns.map(
                  (col) =>
                    visibleColumns[col.key] && (
                      <td
                        key={col.key}
                        className="border border-gray-300 px-4 py-3 break-words text-left text-sm sm:text-base"
                      >
                        {row[col.key]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <span className="text-sm sm:text-base">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="bg-gray-500 text-white px-3 py-1 rounded"><FaAngleDoubleLeft /></button>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-gray-500 text-white px-3 py-1 rounded"><FaAngleLeft /></button>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-gray-500 text-white px-3 py-1 rounded"><FaAngleRight /></button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="bg-gray-500 text-white px-3 py-1 rounded"><FaAngleDoubleRight /></button>
          <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} className="border px-2 py-1 rounded">
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>{size} per page</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTable;