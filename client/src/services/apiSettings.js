import axios from "axios";

export async function getSettings() {
  try {
    const response = await axios.get("http://DB_HOST:3000/api/settings");
    // console.log("settings", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
}

export async function updateSetting(newSetting) {
  try {
    // console.log("Sending update:", newSetting); // Ensure this logs the correct structure
    const response = await axios.put(
      "http://DB_HOST:3000/api/settings",
      newSetting
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
}
