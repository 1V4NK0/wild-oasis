import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  //this returns a huge obj with all info about query such as the cabins data itself and the states of fetching

  return { isLoading, error, cabins };
}
