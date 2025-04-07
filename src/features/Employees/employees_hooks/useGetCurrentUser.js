import { useQuery } from "@tanstack/react-query";
import getSingleEmployee from "../../../APIS/employeesAPI/getSingleEmployee";
import currentUserLoggedIn from "./user";

const getCurrentUser = () => {
  const { userUid } = currentUserLoggedIn();

  const {
    data: singleEmployee,
    isLoading: isGettingEmployee,
    isError,
  } = useQuery({
    queryFn: () => getSingleEmployee({ id: userUid }),
    queryKey: ["currentUserss", userUid],
    enabled: !!userUid,
  });
  return { singleEmployee, isGettingEmployee, isError, userUid };
};

export default getCurrentUser;
