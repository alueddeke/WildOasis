import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    onSuccess: (data) => {
      console.log("Booking data:", data);
    },
  });

  return { isLoading, error, bookings };
}
