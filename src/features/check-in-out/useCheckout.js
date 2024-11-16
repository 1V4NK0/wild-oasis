import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: ({ id }) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out`);
      queryClient.invalidateQueries({ active: true });

    },
    onError: () => toast.error("There was an error while checking out :("),
  });
  return { checkout, isCheckingout };
}
