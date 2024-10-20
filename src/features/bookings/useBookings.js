import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const {
    isLoading,
    data, // Destructure data directly
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Check for errors
  if (error) {
    console.error("Error fetching bookings:", error);
    return { isLoading, error, bookings: [], count: 0 }; // Return empty data if there's an error
  }

  // Safely access bookings and count
  const bookings = data?.data || []; // Fallback to an empty array if data is undefined
  const count = data?.count || 0; // Fallback to 0 if count is undefined

  //prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],  
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, error, bookings, count }; // Return bookings and count
}
