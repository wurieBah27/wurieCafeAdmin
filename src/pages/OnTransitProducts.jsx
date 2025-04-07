import { useSearchParams } from "react-router-dom";
import OrdersContainer from "../features/Orders/OrdersContainer";
import useGetAllOrders from "../features/Orders/ordersHooks/useGetAllOrders";
import MoveBackBtn from "../components/MoveBackBtn";

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

const OnTransitProducts = () => {
  const [searchParams] = useSearchParams();
  const { ordersData = [], totalOrders } = useGetAllOrders();
  // Filter orders that are on transit (not delivered or cancelled)
  const data = ordersData?.filter(
    (order) => order?.Order_status === "Delivering",
  );
  console.log(data);
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const PAGE_SIZE = 7; // Assuming 7 items per page for pagination

  const paginatedData =
    data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []; // Assuming 20 items per page
  console.log("Orders Data for page:", page, paginatedData); // Debugging line to check the paginated data
  const totalItems = data.length;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 overflow-auto py-4 sm:mb-5 lg:mb-6">
        <MoveBackBtn />
        <h1 className="text-lg font-semibold">On Transit Products</h1>
      </div>

      <div>
        <OrdersContainer
          data={paginatedData}
          count={totalItems}
          headerContent={headerContent}
        />
      </div>
    </div>
  );
};

export default OnTransitProducts;
