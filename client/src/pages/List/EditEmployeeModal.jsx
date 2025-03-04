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
    <div
      className="fixed inset-0 z-[50] bg-gray-900 bg-opacity-50 flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md sm:w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Edit Employee
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="Name"
            value={formData.Name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="Employee Id"
            value={formData["Employee Id"] || ""}
            onChange={handleChange}
            placeholder="Employee ID"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="Mobile"
            value={formData.Mobile || ""}
            onChange={handleChange}
            placeholder="Mobile"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="Designation"
            value={formData.Designation || ""}
            onChange={handleChange}
            placeholder="Designation"
            className="border p-2 rounded w-full"
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded text-white w-full sm:w-auto"
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
