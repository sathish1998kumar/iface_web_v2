import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Modal Component with Delete and Edit Options
const StyledModal = ({ isOpen, onClose, rowData, onDelete, onEdit, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg transform transition-transform scale-100 max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User Details</h2>
        <div className="space-y-3 text-gray-600">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={rowData?.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={rowData?.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={rowData?.address?.city || ""}
              onChange={(e) => onChange("address.city", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={rowData?.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="text"
              value={rowData?.website || ""}
              onChange={(e) => onChange("website", e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onEdit(rowData)} // Save the edited row data
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Save Changes
          </button>
          <button
            onClick={() => onDelete(rowData.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Table Component
const ConsolidatedReport = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Table columns definition
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "City", accessor: "address.city" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Website", accessor: "website" },
    ],
    []
  );

  // Set up table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 5, // Set initial page size
      },
    },
    useGlobalFilter, // Global filtering
    useSortBy, // Sorting
    usePagination // Pagination
  );

  // Export to CSV
  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "DataTable.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "Name", "Email", "City", "Phone", "Website"]],
      body: data.map((item) => [
        item.id,
        item.name,
        item.email,
        item.address.city,
        item.phone,
        item.website,
      ]),
    });
    doc.save("DataTable.pdf");
  };

  // Delete row by ID
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setModalIsOpen(false); // Close modal after deletion
  };

  // Edit row (update state with edited row)
  const handleEdit = (updatedRow) => {
    const updatedData = data.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setData(updatedData);
    setModalIsOpen(false); // Close modal after edit
  };

  // Handle changes in modal inputs
  const handleInputChange = (field, value) => {
    setEditedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  return (
    <div className="container mt-4 mx-auto">
      {/* Actions */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="form-control mb-3 p-2 border rounded-md w-64"
        />
        <div className="flex space-x-2">
          <button onClick={exportToCSV} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Export CSV
          </button>
          <button onClick={exportToPDF} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-2 text-left border-b border-gray-300">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
                <th className="p-2 text-left border-b border-gray-300">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 border-b border-gray-200">
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td className="p-2 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedRow(row.original);
                        setEditedRow(row.original); // Set initial data for editing
                        setModalIsOpen(true);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.original.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Previous
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            Next
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          >
            {">>"}
          </button>
        </div>
        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Modal for editing */}
      <StyledModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        rowData={editedRow}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ConsolidatedReport;
