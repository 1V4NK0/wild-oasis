import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
//тут був імпорт не з apiBookings a з apiCabins... ЧОМУ ВОНО БЛЯТЬ НЕ ВКАЗАЛО НА ЦЕ ЯК ЦЕ МОГЛО ПРАЦЮВАТИ
//В АПІКАБІНС НАВІТЬ ТАКОГО МЕТОДУ НЕМАЄ ЧОМУ Я НЕ ОТРИМАВ ПОМИЛКИ

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
