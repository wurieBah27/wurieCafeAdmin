import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../../APIS/Api/productsAPI";
import toast from "react-hot-toast";

const useEditProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: editSingleProduct } = useMutation({
    mutationFn: editProduct,

    onSuccess: () => {
      toast.success("Product edited successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["singleProduct"] });
    },
  });
  return { editSingleProduct };
};

export default useEditProduct;
