import {
  MonetizationOnOutlined,
  PeopleOutlined,
  PersonOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import Widget from "../../../components/Widget";
import useGetEmployees from "../../Employees/employees_hooks/useGetEmployees";
import useGetAllCustomers from "../../Customers/customersHooks/useGetAllCustomers";
import useGetOrdersAfterDate from "../useGetOrdersAfterDate";
import useProducts from "../../products/products_hooks/useProducts";

const WidgetsContainer = () => {
  const { totalOrders, ordersAfterDate } = useGetOrdersAfterDate();
  const { totalEmployees } = useGetEmployees();
  const { totalCustomers } = useGetAllCustomers();
  const { totalProducts } = useProducts();

  const pendingOrdersTotalPrice = ordersAfterDate
    ?.filter((order) => order.Order_status !== "Delivered")
    .reduce((a, b) => a + b.total, 0);

  const deliveredOrdersTotalPrice = ordersAfterDate
    ?.filter((order) => order.Order_status === "Delivered")
    .reduce((a, b) => a + b.total, 0);

  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <div className="grid grid-cols-2 flex-wrap items-center justify-center gap-5 max-[390px]:grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
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
          data={{ title: "products" }}
          Icon={ShoppingBagOutlined}
          total={totalProducts}
          url={"/products"}
        />{" "}
        <Widget
          data={{ title: "pending" }}
          Icon={MonetizationOnOutlined}
          total={pendingOrdersTotalPrice?.toFixed(2)}
          url={"/orders"}
        />{" "}
        <Widget
          data={{ title: "Orders" }}
          Icon={PersonOutlined}
          total={totalOrders}
          url={"/orders"}
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
