import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {

  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    //what you are doing below is if deleting was successful you want to do something:
    onSuccess: () => {
      toast.success("Cabin was deleted");
      //in this case you need to refetch data to refresh list.
      //u do it by invalidating query so it will refetch list u call the method on queryClient
      //
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {isLoading, deleteCabin}
}
