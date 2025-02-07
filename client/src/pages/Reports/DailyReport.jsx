import React from "react";
import DailyReports from "../data/DailyReports.json";
import DataTable from "../DataTable";
import emp1 from "../../assets/emp1.png";

const DailyReport = () => {
  // Process data
  const employees = DailyReports.map((employee) => ({
    ...employee,
    photo: (
      <img
        src={employee.photo === "../../assets/emp1.png" ? emp1 : employee.photo}
        alt={employee.name}
        className="w-10 h-10 rounded-full mx-auto"
      />
    ),
  }));

  const columns = [
    { key: "photo", label: "Photo", type: "image" },
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "attendance", label: "Attendance" },
    { key: "workHours", label: "Work Hours" },
    { key: "checkIn", label: "Check-In" },
    { key: "checkOut", label: "Check-Out" },
    { key: "zone", label: "Zone" },
    { key: "yard", label: "Yard" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="p-6">      
      {/* Employee DataTable */}
      <DataTable title="Daily Employee Report" columns={columns} data={employees} />
    </div>
  );
};

export default DailyReport;
