import { useQuery } from "@tanstack/react-query";
import { getOrdersAfterDate } from "../../APIS/Api/ordersAPI";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

const useGetOrdersAfterDate = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: ordersAfterDate, isLoading: isLoadingOrders } = useQuery({
    queryFn: () => getOrdersAfterDate(queryDate),
    queryKey: [`last-${numDays}-days`],
    enabled: !!numDays,
  });

  const totalOrders = ordersAfterDate?.length;
  return { ordersAfterDate, isLoadingOrders, numDays, totalOrders };
};

export default useGetOrdersAfterDate;
