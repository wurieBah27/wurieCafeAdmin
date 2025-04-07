import SingleUserProfile from "../components/SingleUserProfile";
import TailTable from "../components/TailTable";
import Chart from "../features/Dashboard/Charts/Chart";
import OrdersContainer from "../features/Orders/OrdersContainer";
import useGetAllOrders from "../features/Orders/ordersHooks/useGetAllOrders";
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

const SingleCustomerDetails = () => {
  return (
    <div>
      <div>
        <div className="top flex flex-col flex-wrap gap-5 sm:flex-row">
          <SingleUserProfile title={"Customer"} />
          <div className="right sm:flex-[2]">
            <Chart aspect={3 / 2} title={"Customer transactions"} />
          </div>
        </div>
        <div className="bottom mt-8">
          <div>
            <div className="boxshadow rounded-md p-5">
              <h4 className="font-bold capitalize text-gray-500">
                Latest transactions
              </h4>
              <div className="w-full overflow-auto bg-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerDetails;
