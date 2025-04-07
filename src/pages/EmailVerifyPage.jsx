import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import currentUserLoggedIn from "../features/Employees/employees_hooks/user";
import Spinner from "../ui/Spinner";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";
import { Replay } from "@mui/icons-material";

const EmailVerifyPage = () => {
  const { isVerifiedEmail, loggedInUser, loadingUser } = currentUserLoggedIn();
  const { singleEmployee = {} } = getCurrentUser();

  const { fullname } = singleEmployee;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser && !loadingUser) {
      navigate("/login");
    }
  }, [loadingUser, loggedInUser, navigate]);

  console.log(loadingUser, loggedInUser, isVerifiedEmail);

  if (loadingUser) return <Spinner />;
  if (!loggedInUser)
    return (
      <Button gradientDuoTone="purpleToBlue" onClick={() => navigate("/login")}>
        Login
      </Button>
    );
  if (isVerifiedEmail)
    return (
      <div className="mt-20 flex h-screen flex-col items-center justify-center px-6 text-center text-2xl font-bold text-gray-700">
        <span className="text-blue-800">{fullname}</span> Thank you for
        verifying your email address.
        <div className="mt-4">
          <Button
            gradientDuoTone="purpleToBlue"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );

  if (!isVerifiedEmail && loggedInUser)
    return (
      <div className="mt-20 flex h-screen flex-col items-center justify-center gap-6 px-6 text-center text-2xl font-bold text-gray-700">
        Please verify your email address to continue using our services. Check
        your Email inbox to verify.
        <div>
          <Button gradientDuoTone="purpleToBlue" onClick={() => navigate(0)}>
            <span className="mr-2">Refresh</span> <Replay />
          </Button>
        </div>
      </div>
    );

  return null; // Ensure a return value if conditions are not met
};

export default EmailVerifyPage;
