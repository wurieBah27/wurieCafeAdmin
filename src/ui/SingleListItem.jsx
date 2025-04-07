import { NavLink } from "react-router-dom";

const SingleListItem = ({ text, icon, url, onClick }) => {
  return (
    <li onClick={onClick}>
      <NavLink
        to={url}
        className="nav_link group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <span className="shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
          {icon}
        </span>
        <span className="ms-3 flex-1 whitespace-nowrap">{text}</span>
        <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          {}
        </span>
      </NavLink>
    </li>
  );
};

export default SingleListItem;
