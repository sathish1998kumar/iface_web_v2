import React from 'react';
import DataTable from "../DataTable";
import emp2 from "../../assets/emp1.png";  // Default image for the employee (if needed)

import UserList from '../data/UserList.json';  // Import the JSON data

const UserListPage = () => {
  const columns = [
    { key: "sno", label: "#" },
    { key: "name", label: "Name" },
    { key: "employeeId", label: "Employee Id" },
    { key: "photo", label: "Photo", type: "image" },
    { key: "mobile", label: "Mobile" },
    { key: "designation", label: "Designation" },
    { key: "zone", label: "Zone" },
    { key: "category", label: "Category" },
    { key: "access", label: "Access" },
    { key: "status", label: "Status" },
  ];

  // Map JSON data to match column keys
  const data = UserList.map((user) => ({
    sno: user.Sno,
    name: user.Name,
    employeeId: user["Employee Id"],
    photo: user.Photo === "Employee Image" ? emp2 : user.Photo,  // Assuming a default image if "Employee Image" is the placeholder
    mobile: user.Mobile,
    designation: user.Designation,
    zone: user.Zone,
    category: user.Category,
    access: user.Access,
    status: user.Status,
  }));

  return <DataTable title="User List" columns={columns} data={data} />;
};

export default UserListPage;
