import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../../APIS/authentication/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: loggingOut,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("User logged out successfully.");
      queryClient.invalidateQueries({ queryKey: ["currentUserss"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
  });
  return { loggingOut, isLoading, isError };
};

export default useLogout;
