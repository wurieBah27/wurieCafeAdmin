import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../APIS/Api/productsAPI";

const useProducts = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { products };
};

export default useProducts;
