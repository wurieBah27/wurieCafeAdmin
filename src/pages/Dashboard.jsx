import ChartContainer from "../features/Dashboard/Charts/ChartContainer";
import WidgetsContainer from "../features/Dashboard/Widgets/WidgetsContainer";
import OrdersContainer from "../features/Orders/OrdersContainer";
import { FilterList } from "@mui/icons-material";
import Filter from "../components/Filter";
import useGetOrdersAfterDate from "../features/Dashboard/useGetOrdersAfterDate";

const headerContent = [
  "Customer",
  "Date",
  "Amount",
  "Phone #",
  "Customer Address ",
  "Sold By",
  "Method",
  "Status",
  "view",
  "Actions",
  "Transaction ID",
];

const filterOptions = [
  { value: "3", label: "Last 3 days" },
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

const Dashboard = () => {
  const { ordersAfterDate } = useGetOrdersAfterDate();
  const filteredOrdersData = ordersAfterDate?.filter(
    (order) => order?.Order_status !== "Delivered",
  );

  const count = filteredOrdersData?.length || 0;
  return (
    <div>
      <div>
        <div className="flex items-center justify-between gap-2 py-6">
          <div>
            <h2 className="text-xl font-bold text-gray-600 dark:text-gray-100">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center justify-evenly gap-5 sm:flex-none">
            <Filter
              filterField="last"
              title={"Filter By"}
              Icon={FilterList}
              options={filterOptions}
            />
          </div>
        </div>
      </div>
      <div className="">
        <WidgetsContainer />
        <div className="boxshadow my-16 rounded-lg">
          <ChartContainer />
        </div>
        <OrdersContainer
          data={filteredOrdersData}
          headerContent={headerContent}
          count={count}
          title={"Recent Orders"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
