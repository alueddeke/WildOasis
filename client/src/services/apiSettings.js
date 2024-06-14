import axios from "axios";

export async function getSettings() {
  try {
    const response = await axios.get("http://localhost:3000/api/settings");

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
}

export async function updateSetting(newSetting) {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/settings",
      newSetting
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
}
