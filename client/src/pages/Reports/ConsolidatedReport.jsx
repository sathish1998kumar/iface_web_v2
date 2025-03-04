import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api";  // Import API function
import DataTable from "../DataTable";  // Assuming DataTable exists

const ConsolidatedReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setData(users);  // Set the fetched data
    };

    getUsers();
  }, []);

  // Define table columns
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website" },
    { key: "actions", label: "Actions", type: "actions" },
  ];

  // Map API data
  const tableData = data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address?.city || "N/A", // Handle missing data
    phone: user.phone,
    website: user.website,
    actions: user.id,
  }));

  return (
    <div className="container mt-4 mx-auto">
      <DataTable
        title="Consolidated Report"
        columns={columns}
        data={tableData}
        handleEdit={(id) => console.log("Edit user:", id)}
        handleDelete={(id) => console.log("Delete user:", id)}
      />
    </div>
  );
};

export default ConsolidatedReport;