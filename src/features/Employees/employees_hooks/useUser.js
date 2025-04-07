import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../APIS/authentication/auth";
import toast from "react-hot-toast";

const useUser = () => {
  const queryClient = useQueryClient();

  const {
    mutate: signUpUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User Created successfully, Please Login");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserss"] });
    },
    onError: () => {
      toast.error("Error Creating User");
    },
  });

  return { signUpUser, isLoading, isError };
};

export default useUser;
