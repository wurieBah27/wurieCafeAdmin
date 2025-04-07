import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployees } from "../../../APIS/Api/employeesAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createEmployee, isLoading: isCreatingEmployee } = useMutation(
    {
      mutationFn: createEmployees,
      onSuccess: () => {
        toast.success("Employee Created successfully");
        queryClient.invalidateQueries("employees");
        navigate("/verifyEmail");
      },
    },
  );

  return { createEmployee, isCreatingEmployee };
};

export default useCreateEmployee;
