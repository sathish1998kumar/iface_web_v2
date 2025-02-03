import { NavLink } from "react-router-dom";

const List = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">List</h1>
      
      <div className="space-y-4">
        {/* Link to Employee List */}
        <NavLink
          to="/list/employees"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          Employee List
        </NavLink>

        {/* Link to User List */}
        <NavLink
          to="/list/users"
          className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          User List
        </NavLink>
      </div>
    </div>
  );
};

export default List;
