import { Button } from "flowbite-react";
import MoveBackBtn from "../components/MoveBackBtn";
import OrdersContainer from "../features/Orders/OrdersContainer";
import useGetAllOrders from "../features/Orders/ordersHooks/useGetAllOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../helpers/constants";
import Filter from "../components/Filter";
import { FilterList } from "@mui/icons-material";

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
  { value: "All", label: "All orders" },
  { value: "Pending", label: "Pending orders" },
  { value: "Approved", label: "Approved orders" },
  { value: "Processing", label: "Processing Orders" },
  { value: "Delivering", label: "In transit" },
  { value: "Delivered", label: "Delivered" },
  { value: "Declined", label: "Declined" },
];

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const { ordersData = [], totalOrders, isGettingsOrders } = useGetAllOrders();
  /*  */
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const paginatedData =
    ordersData?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []; // Assuming 20 items per page
  return (
    <div>
      <div>
        <div className="mb-3 flex items-center justify-between gap-4 overflow-auto py-4 sm:mb-5 lg:mb-6">
          <MoveBackBtn />
          <div className="flex items-center justify-end gap-4">
            <Filter
              title="Filter By"
              filterField={"orderStatus"}
              Icon={FilterList}
              options={filterOptions}
            />
          </div>
        </div>
        <div>
          <OrdersContainer
            data={paginatedData}
            count={totalOrders}
            headerContent={headerContent}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
