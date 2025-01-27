import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TimeBasedReport = () => {
  const initialData = [
    { sno: 1, shift: "Shift 1", timeSlot: "5am-6am", animator: 0, ft_dbc: 0, incharge: 22, mcc_shg: 0, per_cw: 109, pt_dbc: 33, shg_cw: 114, shg_driver: 25, total: 303 },
    { sno: 2, shift: "", timeSlot: "6am-6:30am", animator: 0, ft_dbc: 0, incharge: 19, mcc_shg: 0, per_cw: 215, pt_dbc: 146, shg_cw: 575, shg_driver: 112, total: 1067 },
    { sno: 3, shift: "", timeSlot: "6:30am-7am", animator: 0, ft_dbc: 0, incharge: 4, mcc_shg: 0, per_cw: 12, pt_dbc: 22, shg_cw: 51, shg_driver: 16, total: 105 },
    { sno: 4, shift: "", timeSlot: "7am-1pm", animator: 2, ft_dbc: 0, incharge: 9, mcc_shg: 24, per_cw: 9, pt_dbc: 34, shg_cw: 98, shg_driver: 7, total: 183 },
    { sno: 5, shift: "Shift 2", timeSlot: "1pm-2pm", animator: 0, ft_dbc: 0, incharge: 1, mcc_shg: 0, per_cw: 0, pt_dbc: 0, shg_cw: 17, shg_driver: 1, total: 19 },
    { sno: 6, shift: "", timeSlot: "2pm-9pm", animator: 0, ft_dbc: 0, incharge: 0, mcc_shg: 0, per_cw: 0, pt_dbc: 0, shg_cw: 0, shg_driver: 0, total: 0 },
    { sno: 7, shift: "Shift 3", timeSlot: "9pm-10pm", animator: 0, ft_dbc: 0, incharge: 0, mcc_shg: 0, per_cw: 0, pt_dbc: 0, shg_cw: 0, shg_driver: 0, total: 0 },
    { sno: 8, shift: "", timeSlot: "10pm-above", animator: 0, ft_dbc: 0, incharge: 0, mcc_shg: 0, per_cw: 0, pt_dbc: 0, shg_cw: 0, shg_driver: 0, total: 0 },
    { sno: "Total:", shift: "", timeSlot: "", animator: 2, ft_dbc: 0, incharge: 55, mcc_shg: 24, per_cw: 345, pt_dbc: 235, shg_cw: 855, shg_driver: 161, total: 1677 },
  ];

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle Filter
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    if (value) {
      setData(initialData.filter((row) => row.shift.toLowerCase().includes(value) || row.timeSlot.toLowerCase().includes(value)));
    } else {
      setData(initialData);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Handle Sorting
  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (typeof valA === "string") return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return order === "asc" ? valA - valB : valB - valA;
    });

    setData(sortedData);
  };

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById("report-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("time_based_report.pdf");
    });
  };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Time Based Report</h1>
      {/* Filter and Export Options */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Filter by Shift or Time Slot"
          className="border px-4 py-2 rounded w-1/3"
          value={filter}
          onChange={handleFilter}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={exportToPDF}
        >
          Download PDF
        </button>
      </div>

      {/* Rows per page */}
      <div className="mb-4">
        <label htmlFor="rowsPerPage" className="mr-2">Rows per page:</label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table id="report-table" className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {["Sno", "Shift", "Time Slot", "Animator", "FT/DBC", "Incharge", "MCC/SHG", "PER/CW", "PT/DBC", "SHG/CW", "SHG/Driver", "Total"].map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase().replace(/\s+/g, "_"))}
                >
                  {header} {sortKey === header.toLowerCase().replace(/\s+/g, "_") && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="border border-gray-300 px-4 py-2">{row.sno}</td>
                <td className="border border-gray-300 px-4 py-2">{row.shift}</td>
                <td className="border border-gray-300 px-4 py-2">{row.timeSlot}</td>
                <td className="border border-gray-300 px-4 py-2">{row.animator}</td>
                <td className="border border-gray-300 px-4 py-2">{row.ft_dbc}</td>
                <td className="border border-gray-300 px-4 py-2">{row.incharge}</td>
                <td className="border border-gray-300 px-4 py-2">{row.mcc_shg}</td>
                <td className="border border-gray-300 px-4 py-2">{row.per_cw}</td>
                <td className="border border-gray-300 px-4 py-2">{row.pt_dbc}</td>
                <td className="border border-gray-300 px-4 py-2">{row.shg_cw}</td>
                <td className="border border-gray-300 px-4 py-2">{row.shg_driver}</td>
                <td className="border border-gray-300 px-4 py-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimeBasedReport;
