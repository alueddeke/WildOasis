import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Infinity, // Adjust based on how frequently you expect changes
  });

  console.log("Queried settings:", settings);

  return { isLoading, error, settings };
}
