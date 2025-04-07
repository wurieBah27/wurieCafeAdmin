import { useDispatch } from "react-redux";
import useLocaleStorage from "../hooks/useLocaleStorage";
import { toggleTheme } from "../services/darkmodeReducer";
import { useEffect } from "react";
import { DarkModeSelect } from "./Dropdown";
import { DropdownItem } from "flowbite-react";

const DarkModeToggle = () => {
  const dispatch = useDispatch();

  const [isDark, setIsDarkMode] = useLocaleStorage(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  function toggleDarkMode(dark) {
    setIsDarkMode(dark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.body.classList.remove("light_mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.body.classList.add("light_mode");
    }

    dispatch(toggleTheme(isDark));
  }, [isDark, dispatch]);

  return (
    <DarkModeSelect>
      <DropdownItem onClick={() => toggleDarkMode(true)}>Dark</DropdownItem>
      <DropdownItem onClick={() => toggleDarkMode(false)}>Light</DropdownItem>
      <DropdownItem
        onClick={() =>
          toggleDarkMode(
            window.matchMedia("(prefers-color-scheme: dark)").matches,
          )
        }
      >
        Device
      </DropdownItem>
    </DarkModeSelect>
  );
};

export default DarkModeToggle;
