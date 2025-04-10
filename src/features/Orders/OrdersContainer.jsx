import OrdersTable from "./OrdersTable";
import Pagination from "../../components/Pagination";
import { PAGE_SIZE } from "../../helpers/constants";

const OrdersContainer = ({ data, count, headerContent, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-5 text-center text-xl font-bold text-gray-500">
        No orders available
      </div>
    );
  }
  return (
    <div className="boxshadow rounded-lg p-3 sm:p-7">
      <div>
        <div>
          <h3 className="mb-4 font-bold text-gray-500">{title}</h3>
          <div className="w-full">
            <OrdersTable data={data} headerContent={headerContent} />
          </div>
        </div>{" "}
      </div>

      {count > PAGE_SIZE && <Pagination count={count} />}
    </div>
  );
};

export default OrdersContainer;
