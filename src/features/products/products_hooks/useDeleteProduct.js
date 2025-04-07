import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../APIS/Api/productsAPI";
import toast from "react-hot-toast";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deletingItem,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Item deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deletingItem, isLoading, isError };
};

export default useDeleteProduct;
