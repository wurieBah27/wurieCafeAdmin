import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../../../APIS/Api/ordersAPI";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const useDeleteOrder = (id) => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const { mutate: deleteOrderById, isPending } = useMutation({
    mutationFn: () => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleOrder"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: [`last-${numDays}-days`] });
      queryClient.invalidateQueries({ queryKey: [`today-orders`] });
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error("Error deleting order: ", error);
    },
  });
  return { deleteOrderById, isPending };
};

export default useDeleteOrder;
