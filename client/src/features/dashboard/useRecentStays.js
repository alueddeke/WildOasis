import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // console.log("Fetched stays data before filtering:", stays); // Log stays data before filtering

  if (error) {
    console.error("Error fetching stays:", error);
    return { isLoading, stays: [], confirmedStays: [] };
  }

  const confirmedStays = Array.isArray(stays?.bookings) // Ensure bookings is present in stays
    ? stays.bookings.filter(
        (stay) => stay.status === "checked-in" || stay.status === "checked-out"
      )
    : [];

  return { isLoading, stays, confirmedStays, numDays };
}
