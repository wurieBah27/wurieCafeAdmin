import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../APIS/firebase/firebase";
import toast from "react-hot-toast";
import currentUserLoggedIn from "../features/Employees/employees_hooks/user";
import useGetSingleEmployee from "../features/Employees/employees_hooks/useGetSingleEmployee";

const SingleUserProfile = () => {
  const { userID } = useParams();

  const { singleEmployee = {} } = useGetSingleEmployee(userID);
  const { isAdmin } = currentUserLoggedIn();

  const {
    fullname: name,
    userEmail: email,
    userName,
    userPhoneNumber: phoneNumber,
    nationality,
    userAddress: address,
    gender,
    userBirthday: birthday,
    img,
  } = singleEmployee;

  const handleAddAdmin = async () => {
    // const callable = functions.httpsCallable("makeUserAdmin");

    const makeUserAdmin = httpsCallable(functions, "addCustomClaim");
    makeUserAdmin({ email: email })
      .then((result) => {
        if (result?.data.message === "Already an admin! true")
          toast.error(`${name} is already an admin!"`);
        else toast.success("User made admin successfully!");
        console.log("User made admin successfully:", result);
      })
      .catch((error) => {
        console.error("Error making user admin:", error);
      });
  };
  return (
    <div className="relative flex flex-1 flex-col justify-between rounded-lg px-4 py-2 shadow-lg">
      <div>
        <div>
          <button className="absolute right-2 top-2 rounded-sm border border-[#6439ff] bg-[#8868fc17] px-4 py-1 text-xs uppercase text-[#7451f8]">
            Edit
          </button>
          <h3 className="text-gray-500">Information </h3>
          <div className="item flex gap-4 pt-4 sm:flex-col">
            <div className="h-24 w-24">
              <img
                className="h-full w-full rounded-full object-cover"
                src={img?.at(0) || "/userProfile.png"}
                alt={`${name}'s profile`}
              />
            </div>
            <div className="details">
              <h4 className="text-bold mb-3 text-xl font-bold">{name}</h4>

              <div>
                <DetailsContainer title="Name" content={userName} />
                <DetailsContainer title={"Email"} content={email} />
                <DetailsContainer title={"Phone"} content={phoneNumber} />
                <DetailsContainer title={"Country"} content={nationality} />
                <DetailsContainer title="Gender" content={gender || "M"} />
                <DetailsContainer title="Birthday" content={birthday} />
                <DetailsContainer title="Address" content={address} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-6">
          <Button className="w-full" onClick={handleAddAdmin}>
            Make Admin
          </Button>
        </div>
      )}
    </div>
  );
};

function DetailsContainer({ title, content }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-gray-500 sm:gap-2">
      <span className="text-sm font-bold">{title}: </span>
      <span className="text-wrap text-xs font-[300] sm:text-sm">{content}</span>
    </div>
  );
}

export default SingleUserProfile;
