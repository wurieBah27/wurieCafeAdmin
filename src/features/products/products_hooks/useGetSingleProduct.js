import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../APIS/Api/productsAPI";

const useGetSingleProduct = () => {
  const { productID } = useParams();

  const {
    data: singleProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: () => getSingleProduct({ id: productID }),
    enabled: !!productID,
  });
  return { singleProduct, isLoading, isError, productID };
};

export default useGetSingleProduct;
