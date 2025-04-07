import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

const FeaturedChartFooter = ({ title, amount, checker }) => {
  return (
    <div className="item flex flex-col items-center justify-center gap-2 text-gray-500">
      <h3 className="itemTitle text-base">{title}</h3>

      <div
        className={`itemResults flex items-center justify-between ${!checker ? "text-red-500" : "text-teal-500"}`}
      >
        {checker ? (
          <KeyboardArrowUpOutlined />
        ) : (
          <KeyboardArrowDownOutlined fontSize="small" />
        )}
        <div className="amount text-xs">{amount}</div>
      </div>
    </div>
  );
};

export default FeaturedChartFooter;
