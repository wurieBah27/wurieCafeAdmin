import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../../APIS/Api/ordersAPI";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const {
    mutate: updateOrder,
    isPending: isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["singleOrder"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: [`last-${numDays}-days`] });
      queryClient.invalidateQueries({ queryKey: [`today-orders`] });
    },
    onError: (error) => {
      const data = error.message;
      if (data === "Not an Admin.") {
        toast.error("Permission denied: You are not an Admin,");
      } else {
        toast.error("An error occured, couldn't update order status");
      }
    },
  });
  return { updateOrder, isSuccess, isError };
};

export default useUpdateOrderStatus;
