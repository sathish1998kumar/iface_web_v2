import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../DataTable"; // Assuming DataTable component exists

const ConsolidatedReport = () => {
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")  // API URL to fetch user data
      .then((response) => {
        setData(response.data);  // Set fetched data to state
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Define the columns for the DataTable
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "city", label: "City" },
    { key: "phone", label: "Phone" },
    { key: "website", label: "Website" },
    { key: "actions", label: "Actions", type: "actions" },
  ];

  // Map the API data to match the column keys
  const tableData = data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address?.city, // Nested field (address.city)
    phone: user.phone,
    website: user.website,
    actions: user.id,  // Just pass the ID or user data here, do not include React elements
  }));

  // Handle edit action
  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Deleted user with ID:", id);
    }
  };

  return (
    <div className="container mt-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consolidated Report</h1>

      <DataTable
  title="ConsolidatedReport"
  columns={columns}
  data={tableData}
  handleEdit={handleEdit}  // Pass edit handler to DataTable
  handleDelete={handleDelete}  // Pass delete handler to DataTable
/>

    </div>
  );
};

export default ConsolidatedReport;
