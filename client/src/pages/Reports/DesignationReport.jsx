import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import designationData from "../data/Designation.json"; // Import JSON data

const DesignationReport = () => {
  const [data, setData] = useState(designationData);
  const [filter, setFilter] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    sno: true,
    designation: true,
    total: true,
    present: true,
    absent: true,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    if (value) {
      setData(
        designationData.filter((row) =>
          row.designation.toLowerCase().includes(value)
        )
      );
    } else {
      setData(designationData);
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById("report-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("DesignationReport.pdf");
    });
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "DesignationReport.xlsx");
  };

  // Toggle Column Visibility
  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // Handle Sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setData((prevData) => {
      return [...prevData].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Designation Report</h1>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Designation..."
          value={filter}
          onChange={handleSearch}
          className="p-2 border rounded w-full sm:w-1/3 mb-2 sm:mb-0"
        />
        <div className="flex gap-2">
          <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Download PDF
          </button>
          <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export Excel
          </button>
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Column Visibility
            </button>
            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white border rounded shadow-lg z-10 w-40">
                {Object.keys(visibleColumns).map((column) => (
                  <label key={column} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns[column]}
                      onChange={() => toggleColumn(column)}
                    />
                    {column}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table id="report-table" className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md">
          <thead>
            <tr className="text-black">
              {visibleColumns.sno && <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('sno')}>#</th>}
              {visibleColumns.designation && <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('designation')}>Designation</th>}
              {visibleColumns.total && <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('total')}>Total</th>}
              {visibleColumns.present && <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('present')}>Present</th>}
              {visibleColumns.absent && <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('absent')}>Absent</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="text-center bg-white hover:bg-gray-100">
                {visibleColumns.sno && <td className="border border-gray-300 px-4 py-2">{index + 1}</td>}
                {visibleColumns.designation && <td className="border border-gray-300 px-4 py-2">{row.designation}</td>}
                {visibleColumns.total && <td className="border border-gray-300 px-4 py-2">{row.total}</td>}
                {visibleColumns.present && <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">{row.present}</td>}
                {visibleColumns.absent && <td className="border border-gray-300 px-4 py-2 text-red-600 font-semibold">{row.absent}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={prevPage} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" disabled={currentPage === 1}>
          Previous
        </button>
        <span className="text-lg">Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}</span>
        <button onClick={nextPage} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" disabled={currentPage === Math.ceil(data.length / rowsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DesignationReport;
