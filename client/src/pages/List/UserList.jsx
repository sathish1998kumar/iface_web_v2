import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import emp2 from '../../assets/emp2.png';
import UserList from '../data/UserList.json';

const UserListPage = () => {
  const [users, setUsers] = useState(
    UserList.map((user) => ({
      sno: user.Sno,
      name: user.Name,
      employeeId: user["Employee Id"],
      photo: user.Photo === "Employee Image" ? emp2 : user.Photo,
      mobile: user.Mobile,
      designation: user.Designation,
      status: user.Status,
    }))
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const designations = ["PCER/CW", "Worker", "Driver", "LD Supervisor"];
  const statuses = ["Active", "Inactive"];

  const handleEdit = (userIndex) => {
    setSelectedUser(users[userIndex]);
    setIsEditModalOpen(true);
  };

  const saveEditedUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.sno === selectedUser.sno ? selectedUser : user))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md">
          <thead>
            <tr className="text-gray-800 bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Employee ID</th>
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center bg-white hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.sno}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.employeeId}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={user.photo} alt="Employee" className="w-12 h-12 rounded-full mx-auto" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
                <td className="border border-gray-300 px-4 py-2">{user.designation}</td>
                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl mb-4">Edit User</h2>
            <label className="block text-gray-700">Name</label>
            <input type="text" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded mb-2" />
            <label className="block text-gray-700">Employee ID</label>
            <input type="text" value={selectedUser.employeeId} onChange={(e) => setSelectedUser({ ...selectedUser, employeeId: e.target.value })} className="w-full p-2 border border-gray-300 rounded mb-2" />
            <label className="block text-gray-700">Mobile</label>
            <input type="text" value={selectedUser.mobile} onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })} className="w-full p-2 border border-gray-300 rounded mb-2" />
            <label className="block text-gray-700">Designation</label>
            <select value={selectedUser.designation} onChange={(e) => setSelectedUser({ ...selectedUser, designation: e.target.value })} className="w-full p-2 border border-gray-300 rounded mb-2">
              {designations.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
            <label className="block text-gray-700">Status</label>
            <select value={selectedUser.status} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })} className="w-full p-2 border border-gray-300 rounded mb-4">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <button onClick={saveEditedUser} className="bg-blue-600 text-white p-2 rounded">Save</button>
            <button onClick={() => setIsEditModalOpen(false)} className="text-red-600 ml-4">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
