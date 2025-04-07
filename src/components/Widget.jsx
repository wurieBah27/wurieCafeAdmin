import { KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Widget = ({ data, url, Icon, total }) => {
  return (
    <div className="flex-1 rounded-md px-3 py-1.5 shadow-xl">
      <div>
        <div className="flex justify-between gap-2">
          <div className="flex flex-col justify-between gap-2">
            <span className="text-sm font-bold uppercase text-gray-400">
              {data?.title}
            </span>
            <span className="text-sm font-[300] sm:text-xl md:text-2xl">
              {data?.isMoneySign} {total || 0}
            </span>
            <Link
              to={url}
              className="text-nowrap border-b border-gray-400 text-xs"
            >
              See all {data?.title}
            </Link>
          </div>
          <div>
            <div className="flex h-full flex-col justify-between">
              <div>
                <span className="flex items-center text-xs text-green-400">
                  <KeyboardArrowUpOutlined fontSize="small" />
                  {data?.diff || 200}%
                </span>
              </div>
              <span className="w-max self-end rounded-md bg-[rgba(255,0,0,0.2)] p-1 align-bottom text-xs text-[crimson]">
                {<Icon fontSize="small" />}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
