import React, { useState } from "react";
import PropTypes from "prop-types";

const Table = ({ data }) => {
  const [search, setSearch] = useState(""); // State to track the search input
  const [filterColumn, setFilterColumn] = useState(""); // State to track the selected column for filtering

  // Function to filter data based on the selected column and search value
  const filteredData = data.filter((row) => {
    if (!filterColumn || !search) return true; // If no column or search input, return all data

    const value = row[filterColumn];
    console.log(value);
    return value
      ? value.toString().toLowerCase().includes(search.toLowerCase())
      : false;
  });
// console.log(filteredData);
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {/* Filter and Search Options */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 sm:flex-grow-0">
          <input
            type="text"
            placeholder={`Search ${
              filterColumn ? `in ${filterColumn.replace(/([A-Z])/g, " $1")}` : ""
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!filterColumn} // Disable search if no column is selected
          />
        </div>

        {/* Filter Column Dropdown */}
        <div className="sm:flex-grow-0">
          <select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
          >
            <option value="">Filter by Column</option>
            <option value="yardName">Yard Name</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="zone">Zone</option>
            <option value="inchargeName">Incharge Name</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-xs sm:text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Yard Name</th>
            <th className="py-3 px-6 text-left">Present</th>
            <th className="py-3 px-6 text-left">Absent</th>
            <th className="py-3 px-6 text-left">Zone</th>
            <th className="py-3 px-6 text-left">Incharge Name</th>
            <th className="py-3 px-6 text-left">Incharge Photo</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={index}
              className={`text-gray-700 text-sm border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{row.yardName}</td>
              <td className="py-3 px-6">{row.present}</td>
              <td className="py-3 px-6">{row.absent}</td>
              <td className="py-3 px-6">{row.zone}</td>
              <td className="py-3 px-6">{row.inchargeName}</td>
              <td className="py-3 px-6">
                <div className="flex items-center justify-center">
                  <img
                    src={row.inchargePhoto}
                    alt={row.inchargeName}
                    className="w-20 h-20 rounded-full border-2 border-gray-300" // Larger size and styled with border
                  />
                </div>
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-gray-500 text-sm"
              >
                No matching data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Prop validation for `data` prop
Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      yardName: PropTypes.string.isRequired,
      present: PropTypes.number.isRequired,
      absent: PropTypes.number.isRequired,
      zone: PropTypes.string.isRequired,
      inchargeName: PropTypes.string.isRequired,
      inchargePhoto: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;
