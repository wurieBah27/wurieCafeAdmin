import HeaderItems from "../ui/HeaderItems";
import Logo from "../ui/Logo";
import { MenuOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../services/toggle";

const Header = ({ setShowSideBar }) => {
  const dispatch = useDispatch();
  const showSideBar = useSelector((state) => state.user.showSideBar);

  const handleToggle = () => {
    dispatch(toggleSidebar(!showSideBar));
  };
  return (
    <header className="fixed left-0 right-0 z-50 h-12 w-full border border-gray-200 bg-white py-8 text-sm text-[#555] shadow-lg dark:border-gray-500 dark:bg-gray-700 dark:text-gray-50">
      <div className="flex h-full items-center justify-between px-4 max-[400px]:px-2">
        <div className="flex flex-1 items-center gap-2">
          <button
            onClick={handleToggle}
            data-drawer-target="sidebar-multi-level-sidebar"
            data-drawer-toggle="sidebar-multi-level-sidebar"
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:ms-3 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuOutlined />
          </button>
          <Logo />
        </div>

        <div>
          <HeaderItems setShowSideBar={setShowSideBar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
