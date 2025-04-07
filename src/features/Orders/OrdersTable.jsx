import OrdersTableHead from "./OrdersTableHead";
import SingleOrderRow from "./SingleOrderRow";

const OrdersTable = ({ data = [], headerContent }) => {
  if (data.length === 0)
    return (
      <div className="text-sm text-gray-700">
        There are no orders currently.
      </div>
    );
  return (
    <div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        {" "}
        <table className="min-w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <OrdersTableHead data={headerContent} />
          <tbody>
            {data.map((order) => (
              <SingleOrderRow orderData={order} key={order?.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
