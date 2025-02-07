import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUsers = async () => {
  try {
    if (!API_BASE_URL) {
      throw new Error("API Base URL is not defined");
    }

    const apiUrl = `${API_BASE_URL}/users`;
    // console.log("Fetching data from:", apiUrl);

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // console.log("API Response:", response.data);
    
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return [];
  }
};
