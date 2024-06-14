import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL; // Get the base API URL from the environment variable

export async function getCabins() {
  try {
    const response = await axios.get(`${apiUrl}/api/cabins`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    const response = await axios.delete(`${apiUrl}/api/cabins/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete cabin");
  }
}

export async function createCabin(newCabin) {
  try {
    const response = await axios.post(`${apiUrl}/api/cabins`, newCabin);
    console.log("Sending data:", newCabin);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create cabin");
  }
}

export async function editCabin(id, cabinData) {
  try {
    const response = await axios.put(`${apiUrl}/api/cabins/${id}`, cabinData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update cabin");
  }
}
