import axios from "axios";

export async function getCabins() {
  try {
    const response = await axios.get("http://DB_HOST:3000/api/cabins");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
}

export async function deleteCabin(id) {
  try {
    const response = await axios.delete(
      `http://DB_HOST:3000/api/cabins/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete cabin");
  }
}

export async function createCabin(newCabin) {
  try {
    const response = await axios.post(
      "http://DB_HOST:3000/api/cabins",
      newCabin
    );
    console.log("Sending data:", newCabin); // Log the data being sent to the server
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create cabin");
  }
}

export async function editCabin(id, cabinData) {
  try {
    const response = await axios.put(
      `http://DB_HOST:3000/api/cabins/${id}`,
      cabinData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update cabin");
  }
}
