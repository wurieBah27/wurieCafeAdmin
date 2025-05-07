import { SearchOutlined } from "@mui/icons-material";
import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { LanguageSelect } from "../components/Dropdown";

import DarkModeToggle from "../components/DarkModeToggle";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";
import { Link } from "react-router-dom";
import useLogout from "../features/Employees/employees_hooks/useLogout";

const HeaderItems = () => {
  const { singleEmployee = {}, userUid = "" } = getCurrentUser();
  const { img, userEmail, fullname } = singleEmployee;
  const { loggingOut } = useLogout();
  console.log(singleEmployee);
  return (
    <div className="flex items-center gap-3">
      <LanguageSelect>
        <DropdownItem>English</DropdownItem>
      </LanguageSelect>

      <DarkModeToggle />

      <div>
        {userUid && (
          <Dropdown
            arrowIcon={false}
            inline
            placement="bottom"
            label={
              <Avatar
                alt="User settings"
                img={img?.at(0) ? img?.at(0) : ""}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{fullname || "No Name"}</span>
              <span className="block truncate text-sm font-medium">
                {userEmail || "No Email"}
              </span>
            </Dropdown.Header>

            <Link to={`/users/${userUid}`}>
              <Dropdown.Item>Account</Dropdown.Item>
            </Link>
            <Dropdown.Item>Edit Account</Dropdown.Item>
            <Dropdown.Item>Delete Account</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => loggingOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default HeaderItems;
