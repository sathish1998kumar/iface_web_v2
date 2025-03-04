import React from "react";
import DataTable from "../DataTable"; // Assuming you have a DataTable component
import employeesData from "../data/ContinuouslyAbsentReport.json"; // Import the JSON data

const ContinuouslyAbsentReport = () => {
  // Define the columns for the table
  const columns = [
    { key: "Sno", label: "S.No" },
    { key: "Name", label: "Name" },
    { key: "Employee Id", label: "Employee Id" },
    { key: "Designation", label: "Designation" },
    { key: "Zone", label: "Zone" },
    { key: "Category", label: "Category" },
    { key: "status", label: "Status" }
  ];

  // Filter employees who are inactive (assuming "inactive" means continuously absent)
  const continuouslyAbsentEmployees = employeesData.filter(
    (employee) => employee.status === "inactive"
  );

  return (
    <DataTable
      data={continuouslyAbsentEmployees} // Pass filtered data to the DataTable
      columns={columns} // Pass columns configuration
      title="Continuously Absent Employees Report" // Set the title of the report
    />
  );
};

export default ContinuouslyAbsentReport;