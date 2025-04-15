import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FaSortUp, FaSortDown, FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaEye, FaFilter, FaCalendarAlt, FaTimes, } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import companyLogo from "../assets/iface_v.2.png";

const DataTable = ({ data, columns, title }) => {
  // State management
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showZoneFilter, setShowZoneFilter] = useState(false);
  const [showYardFilter, setShowYardFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedYards, setSelectedYards] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    option: "all", // "all", "today", "custom"
    startDate: null,
    endDate: null
  });

  // Filter options
  const zoneOptions = ["zone 1", "zone 2", "zone 3", "zone 4"];
  const yardOptions = ["yard 1", "yard 2", "yard 3", "yard 4"];

  // Handle Sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Apply sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Apply all filters
  const filteredData = sortedData.filter((row) => {
    // Search filter
    const matchesSearch = columns.some((col) =>
      visibleColumns[col.key] && row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Zone filter
    const matchesZone = selectedZones.length === 0 ||
      (row.zone && selectedZones.includes(row.zone));

    // Yard filter
    const matchesYard = selectedYards.length === 0 ||
      (row.yard && selectedYards.includes(row.yard));

    // Date filter
    let matchesDate = true;
    if (dateFilter.option === "today" && row.date) {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = row.date === today;
    } else if (dateFilter.option === "custom" && row.date) {
      const rowDate = new Date(row.date);
      matchesDate = (!dateFilter.startDate || rowDate >= dateFilter.startDate) &&
        (!dateFilter.endDate || rowDate <= dateFilter.endDate);
    }

    return matchesSearch && matchesZone && matchesYard && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Toggle zone selection
  const toggleZone = (zone) => {
    setSelectedZones(prev =>
      prev.includes(zone)
        ? prev.filter(z => z !== zone)
        : [...prev, zone]
    );
    setCurrentPage(1);
  };

  // Toggle yard selection
  const toggleYard = (yard) => {
    setSelectedYards(prev =>
      prev.includes(yard)
        ? prev.filter(y => y !== yard)
        : [...prev, yard]
    );
    setCurrentPage(1);
  };

  // Handle date filter change
  const handleDateFilterChange = (option) => {
    setDateFilter({
      option,
      startDate: option === "custom" ? dateFilter.startDate : null,
      endDate: option === "custom" ? dateFilter.endDate : null
    });
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedZones([]);
    setSelectedYards([]);
    setDateFilter({
      option: "all",
      startDate: null,
      endDate: null
    });
    setCurrentPage(1);
  };

  // Export functions
  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const exportToPDF = async () => {
    const input = document.getElementById("report-table");

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(companyLogo, 'PNG', 10, 10, 30, 10); // Adjust size as needed
      pdf.setFontSize(16);
      pdf.setTextColor(40);
      pdf.text(title, 45, 18); // Positioned to the right of the logo
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${getFormattedDate()}`, 45, 23);
      pdf.addImage(imgData, 'PNG', 10, 30, imgWidth, imgHeight);
      pdf.save(`${title}_${getFormattedDate()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`${title}_${getFormattedDate()}.pdf`);
    }
  };

  const exportToExcel = () => {
    const visibleData = data.map(row => {
      const visibleRow = {};
      columns.forEach(col => {
        if (visibleColumns[col.key]) {
          visibleRow[col.label] = row[col.key];
        }
      });
      return visibleRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title}_${getFormattedDate()}.xlsx`);
  };

  const exportToCSV = () => {
    const visibleColumnsList = columns.filter(col => visibleColumns[col.key]);
    const csvContent = [
      visibleColumnsList.map((col) => col.label).join(","),
      ...data.map((row) =>
        visibleColumnsList.map((col) => row[col.key]).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}_${getFormattedDate()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle column visibility
  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
    setCurrentPage(1);
  };

  // Handle row click for modal
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Count visible columns for colspan
  const visibleColumnsCount = Object.values(visibleColumns).filter(v => v).length;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">{title}</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetFilters}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <FaTimes /> Reset Filters
            </button>
            <button
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <FaEye /> Columns
            </button>
            <div className="relative">
              <button
                onClick={() => setShowZoneFilter(!showZoneFilter)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <FaFilter /> Zones
              </button>
              {showZoneFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2">
                  {zoneOptions.map((zone) => (
                    <label key={zone} className="flex items-center px-3 py-1 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={selectedZones.includes(zone)}
                        onChange={() => toggleZone(zone)}
                        className="mr-2"
                      />
                      {zone}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowYardFilter(!showYardFilter)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <FaFilter /> Yards
              </button>
              {showYardFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-2">
                  {yardOptions.map((yard) => (
                    <label key={yard} className="flex items-center px-3 py-1 hover:bg-gray-100 rounded">
                      <input
                        type="checkbox"
                        checked={selectedYards.includes(yard)}
                        onChange={() => toggleYard(yard)}
                        className="mr-2"
                      />
                      {yard}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
              >
                <FaCalendarAlt /> Date
              </button>
              {showDateFilter && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-4">
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={dateFilter.option === "all"}
                        onChange={() => handleDateFilterChange("all")}
                        className="mr-2"
                      />
                      All Dates
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={dateFilter.option === "today"}
                        onChange={() => handleDateFilterChange("today")}
                        className="mr-2"
                      />
                      Today Only
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={dateFilter.option === "custom"}
                        onChange={() => handleDateFilterChange("custom")}
                        className="mr-2"
                      />
                      Custom Range
                    </label>
                    {dateFilter.option === "custom" && (
                      <div className="space-y-2 ml-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                          <DatePicker
                            selected={dateFilter.startDate}
                            onChange={(date) => setDateFilter(prev => ({ ...prev, startDate: date }))}
                            selectsStart
                            startDate={dateFilter.startDate}
                            endDate={dateFilter.endDate}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                          <DatePicker
                            selected={dateFilter.endDate}
                            onChange={(date) => setDateFilter(prev => ({ ...prev, endDate: date }))}
                            selectsEnd
                            startDate={dateFilter.startDate}
                            endDate={dateFilter.endDate}
                            minDate={dateFilter.startDate}
                            className="border px-2 py-1 rounded w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search across all columns..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border px-4 py-2 pl-10 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <span>PDF</span>
            </button>
            <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <span>Excel</span>
            </button>
            <button onClick={exportToCSV} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Column visibility dropdown */}
        {showColumnDropdown && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {columns.map((col) => (
              <label key={col.key} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded">
                <input
                  type="checkbox"
                  checked={visibleColumns[col.key]}
                  onChange={() => toggleColumnVisibility(col.key)}
                  className="mr-2 h-4 w-4 text-blue-600 rounded"
                />
                {col.label}
              </label>
            ))}
          </div>
        )}

        {/* Active filters display */}
        {(searchQuery || selectedZones.length > 0 || selectedYards.length > 0 || dateFilter.option !== "all") && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-blue-800">Active filters:</span>
              {searchQuery && (
                <span className="bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {selectedZones.length > 0 && (
                <span className="bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                  Zones: {selectedZones.join(", ")}
                  <button
                    onClick={() => setSelectedZones([])}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {selectedYards.length > 0 && (
                <span className="bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                  Yards: {selectedYards.join(", ")}
                  <button
                    onClick={() => setSelectedYards([])}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {dateFilter.option === "today" && (
                <span className="bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                  Today only
                  <button
                    onClick={() => handleDateFilterChange("all")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {dateFilter.option === "custom" && (
                <span className="bg-white px-2 py-1 rounded-full text-xs flex items-center gap-1 border border-blue-200">
                  Date: {dateFilter.startDate?.toLocaleDateString() || "..."}
                  {" to "}
                  {dateFilter.endDate?.toLocaleDateString() || "..."}
                  <button
                    onClick={() => handleDateFilterChange("all")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table
                id="report-table"
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="sticky top-0 z-10 bg-blue-100 border-b border-blue-300">
                  <tr>
                    {columns.map((col) => (
                      visibleColumns[col.key] && (
                        <th
                          key={col.key}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-200 transition-colors duration-150"
                          onClick={() => handleSort(col.key)}
                        >
                          <div className="flex items-center">
                            {col.label}
                            {sortConfig.key === col.key && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? (
                                  <FaSortUp className="h-3 w-3 text-blue-600" />
                                ) : (
                                  <FaSortDown className="h-3 w-3 text-blue-600" />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      )
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRows.length > 0 ? (
                    currentRows.map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRowClick(row)}
                      >
                        {columns.map((col) => (
                          visibleColumns[col.key] && (
                            <td
                              key={col.key}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                            >
                              {row[col.key]}
                            </td>
                          )
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={visibleColumnsCount} className="px-6 py-4 text-center text-sm text-gray-500">
                        No records found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstRow + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastRow, filteredData.length)}</span> of{" "}
                <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <FaAngleLeft />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <FaAngleDoubleRight />
              </button>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="ml-2 border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Row Details Modal */}
      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Detailed Record View</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {columns.map((col) => (
                  visibleColumns[col.key] && (
                    <div key={col.key} className="mb-2">
                      <dt className="text-sm font-medium text-gray-500">{col.label}</dt>
                      <dd className="mt-1 text-sm text-gray-900 break-words">
                        {selectedRow[col.key] || <span className="text-gray-400">N/A</span>}
                      </dd>
                    </div>
                  )
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;