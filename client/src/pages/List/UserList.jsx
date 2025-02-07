import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import emp3 from "../../assets/emp2.png";
import UserListData from "../data/UserList.json";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DataTable from "../DataTable"; 

const UserList = () => {
  const [users, setUsers] = useState(UserListData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((usr) =>
        usr.Sno === updatedUser.Sno ? updatedUser : usr
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers((prevUsers) =>
      prevUsers.filter((usr) => usr.Sno !== selectedUser.Sno)
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

  const data = users.map((usr) => ({
    sno: usr.Sno,
    name: usr.Name,
    employeeId: usr["Employee Id"],
    photo: (
      <img
        src={usr.Photo === "Employee Image" ? emp3 : usr.Photo}
        alt="User"
        className="w-10 h-10 rounded-full mx-auto"
      />
    ),
    mobile: usr.Mobile,
    designation: usr.Designation,
    zone: usr.Zone,
    category: usr.Category,
    access: usr.Access,
    actions: (
      <div className="flex justify-center gap-3">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleEdit(usr)}
        >
          <FaEdit size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDelete(usr)}
        >
          <FaTrash size={18} />
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <DataTable title="User List" columns={columns} data={data} />

      {isEditModalOpen && (
        <EditEmployeeModal
          user={selectedUser}
          onUpdate={handleUpdateUser} 
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          user={selectedUser}
          onConfirm={confirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserList;
