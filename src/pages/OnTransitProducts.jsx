import { useSearchParams } from "react-router-dom";
import OrdersContainer from "../features/Orders/OrdersContainer";
import useGetAllOrders from "../features/Orders/ordersHooks/useGetAllOrders";
import { PAGE_SIZE } from "../helpers/constants";
import { useEffect } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { ordersData = [], totalOrders } = useGetAllOrders();
  // Filter orders that are on transit (not delivered or cancelled)

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  useEffect(() => {
    searchParams.set("orderStatus", "Delivering");
    setSearchParams(searchParams); // Update the URL without reloading the page
  }, []);

  const paginatedData =
    ordersData?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []; // Assuming 20 items per page
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 overflow-auto py-4 sm:mb-5 lg:mb-6">
        <h1 className="text-lg font-semibold">On Transit Products</h1>
      </div>

      <div>
        <OrdersContainer
          data={paginatedData}
          count={totalOrders}
          headerContent={headerContent}
        />
      </div>
      {paginatedData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <img src="/deliveryTruck.png" alt="delivery truck" className="" />
          <h2 className="py-5 text-center text-xl font-bold text-gray-500">
            No products in transit currently!
          </h2>
        </div>
      )}
    </div>
  );
};

export default OnTransitProducts;
