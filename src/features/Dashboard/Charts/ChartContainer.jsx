import useGetTodayOrders from "../../Orders/ordersHooks/useGetTodayOrders";
import TodayOrders from "../../Orders/TodayOrders";
import useGetOrdersAfterDate from "../useGetOrdersAfterDate";
import Chart from "./Chart";
import FeaturedChart from "./FeaturedChart";

const ChartContainer = () => {
  const { todayActivity } = useGetTodayOrders();

  const { ordersAfterDate, numDays } = useGetOrdersAfterDate();
  return (
    <div className="boxshadow my-16 rounded-lg py-6">
      <div className="flex flex-col flex-wrap gap-5 overflow-auto px-2 pb-10 sm:px-4 lg:flex-row">
        <div className="boxshadow w-full flex-1 rounded-md bg-gray-50 px-3 py-1.5 text-sm dark:bg-gray-800 md:mb-0">
          <TodayOrders data={todayActivity} />
        </div>
        <FeaturedChart />
      </div>
      <Chart
        aspect={2 / 1}
        title={`Last ${numDays} days (Revenue)`}
        orders={ordersAfterDate}
        numDays={numDays}
      />
    </div>
  );
};

export default ChartContainer;
