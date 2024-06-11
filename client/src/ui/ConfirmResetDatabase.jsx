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

  const resetDatabase = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/reset-database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/"); // Navigate to the root page
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
