import { Button, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { TableActions } from "../../components/Dropdown";

const CustomersTableContent = ({ data = {} }) => {
  const {
    id,
    profileUrl,
    name,
    phone,
    dateOfBirth,
    address = {}, // Ensure address is an object to avoid errors
    // Fallback to empty object if address is not provided
    email,
  } = data;
  const navigate = useNavigate();

  const { formatted, county, country } = address;
  const customerAddress = formatted || county || "No address provided";

  const customerFirstName = name?.split(" ").at(0) || "Unknown";

  if (!id) return null; // Guard clause for missing ID
  return (
    <tr>
      <td className="whitespace-nowrap bg-gray-200 py-2 pr-6 text-gray-700 dark:bg-gray-600 dark:text-gray-50">
        <span className="flex items-center gap-2 px-6 py-2">
          <img
            src={profileUrl || "/userProfile.png"}
            alt="customer image"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="o text-xs">{customerFirstName}</span>
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-50">
        {email}
      </td>

      <td className="whitespace-nowrap px-4 py-2">{phone}</td>

      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 dark:bg-gray-600">
        {county}
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
        {country}
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2">
        <div className=" ">
          <TableActions>
            <DropdownItem>
              <Link>View</Link>
            </DropdownItem>
            <DropdownItem onClick={() => console.log("Delete all customers")}>
              Delete
            </DropdownItem>
          </TableActions>
        </div>
      </td>
    </tr>
  );
};

export default CustomersTableContent;
