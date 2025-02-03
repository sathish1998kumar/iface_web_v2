import React from 'react';
import DataTable from "../DataTable";
import emp3 from "../../assets/emp3.png";  // Default image for the employee (if needed)

import EmployeeList from '../data/EmployeeList.json';  // Import the JSON data

const Employeelist = () => {
  const columns = [
    { key: "sno", label: "ID" },
    { key: "name", label: "Name" },
    { key: "employeeId", label: "Employee Id" },
    { key: "photo", label: "Photo", type: "image" },
    { key: "mobile", label: "Mobile" },
    { key: "designation", label: "Designation" },
    { key: "zone", label: "Zone" },
    { key: "category", label: "Category" },
    { key: "access", label: "Access" },
  ];

  // Map JSON data to match column keys
  const data = EmployeeList.map((emp) => ({
    sno: emp.Sno,
    name: emp.Name,
    employeeId: emp["Employee Id"],
    photo: emp.Photo === "Employee Image" ? emp3 : emp.Photo,  // Assuming a default image if "Employee Image" is the placeholder
    mobile: emp.Mobile,
    designation: emp.Designation,
    zone: emp.Zone,
    category: emp.Category,
    access: emp.Access,
  }));

  return <DataTable title="Employee List" columns={columns} data={data} />;
};

export default Employeelist;
