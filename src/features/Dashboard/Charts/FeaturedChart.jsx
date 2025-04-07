import { MoreVert } from "@mui/icons-material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FeaturedChartFooter from "../../../ui/FeaturedChartFooter";
import useGetTodayOrders from "../../Orders/ordersHooks/useGetTodayOrders";
import Spinner from "../../../ui/Spinner";

const FeaturedChart = () => {
  const {
    isGettingTodayOrders,
    totalTodayRevenue,
    deliveredOrders,
    pendingOrders,
    totalTodayOrders,
  } = useGetTodayOrders();

  const isMoreOrdersDelivered = deliveredOrders >= pendingOrders;

  const percentage = Math.round((deliveredOrders / totalTodayOrders) * 100);

  if (isGettingTodayOrders) return <Spinner />;
  return (
    <div className="boxshadow mb-10 flex-1 rounded-md px-3 py-1.5 md:mb-0">
      <div>
        <div className="top flex items-center justify-between text-gray-500">
          <h2 className="text-base font-semibold">
            Today orders {`(${totalTodayOrders})`}
          </h2>
          <MoreVert fontSize="small" />
        </div>
        <div className="bottom p-5">
          <div>
            <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
              <div className="flex h-[150px] w-full md:h-[100px] md:w-[100px]">
                <CircularProgressbar
                  value={percentage}
                  text={percentage}
                  strokeWidth={5}
                />
              </div>
              <span>Delivered {deliveredOrders}</span>
              <div className="flex flex-col items-center justify-center gap-2">
                <span>Total sales made today.</span>
                <span>$ {totalTodayRevenue || "No sales today"}</span>
                <p className="text-center text-[10px]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="w-full">
                <div className="flex w-full items-center justify-between gap-2">
                  <FeaturedChartFooter
                    title="Pending"
                    amount={pendingOrders}
                    checker={isMoreOrdersDelivered}
                  />
                  <FeaturedChartFooter
                    title="Delivered"
                    amount={deliveredOrders}
                    checker={isMoreOrdersDelivered}
                  />
                  <FeaturedChartFooter
                    title="Orders"
                    checker={isMoreOrdersDelivered}
                    amount={totalTodayOrders}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
