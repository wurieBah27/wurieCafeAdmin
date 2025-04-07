import { useQuery } from "@tanstack/react-query";
import getAllCustomers from "../../../APIS/customers/getAllCustomers";

const useGetAllCustomers = () => {
  const {
    data: customersData = [],
    isLoading: isFetchingCustomers,
    isError: errorFetchingCustomers,
  } = useQuery({
    queryFn: getAllCustomers,
    queryKey: ["customersData"],
  });
  const totalCustomers = customersData.length;
  return {
    customersData,
    isFetchingCustomers,
    errorFetchingCustomers,
    totalCustomers,
  };
};

export default useGetAllCustomers;
