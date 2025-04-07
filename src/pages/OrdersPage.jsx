import { Button } from "flowbite-react";
import MoveBackBtn from "../components/MoveBackBtn";
import OrdersContainer from "../features/Orders/OrdersContainer";
import useGetAllOrders from "../features/Orders/ordersHooks/useGetAllOrders";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

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

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const { ordersData = [], totalOrders } = useGetAllOrders();
  const [status, setStatus] = useState("pending");

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  let data = [];

  if (status === "pending")
    data = ordersData?.filter((order) => order?.Order_status !== "Delivered");
  if (status === "delivered")
    data = ordersData?.filter((order) => order?.Order_status === "Delivered");
  if (status === "cancelled")
    data = ordersData?.filter((order) => order?.Order_status === "Cancelled");

  const PAGE_SIZE = 7; // Assuming 7 items per page for pagination

  const paginatedData =
    data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []; // Assuming 20 items per page
  console.log("Orders Data for page:", page, paginatedData); // Debugging line to check the paginated data
  const totalItems = data.length;
  return (
    <div>
      <div>
        <div className="mb-3 flex items-center justify-between gap-4 overflow-auto py-4 sm:mb-5 lg:mb-6">
          <MoveBackBtn />
          <div className="flex items-center justify-end gap-4">
            <Button
              gradientDuoTone="redToYellow"
              onClick={() => setStatus("pending")}
            >
              Pending
            </Button>
            <Button
              gradientDuoTone="greenToBlue"
              onClick={() => setStatus("delivered")}
            >
              Delivered
            </Button>
            <Button
              gradientDuoTone="pinkToOrange"
              onClick={() => setStatus("cancelled")}
            >
              Cancelled
            </Button>
          </div>
        </div>
        <div>
          <OrdersContainer
            data={paginatedData}
            count={totalItems}
            headerContent={headerContent}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
