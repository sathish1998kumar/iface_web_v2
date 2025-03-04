import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import emp3 from "../../assets/emp3.png";
import EmployeeListData from "../data/EmployeeList.json";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DataTable from "../DataTable"; 

const Employeelist = () => {
  const [employees, setEmployees] = useState(EmployeeListData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.Sno === updatedEmployee.Sno ? updatedEmployee : emp
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.Sno !== selectedEmployee.Sno)
    );
    setIsDeleteModalOpen(false);
  };

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
    { key: "actions", label: "Actions", type: "actions" },
  ];

  const data = employees.map((emp) => ({
    sno: emp.Sno,
    name: emp.Name,
    employeeId: emp["Employee Id"],
    photo: (
      <img
        src={emp.Photo === "Employee Image" ? emp3 : emp.Photo}
        alt="Employee"
        className="w-10 h-10 rounded-full mx-auto"
      />
    ),
    mobile: emp.Mobile,
    designation: emp.Designation,
    zone: emp.Zone,
    category: emp.Category,
    access: emp.Access,
    actions: (
      <div className="flex justify-center gap-3">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEdit(emp)}
        >
          <FaEdit size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete(emp)}
        >
          <FaTrash size={18} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <DataTable title="Employee List" columns={columns} data={data} />

      {isEditModalOpen && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onUpdate={handleUpdateEmployee} // Pass the update function
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          employee={selectedEmployee}
          onConfirm={confirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Employeelist;
