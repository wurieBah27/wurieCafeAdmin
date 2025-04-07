import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "../ui/SideBar";

const Applayout = () => {
  return (
    <div className="relative flex">
      <SideBar />
      <main className="relative min-h-screen w-full overflow-x-auto p-4 md:ml-64">
        <Header />
        <div className="mt-20 py-2 sm:px-4 sm:py-6">
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Applayout;
