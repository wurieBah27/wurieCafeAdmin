import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "../../../APIS/Api/ordersAPI";
import { useParams } from "react-router-dom";

const useGetSingleOrder = () => {
  const { ordersID } = useParams();
  const {
    data: singleOrder,
    isLoading: loadingOrder,
    isError,
  } = useQuery({
    queryKey: ["singleOrder"],
    queryFn: () => getSingleOrder({ id: ordersID }),
    enabled: !!ordersID,
  });
  return { singleOrder, loadingOrder, isError };
};

export default useGetSingleOrder;
