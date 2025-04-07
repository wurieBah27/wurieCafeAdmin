import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logInWithEmailAndPassword } from "../../../APIS/authentication/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogInUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loginUser,
    isLoading: isLoggingIn,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) =>
      logInWithEmailAndPassword(email, password),
    onSuccess: () => {
      toast.success("User logged in Successfully.");
      navigate("/dashboard");
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserss"] });
    },
    onError: (error) => {
      toast.error(`User cannot be logged in, ${error.message}`);
    },
  });
  return { loginUser, isLoggingIn, isError };
};

export default useLogInUser;
