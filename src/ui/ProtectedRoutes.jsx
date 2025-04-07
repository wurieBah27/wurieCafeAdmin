import { useEffect } from "react";
import currentUserLoggedIn from "../features/Employees/employees_hooks/user";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoutes = ({ children }) => {
  const { isVerifiedEmail, loadingUser } = currentUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVerifiedEmail && !loadingUser) {
      navigate("/verifyEmail");
    }
  }, [isVerifiedEmail, loadingUser, navigate]);

  if (loadingUser) return <Spinner />;

  if (isVerifiedEmail) return <>{children}</>;

  return null; // Ensure a return value if conditions are not met
};

export default ProtectedRoutes;
