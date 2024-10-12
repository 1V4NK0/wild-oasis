

import { useQuery } from "@tanstack/react-query";
import getBookings from "../../services/apiCabins";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  //this returns a huge obj with all info about query such as the cabins data itself and the states of fetching

  return { isLoading, error, bookings };
}
