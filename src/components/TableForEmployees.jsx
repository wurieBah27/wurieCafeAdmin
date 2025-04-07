import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import currentUserLoggedIn from "../features/Employees/employees_hooks/user";

const TableForEmployees = ({ data = {} }) => {
  const { userUid } = currentUserLoggedIn();

  console.log(userUid);
  const {
    id,
    img,
    fullname: employee,
    userPhoneNumber: phone,
    userAddress: address,
    userBirthday: birthdayDate,
    userEmail: email,
    nationality,
  } = data;

  const navigate = useNavigate();

  const employeeFirstName = employee?.split(" ").at(0);
  return (
    <tr className={`${userUid === id ? "bg-blue-50 dark:bg-gray-800" : ""} `}>
      <td
        className={`whitespace-nowrap py-2 pr-6 text-gray-700 dark:text-gray-50 ${userUid === id ? "bg-blue-50 font-bold dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-600"}`}
      >
        <span className="flex items-center gap-2 px-6 py-2">
          <img
            src={img?.at(0) || "/userProfile.png"}
            alt="customer image"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="o text-xs">
            {userUid === id ? "You" : employeeFirstName}
          </span>
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-50">
        {email}
      </td>
      <td
        className={`whitespace-nowrap px-4 py-2 ${userUid === id ? "font-bold dark:bg-gray-800" : "dark:bg-gray-600"}`}
      >
        {birthdayDate}
      </td>

      <td className="whitespace-nowrap px-4 py-2">{phone}</td>
      <td
        className={`overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 ${userUid === id ? "bg-blue-50 font-bold dark:bg-gray-800" : "dark:bg-gray-600"}`}
      >
        {address}
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
        {nationality}
      </td>

      <td
        className={`"whitespace-nowrap " px-4 py-2 ${userUid === id ? "font-bold dark:bg-gray-800" : "dark:bg-gray-600"}`}
      >
        {" "}
        <Button color="blue" onClick={() => navigate(`/users/${id}`)}>
          View
        </Button>
      </td>
      <td
        className={`whitespace-nowrap bg-teal-50 px-4 py-2 font-medium text-gray-900 dark:text-gray-50 ${userUid === id ? "font-bold dark:bg-gray-800" : "dark:bg-gray-700"}`}
      >
        {id}
      </td>
    </tr>
  );
};

export default TableForEmployees;
