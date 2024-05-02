import axios from "axios";

export async function getCabins() {
  try {
    const response = await axios.get("http://localhost:3000/api/cabins");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/cabins/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete cabin");
  }
}
