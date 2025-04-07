import {
  DarkModeOutlined,
  LanguageOutlined,
  LightModeOutlined,
  MoreVert,
} from "@mui/icons-material";
import { Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";

export const LanguageSelect = ({ children }) => {
  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => <LanguageOutlined fontSize="small" />}
    >
      {children}
    </Dropdown>
  );
};
export const DarkModeSelect = ({ children }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() =>
        isDarkMode ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )
      }
    >
      {children}
    </Dropdown>
  );
};
export const TableActions = ({ children, id }) => {
  return (
    <Dropdown
      id={id}
      label=""
      dismissOnClick={true}
      renderTrigger={() => <MoreVert fontSize="small" />}
    >
      {children}
    </Dropdown>
  );
};
