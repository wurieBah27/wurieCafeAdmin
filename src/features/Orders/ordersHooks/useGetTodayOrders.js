import { useQuery } from "@tanstack/react-query";
import { getTodayActivity } from "../../../APIS/Api/ordersAPI";

const useGetTodayOrders = () => {
  const { data: todayActivity = [], isLoading: isGettingTodayOrders } =
    useQuery({
      queryFn: getTodayActivity,
      queryKey: ["today-orders"],
    });

  const totalTodayOrders = todayActivity.length;
  const totalTodayRevenue = todayActivity.reduce(
    (acc, curr) => acc + curr.total,
    0,
  );
  const deliveredOrders = todayActivity.filter(
    (order) => order.Order_status === "Delivered",
  ).length;
  const pendingOrders = todayActivity.filter(
    (order) => order.Order_status !== "Delivered",
  ).length;
  return {
    deliveredOrders,
    pendingOrders,
    todayActivity,
    isGettingTodayOrders,
    totalTodayRevenue,
    totalTodayOrders,
  };
};

export default useGetTodayOrders;
