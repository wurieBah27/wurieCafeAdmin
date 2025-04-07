import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../APIS/Api/ordersAPI";

const useGetAllOrders = () => {
  const {
    data: ordersData = [],
    isLoading: isGettingsOrders,
    isError,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  const totalOrders = ordersData?.length;
  return { ordersData, isGettingsOrders, isError, totalOrders };
};

export default useGetAllOrders;
