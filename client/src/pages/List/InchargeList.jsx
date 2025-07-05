import React from "react";
import DataTable from "../../pages/DataTable";

const inchargeData = [
  {
    id: 1,
    name: "Ravi Kumar",
    zone: "Zone 1",
    yard: "Yard A",
    date: "2025-07-01",
    shift: "Morning",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Meena Sharma",
    zone: "Zone 2",
    yard: "Yard B",
    date: "2025-07-02",
    shift: "Evening",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Ajay Verma",
    zone: "Zone 3",
    yard: "Yard C",
    date: "2025-07-03",
    shift: "Night",
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    id: 4,
    name: "Kavitha Reddy",
    zone: "Zone 1",
    yard: "Yard D",
    date: "2025-07-04",
    shift: "Morning",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: 5,
    name: "Prakash Iyer",
    zone: "Zone 2",
    yard: "Yard A",
    date: "2025-07-05",
    shift: "Evening",
    photo: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: 6,
    name: "Divya Nair",
    zone: "Zone 4",
    yard: "Yard E",
    date: "2025-07-06",
    shift: "Night",
    photo: "https://randomuser.me/api/portraits/women/49.jpg",
  },
  {
    id: 7,
    name: "Manoj Patel",
    zone: "Zone 3",
    yard: "Yard C",
    date: "2025-07-07",
    shift: "Morning",
    photo: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    id: 8,
    name: "Neha Shah",
    zone: "Zone 2",
    yard: "Yard B",
    date: "2025-07-08",
    shift: "Evening",
    photo: "https://randomuser.me/api/portraits/women/38.jpg",
  },
  {
    id: 9,
    name: "Sanjay Gupta",
    zone: "Zone 5",
    yard: "Yard F",
    date: "2025-07-09",
    shift: "Night",
    photo: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 10,
    name: "Pooja Mehta",
    zone: "Zone 1",
    yard: "Yard A",
    date: "2025-07-10",
    shift: "Morning",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const employees = inchargeData.map((employee) => ({
  ...employee,
  photo: (
    <img
      src={employee.photo === "../../assets/emp1.png" ? emp1 : employee.photo}
      alt={employee.name}
      className="w-12 h-12 rounded-full mx-auto"
    />
  ),
}));

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "photo", label: "Photo" },
  { key: "zone", label: "Zone" },
  { key: "yard", label: "Yard" },
  { key: "date", label: "Date" },
  { key: "shift", label: "Shift" },
];

const InchargeList = () => {
  return (
    <div className="p-6">
      <DataTable title="In-Charge List" columns={columns} data={employees} />
    </div>
  );
};

export default InchargeList;
