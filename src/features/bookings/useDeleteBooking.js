import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    //what you are doing below is if deleting was successful you want to do something:
    onSuccess: () => {
      toast.success("Booking was deleted");
      //in this case you need to refetch data to refresh list.
      //u do it by invalidating query so it will refetch list u call the method on queryClient
      //
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleDelete = (id) => {
    var confirm = window.confirm("Are you sure you want to delete booking?");
    if (confirm) {
      deleteBooking(id);
    }
  };

  return { isDeletingBooking, handleDelete };
}
