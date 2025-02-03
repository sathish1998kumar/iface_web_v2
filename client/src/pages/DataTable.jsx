import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import React Icons (Font Awesome icons)

const DataTable = ({ data, columns, title }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Handle Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    return sortedData;
  };

  // Filter Data
  const filteredData = data.filter((row) => {
    return columns.every((col) => {
      const value = row[col.key]?.toString().toLowerCase();
      const filterValue = filters[col.key]?.toLowerCase();
      return !filterValue || value.includes(filterValue);
    });
  });

  // Search Data
  const searchedData = filteredData.filter((row) =>
    columns.some((col) =>
      row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchedData.slice(indexOfFirstRow, indexOfLastRow);

  // Export Functions
  const exportToPDF = () => {
    const input = document.getElementById("report-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`${title}.pdf`);
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const exportToCSV = () => {
    const csvContent = [
      columns.map((col) => col.label).join(","),
      ...data.map((row) => columns.map((col) => row[col.key]).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    const text = data.map((row) =>
      columns.map((col) => row[col.key]).join("\t")
    ).join("\n");

    navigator.clipboard.writeText(text);
    alert("Copied to Clipboard!");
  };

  const printTable = () => {
    const printContent = document.getElementById("report-table").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write("<html><head><title>Print Report</title></head><body>");
    newWindow.document.write(printContent);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  const handleDelete = () => {
    if (currentItem) {
      // Handle the delete action, e.g., remove the item from the data array
      const updatedData = data.filter((item) => item.sno !== currentItem.sno);
      // Update the state with the new data
      console.log("Item Deleted:", currentItem);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* Controls (Search, Column Visibility, Export) */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />

        <div className="flex flex-wrap gap-2">
          {/* Column Visibility */}
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="bg-blue-500 text-white px-4 py-2 rounded">
              Columns
            </button>
            {showDropdown && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow-lg z-10 w-40 p-2">
                {columns.map((col) => (
                  <label key={col.key} className="flex items-center gap-2 px-3 py-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.key]}
                      onChange={() => setVisibleColumns((prev) => ({ ...prev, [col.key]: !prev[col.key] }))} 
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Export Buttons */}
          <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded">PDF</button>
          <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">Excel</button>
          <button onClick={exportToCSV} className="bg-yellow-500 text-white px-4 py-2 rounded">CSV</button>
          <CopyToClipboard text={JSON.stringify(data)} onCopy={copyToClipboard}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Copy</button>
          </CopyToClipboard>
          <button onClick={printTable} className="bg-gray-500 text-white px-4 py-2 rounded">Print</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table id="report-table" className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md">
          <thead>
            <tr className="text-gray-800 bg-gray-100">
              {columns.map((col) => (
                visibleColumns[col.key] && (
                  <th
                    key={col.key}
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                  >
                    {col.label}
                  </th>
                )
              ))}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="text-center bg-white hover:bg-gray-100">
                {columns.map((col) => visibleColumns[col.key] && (
                  <td key={col.key} className="border border-gray-300 px-4 py-2">
                    {col.type === "image" ? (
                      <img src={row[col.key]} alt="Employee" className="w-12 h-12 rounded-full mx-auto" />
                    ) : col.type === "actions" ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(row)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => { setCurrentItem(row); setShowDeleteModal(true); }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {searchedData.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(searchedData.length / rowsPerPage)))}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Edit User</h2>
            {/* Form Fields for Editing */}
            <form>
              {/* Form for editing user, like username, email, etc. */}
            </form>
            <button
              onClick={() => setShowEditModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
