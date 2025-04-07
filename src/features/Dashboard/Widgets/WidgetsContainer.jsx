import {
  MonetizationOnOutlined,
  PeopleOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import Widget from "../../../components/Widget";
import useGetEmployees from "../../Employees/employees_hooks/useGetEmployees";
import useGetAllCustomers from "../../customers/customersHooks/useGetAllCustomers";
import useGetOrdersAfterDate from "../useGetOrdersAfterDate";

const WidgetsContainer = () => {
  const { totalOrders, ordersAfterDate } = useGetOrdersAfterDate();
  const { totalEmployees } = useGetEmployees();
  const { totalCustomers } = useGetAllCustomers();

  const pendingOrdersTotalPrice = ordersAfterDate
    ?.filter((order) => order.Order_status !== "Delivered")
    .reduce((a, b) => a + b.total, 0);

  const deliveredOrdersTotalPrice = ordersAfterDate
    ?.filter((order) => order.Order_status === "Delivered")
    .reduce((a, b) => a + b.total, 0);

  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <Widget
          data={{ title: "Employees" }}
          Icon={PeopleOutlined}
          total={totalEmployees}
          url={"/users"}
        />{" "}
        <Widget
          data={{ title: "Earnrings" }}
          Icon={MonetizationOnOutlined}
          total={deliveredOrdersTotalPrice?.toFixed(2)}
        />{" "}
        <Widget
          data={{ title: "pending orders" }}
          Icon={MonetizationOnOutlined}
          total={pendingOrdersTotalPrice?.toFixed(2)}
          url={"/orders"}
        />{" "}
        <Widget
          data={{ title: "Orders" }}
          Icon={PersonOutlined}
          total={totalOrders}
        />
        <Widget
          data={{ title: "Customers" }}
          Icon={PersonOutlined}
          total={totalCustomers}
        />
      </div>
    </div>
  );
};

export default WidgetsContainer;
