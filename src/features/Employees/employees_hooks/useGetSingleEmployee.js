import { useQuery } from "@tanstack/react-query";
import getSingleEmployee from "../../../APIS/employeesAPI/getSingleEmployee";
import { useParams } from "react-router-dom";

const useGetSingleEmployee = () => {
  const { userID } = useParams();

  const {
    data: singleEmployee,
    isLoading: isGettingEmployee,
    isError,
  } = useQuery({
    queryKey: ["singleEmployee", userID],
    queryFn: () => getSingleEmployee({ id: userID }),
    enabled: !!userID,
  });

  return { singleEmployee, isGettingEmployee, isError };
};

export default useGetSingleEmployee;
