import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ModalButton = styled(Button)`
  margin: 0 1rem;
`;

function ConfirmResetDatabase({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL; // Get the base API URL from the environment variable

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
        navigate("/");
      } else {
        alert("Failed to reset database");
      }
    } catch (error) {
      console.error("Error resetting database:", error);
      alert("Error resetting database");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <h3>Are you sure you want to reset the database?</h3>
      <ModalButton onClick={resetDatabase} disabled={isLoading}>
        {isLoading ? "Resetting..." : "Confirm"}
      </ModalButton>
      <ModalButton onClick={onClose} variation="danger">
        Cancel
      </ModalButton>
    </div>
  );
}

export default ConfirmResetDatabase;
