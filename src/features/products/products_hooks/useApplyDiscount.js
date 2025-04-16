import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDiscount } from "../../../APIS/Api/productsAPI";
import toast from "react-hot-toast";

const useApplyDiscount = () => {
  const queryClient = useQueryClient();
  const { mutate: applyDiscount, isPending } = useMutation({
    mutationFn: addDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleProduct"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Discount applied successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to apply discount");
    },
  });
  return { applyDiscount, isPending };
};

export default useApplyDiscount;
