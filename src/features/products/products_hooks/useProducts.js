import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../APIS/Api/productsAPI";

const useProducts = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const totalProducts = products.data?.length || 0;
  return { products, totalProducts };
};

export default useProducts;
