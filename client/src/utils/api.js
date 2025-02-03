import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/users"; // Ensure .env is configured properly

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data); // Debugging log

    if (Array.isArray(response.data)) {
      return response.data; // Return data if it's an array
    } else {
      console.warn("Unexpected API response format:", response.data);
      return []; // Return empty array to prevent errors
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return empty array on error
  }
};
