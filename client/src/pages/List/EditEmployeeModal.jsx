import React, { useState } from "react";

const EditEmployeeModal = ({ employee, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="Name"
            value={formData.Name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="Employee Id"
            value={formData["Employee Id"] || ""}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="Mobile"
            value={formData.Mobile || ""}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="Designation"
            value={formData.Designation || ""}
            onChange={handleChange}
            placeholder="Designation"
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
