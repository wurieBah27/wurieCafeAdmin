import React from "react";
import SideNav from "../ui/SideNav";
import ColorSelector from "../ui/ColorSelector";

const Sidebar = ({ showSideBar }) => {
  return (
    <div
      className={`sidebar absolute ${showSideBar ? "left-0" : "left-[-200%]"} z-20 min-h-screen flex-[1.5] border-r border-r-gray-200 bg-white px-3 shadow-xl transition-all lg:static`}
    >
      <hr className="h-0 border border-gray-200" />
      <SideNav />
      <ColorSelector />
    </div>
  );
};

export default Sidebar;
