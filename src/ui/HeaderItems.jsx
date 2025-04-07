import { SearchOutlined } from "@mui/icons-material";
import { Avatar, DropdownItem } from "flowbite-react";
import { LanguageSelect } from "../components/Dropdown";

import DarkModeToggle from "../components/DarkModeToggle";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";

const HeaderItems = () => {
  const { singleEmployee = {} } = getCurrentUser();
  const { img } = singleEmployee;

  return (
    <div className="flex items-center gap-3">
      <div className="md:hidden">
        <SearchOutlined fontSize="small" />
      </div>

      <LanguageSelect>
        <DropdownItem>English</DropdownItem>
      </LanguageSelect>

      <DarkModeToggle />

      <div>
        <div className="">
          {img ? (
            <img
              className="size-7 rounded-full object-cover"
              src={img?.at(0) || "/userProfile.png"}
              alt=""
            />
          ) : (
            <Avatar rounded />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderItems;
