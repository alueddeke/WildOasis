import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Loader2 } from "lucide-react";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoaderCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 48rem;
  width: 100%;
  margin: 0 1.6rem;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const StyledLoader = styled(Loader2)`
  width: 4.8rem;
  height: 4.8rem;
  color: var(--color-brand-600);
  animation: ${rotate} 1s linear infinite;
`;

const StatusRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusLabel = styled.span`
  color: var(--color-grey-600);
`;

const StatusValue = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => {
    if (props.$status === "connected" || props.$status === "ready")
      return "var(--color-green-700)";
    if (props.$status === "resetting") return "var(--color-blue-700)";
    if (props.$status === "connecting") return "var(--color-yellow-700)";
    return "var(--color-grey-500)";
  }};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: var(--color-grey-200);
  border-radius: 10rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 10rem;
  background-color: ${(props) => {
    if (props.$status === "connected" || props.$status === "ready")
      return "var(--color-green-700)";
    if (props.$status === "resetting") return "var(--color-blue-700)";
    if (props.$status === "connecting") return "var(--color-yellow-700)";
    return "var(--color-grey-400)";
  }};
  width: ${(props) => {
    if (props.$status === "connected" || props.$status === "ready")
      return "100%";
    if (props.$status === "resetting" || props.$status === "connecting")
      return "60%";
    return "0%";
  }};
  transition: width 0.5s ease-in-out;
`;

const ErrorMessage = styled.div`
  width: 100%;
  padding: 1.6rem;
  background-color: var(--color-red-100);
  color: var(--color-red-700);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;

const InitializationLoader = ({ onInitialized }) => {
  const [serverStatus, setServerStatus] = useState("connecting");
  const [dbStatus, setDbStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerAndInitDb = async () => {
      try {
        // Check if server is responsive
        let serverReady = false;
        for (let i = 0; i < 60; i++) {
          try {
            const response = await fetch("/api/test-db");
            if (response.ok) {
              serverReady = true;
              setServerStatus("connected");
              break;
            }
          } catch (e) {
            // Server not ready yet, continue polling
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        if (!serverReady) {
          throw new Error("Server failed to respond within 60 seconds");
        }

        // Reset database
        setDbStatus("resetting");
        const resetResponse = await fetch("/api/reset-database", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!resetResponse.ok) {
          throw new Error("Failed to reset database");
        }

        setDbStatus("ready");
        onInitialized();
      } catch (err) {
        setError(err.message);
        console.error("Initialization error:", err);
      }
    };

    checkServerAndInitDb();
  }, [onInitialized]);

  return (
    <LoaderContainer>
      <LoaderCard>
        <LoaderContent>
          <StyledLoader />

          <StatusRow>
            <StatusHeader>
              <StatusLabel>Server Status</StatusLabel>
              <StatusValue $status={serverStatus}>
                {serverStatus === "connected" ? "Connected" : "Connecting..."}
              </StatusValue>
            </StatusHeader>

            <ProgressBar>
              <Progress $status={serverStatus} />
            </ProgressBar>
          </StatusRow>

          <StatusRow>
            <StatusHeader>
              <StatusLabel>Database Status</StatusLabel>
              <StatusValue $status={dbStatus}>
                {dbStatus === "ready"
                  ? "Ready"
                  : dbStatus === "resetting"
                  ? "Initializing..."
                  : "Waiting..."}
              </StatusValue>
            </StatusHeader>

            <ProgressBar>
              <Progress $status={dbStatus} />
            </ProgressBar>
          </StatusRow>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoaderContent>
      </LoaderCard>
    </LoaderContainer>
  );
};

export default InitializationLoader;
