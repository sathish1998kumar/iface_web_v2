// src/pages/List/SupervisorList.jsx
import React from "react";
import DataTable from "../../pages/DataTable";
import emp1 from "../../assets/emp1.png";

const supervisorData = [
  {
    id: 1,
    name: "Suresh Menon",
    zone: ["Zone 1", "Zone 3"],
    yard: "Yard A",
    date: "2025-07-01",
    shift: "Morning",
    designation: "Senior Supervisor",
    attendance: "Present",
    workHours: "8h",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    photo: "../../assets/emp1.png",
  },
  {
    id: 2,
    name: "Anita Desai",
    zone: ["Zone 2"],
    yard: "Yard C",
    date: "2025-07-02",
    shift: "Evening",
    designation: "Area Manager",
    attendance: "Present",
    workHours: "7.5h",
    checkIn: "02:00 PM",
    checkOut: "09:30 PM",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Rahul Joshi",
    zone: ["Zone 4"],
    yard: "Yard B",
    date: "2025-07-03",
    shift: "Night",
    designation: "Supervisor",
    attendance: "Absent",
    workHours: "0h",
    checkIn: "-",
    checkOut: "-",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: 4,
    name: "Nandita Rao",
    zone: ["Zone 1", "Zone 5"],
    yard: "Yard D",
    date: "2025-07-04",
    shift: "Morning",
    designation: "Shift Manager",
    attendance: "Present",
    workHours: "8h",
    checkIn: "09:05 AM",
    checkOut: "05:00 PM",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    name: "Rajiv Kapoor",
    zone: ["Zone 3"],
    yard: "Yard A",
    date: "2025-07-05",
    shift: "Evening",
    designation: "Supervisor",
    attendance: "Present",
    workHours: "7h",
    checkIn: "02:15 PM",
    checkOut: "09:00 PM",
    photo: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    id: 6,
    name: "Priya Iyer",
    zone: ["Zone 2", "Zone 4"],
    yard: "Yard C",
    date: "2025-07-06",
    shift: "Night",
    designation: "Operations Lead",
    attendance: "Present",
    workHours: "8h",
    checkIn: "10:00 PM",
    checkOut: "06:00 AM",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    id: 7,
    name: "Vikram Deshpande",
    zone: ["Zone 5"],
    yard: "Yard E",
    date: "2025-07-07",
    shift: "Morning",
    designation: "Supervisor",
    attendance: "Late",
    workHours: "6.5h",
    checkIn: "10:30 AM",
    checkOut: "05:00 PM",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 8,
    name: "Sheetal Kulkarni",
    zone: ["Zone 1", "Zone 2"],
    yard: "Yard B",
    date: "2025-07-08",
    shift: "Evening",
    designation: "Supervisor",
    attendance: "Present",
    workHours: "7.8h",
    checkIn: "02:10 PM",
    checkOut: "09:50 PM",
    photo: "https://randomuser.me/api/portraits/women/39.jpg",
  },
  {
    id: 9,
    name: "Manoj Tiwari",
    zone: ["Zone 3", "Zone 4"],
    yard: "Yard A",
    date: "2025-07-09",
    shift: "Morning",
    designation: "Senior Manager",
    attendance: "Present",
    workHours: "8h",
    checkIn: "08:50 AM",
    checkOut: "05:00 PM",
    photo: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    id: 10,
    name: "Kavitha Ramesh",
    zone: ["Zone 2", "Zone 5"],
    yard: "Yard D",
    date: "2025-07-10",
    shift: "Night",
    designation: "Supervisor",
    attendance: "Absent",
    workHours: "0h",
    checkIn: "-",
    checkOut: "-",
    photo: "https://randomuser.me/api/portraits/women/81.jpg",
  },
];


// 🧠 Add JSX to `photo` & render `zone` as colored tags
const supervisors = supervisorData.map((employee) => ({
  ...employee,
  photo: (
    <img
      src={employee.photo === "../../assets/emp1.png" ? emp1 : employee.photo}
      alt={employee.name}
      className="w-12 h-12 rounded-full mx-auto"
    />
  ),
  zone: (
    <div className="flex flex-wrap gap-1 justify-center">
      {employee.zone.map((z, i) => (
        <span
          key={i}
          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
        >
          {z}
        </span>
      ))}
    </div>
  ),
}));

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "photo", label: "Photo" },
  { key: "designation", label: "Designation" },
  { key: "attendance", label: "Attendance" },
  { key: "workHours", label: "Work Hours" },
  { key: "checkIn", label: "Check-In" },
  { key: "checkOut", label: "Check-Out" },
  { key: "zone", label: "Zone(s)" }, // now shows badges
  { key: "yard", label: "Yard" },
  { key: "date", label: "Date" },
];

const SupervisorList = () => {
  return (
    <div className="p-6">
      <DataTable
        title="Supervisor Zone Report"
        columns={columns}
        data={supervisors}
      />
    </div>
  );
};

export default SupervisorList;
