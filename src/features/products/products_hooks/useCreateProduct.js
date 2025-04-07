import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProduct } from "../../../APIS/Api/productsAPI";
import toast from "react-hot-toast";

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      toast.success(`Product created successfully 👍!`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err) =>
      toast.error(`Error occured while creating product ${err.message}`),
  });

  return { isLoading, createProduct };
};

export default useCreateProduct;
