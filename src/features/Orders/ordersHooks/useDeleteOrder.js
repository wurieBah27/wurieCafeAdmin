import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../../../APIS/Api/ordersAPI";
import toast from "react-hot-toast";

const useDeleteOrder = (id) => {
  const queryClient = useQueryClient();

  const { mutate: deleteOrderById, isPending } = useMutation({
    mutationFn: () => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      toast.success("Order deleted successfully");
    },
    onError: (error) => {
      toast.error("Error deleting order: ", error);
    },
  });
  return { deleteOrderById, isPending };
};

export default useDeleteOrder;
