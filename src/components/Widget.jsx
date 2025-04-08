import { Link } from "react-router-dom";

const Widget = ({ data, url, Icon, total }) => {
  return (
    <div className="flex-1 rounded-md bg-gray-50 px-3 py-2 shadow-xl dark:bg-gray-600">
      <div>
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="flex aspect-square size-11 items-center justify-center rounded-full bg-[rgba(255,0,0,0.2)] p-1 text-5xl text-[crimson] dark:bg-gray-200">
              {<Icon />}{" "}
            </p>
            <div className="text-center">
              <h5 className="text-nowrap text-sm font-bold uppercase text-gray-400">
                {data?.title}
              </h5>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200 md:text-2xl">
                {data?.isMoneySign} {total || 0}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to={url}
              className="text-nowrap border-b border-gray-400 text-xs"
            >
              See all {data?.title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
