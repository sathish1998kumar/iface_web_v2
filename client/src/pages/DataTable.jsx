import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

  // Handle Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    data.sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* Controls (Search, Column Visibility, Export) */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />

        {/* Buttons (Columns, PDF, Excel, CSV, Copy, Print) */}
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
    {columns.map((col) =>
      visibleColumns[col.key] && (
        <th
          key={col.key}
          className="border border-gray-300 px-4 py-2 cursor-pointer"
          onClick={() => handleSort(col.key)}
        >
          {col.label}
        </th>
      )
    )}
  </tr>
</thead>

          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index} className="text-center bg-white hover:bg-gray-100">
                {columns.map((col) => visibleColumns[col.key] && (
                  <td key={col.key} className="border border-gray-300 px-4 py-2">
                    {col.type === "image" ? (
                      <img src={row[col.key]} alt="Employee" className="w-16 h-16 rounded-full" />
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
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
        <span>Page {currentPage} of {Math.ceil(searchedData.length / rowsPerPage)}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(searchedData.length / rowsPerPage)))} className="bg-gray-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
};

export default DataTable;