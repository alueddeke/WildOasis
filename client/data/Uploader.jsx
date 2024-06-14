import { useState } from "react";
import Button from "../src/ui/Button";

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const resetDatabase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/api/reset-database`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert("Failed to reset database");
      }
    } catch (error) {
      console.error("Error resetting database:", error);
      alert("Error resetting database");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3>SAMPLE DATA</h3>
      <Button onClick={resetDatabase} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload ALL"}
      </Button>
    </div>
  );
}

export default Uploader;
