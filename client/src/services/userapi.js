import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (err) {
    console.error("Error Fetching users:", error);
    throw err;
  }
};
export default fetchUsers;
