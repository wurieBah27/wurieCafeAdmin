import { useQuery } from "@tanstack/react-query";
import { userLogeedIn } from "../../../APIS/authentication/auth";

const currentUserLoggedIn = () => {
  const { data: loggedInUser, isLoading: loadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: userLogeedIn,
  });
  const isVerifiedEmail = loggedInUser?.emailVerified;
  const isAdmin = loggedInUser?.admin || false;
  const userUid = loggedInUser?.uid;
  return { userUid, loggedInUser, isVerifiedEmail, isAdmin, loadingUser };
};

export default currentUserLoggedIn;
