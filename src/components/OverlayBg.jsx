import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../services/toggle";

const OverlayBg = () => {
  const dispatch = useDispatch();
  const showSideBar = useSelector((state) => state.user.showSideBar);

  const handleToggle = () => {
    dispatch(toggleSidebar(!showSideBar));
  };

  if (!showSideBar) return "";
  return (
    <div
      onClick={handleToggle}
      className="fixed bottom-0 left-0 right-0 top-0 z-10 max-h-full overflow-y-auto overflow-x-hidden bg-gray-800 opacity-70"
    ></div>
  );
};

export default OverlayBg;
