import TodayActivities from "./TodayActivities";

const TodayOrders = ({ data }) => {
  const isPendingOrders = data?.filter(
    (order) => order.Order_status !== "Delivered",
  );

  return (
    <div>
      <h4 className="overflow-auto text-sm font-bold text-gray-700 dark:text-gray-50">
        Today Activity
      </h4>
      <ul className="mb-10 flex flex-col gap-3 overflow-auto rounded-md px-1.5 py-4">
        {data?.length > 0 && isPendingOrders?.length > 0 ? (
          isPendingOrders.map((order) => (
            <TodayActivities key={order.id} data={order} />
          ))
        ) : (
          <p className="text-center text-xl font-bold text-gray-500">
            No pending orders currently!
          </p>
        )}
      </ul>
    </div>
  );
};

export default TodayOrders;
