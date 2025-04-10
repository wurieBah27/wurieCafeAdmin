import { Link } from "react-router-dom";
import SingleListItem from "./SingleListItem";
import {
  DashboardOutlined,
  GroupOutlined,
  InsertChartOutlined,
  LocalShipping,
  LogoutOutlined,
  NotificationsActiveOutlined,
  PersonOutlineOutlined,
  PersonOutlineRounded,
  PsychologyAltOutlined,
  SettingsOutlined,
  SettingsSystemDaydreamOutlined,
  ShoppingCart,
  StoreOutlined,
  ViewStreamOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../services/toggle";
import useLogout from "../features/Employees/employees_hooks/useLogout";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";

const SideBar = () => {
  const { singleEmployee = {} } = getCurrentUser();
  const { img, userEmail, fullname } = singleEmployee;
  const dispatch = useDispatch();

  const showSideBar = useSelector((state) => state.user.showSideBar);

  const handleHideSidebar = () => {
    dispatch(toggleSidebar(false));
  };

  const { loggingOut, isLoading } = useLogout();

  return (
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed left-0 top-24 ${showSideBar ? "translate-x-0" : "-translate-x-full"} z-40 h-screen w-64 pb-24 transition-transform md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto rounded-tr-2xl bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <p className="mb-1 mt-4 border-b border-gray-400 pb-1 text-sm uppercase text-[#999]">
              Main
            </p>

            <SingleListItem
              onClick={handleHideSidebar}
              url="/dashboard"
              icon={
                <DashboardOutlined
                  fontSize="small"
                  className="text-[#7451f8]"
                />
              }
              text="Dashboard"
            />

            <SingleListItem
              onClick={handleHideSidebar}
              url={"/products"}
              icon={
                <StoreOutlined fontSize="small" className="text-[#7451f8]" />
              }
              text="Products"
            />

            <p className="mb-1 border-b border-gray-400 pb-1 pt-6 text-sm uppercase text-[#999]">
              LISTS{" "}
            </p>

            <SingleListItem
              onClick={handleHideSidebar}
              url="/orders"
              icon={
                <ViewStreamOutlined
                  fontSize="small"
                  className="text-[#7451f8]"
                />
              }
              text="Orders"
            />

            <SingleListItem
              onClick={handleHideSidebar}
              url={"/delivering"}
              icon={
                <LocalShipping fontSize="small" className="text-[#7451f8]" />
              }
              text="Delivery"
            />

            <SingleListItem
              onClick={handleHideSidebar}
              url={"/users"}
              icon={
                <PersonOutlineOutlined
                  fontSize="small"
                  className="text-[#7451f8]"
                />
              }
              text="Employees"
            />

            <SingleListItem
              onClick={handleHideSidebar}
              url={"/customers"}
              icon={
                <GroupOutlined fontSize="small" className="text-[#7451f8]" />
              }
              text="Customers"
            />

            <p className="mb-1 mt-4 border-b border-gray-400 pb-1 text-sm uppercase text-[#999]">
              Account{" "}
            </p>

            <SingleListItem
              icon={
                <SettingsOutlined fontSize="small" className="text-[#7451f8]" />
              }
              text="Settings"
              onClick={handleHideSidebar}
              url={"/settings"}
            />
            <SingleListItem
              onClick={() => {
                loggingOut();
                handleHideSidebar(); // Ensure the sidebar is hidden after logging out
              }}
              url={"/login"}
              icon={
                <LogoutOutlined fontSize="small" className="text-[#7451f8]" />
              }
              text="Logout"
            />
          </ul>
          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a
              href="#"
              className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 dark:bg-gray-700 dark:text-white"
            >
              {img && (
                <img
                  alt=""
                  src={img?.at(0) || "/userProfile.png"}
                  className="size-10 rounded-full object-cover"
                />
              )}

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">{fullname}</strong>

                  <span> {userEmail}</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
