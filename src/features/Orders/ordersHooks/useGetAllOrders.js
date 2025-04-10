import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOrders } from "../../../APIS/Api/ordersAPI";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../helpers/constants";

const useGetAllOrders = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const numOrders = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const status = !searchParams.get("orderStatus")
    ? "All"
    : searchParams.get("orderStatus");

  const {
    data: ordersData = [],
    isLoading: isGettingsOrders,
    isError,
  } = useQuery({
    queryKey: ["allOrders", numOrders, status],
    queryFn: () => getAllOrders({ numOrders, status }),
    enabled: !!numOrders,
  });

  const totalOrders = ordersData?.length;
  const pageCount = Math.ceil(totalOrders / PAGE_SIZE);

  if (numOrders < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["allOrders", numOrders + 1, status],
      queryFn: () => getAllOrders({ numOrders: numOrders + 1, status }),
    });
  }
  return { ordersData, isGettingsOrders, isError, totalOrders };
};

export default useGetAllOrders;
