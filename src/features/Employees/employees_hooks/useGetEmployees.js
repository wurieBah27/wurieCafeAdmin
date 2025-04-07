import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../APIS/employeesAPI/employees";

const useGetEmployees = () => {
  const { data: employeesList = [], isLoading: isGettingEmployees } = useQuery({
    queryKey: ["employees"],
    queryFn: getAllEmployees,
  });

  const totalEmployees = employeesList?.length;

  return { employeesList, isGettingEmployees, totalEmployees };
};

export default useGetEmployees;
