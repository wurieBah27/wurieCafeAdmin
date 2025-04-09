import OrdersTable from "./OrdersTable";
import Pagination from "../../components/Pagination";
import { PAGE_SIZE } from "../../helpers/constants";

const OrdersContainer = ({ data, count, headerContent, title }) => {
  return (
    <div className="boxshadow p-0 sm:p-5">
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
