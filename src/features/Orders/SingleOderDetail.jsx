import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import OrderActions from "./OrderActions";
import OrderItems from "./OrderItems";
import useGetSingleOrder from "./ordersHooks/useGetSingleOrder";
import SingleOrderDetailsFooter from "./SingleOrderDetailsFooter";
import { dateConverter } from "../../helpers/dateConverter";
import { useState } from "react";
import MoveBackBtn from "../../components/MoveBackBtn";
import CustomerLocation from "../../components/CustomerLocation";

const SingleOderDetail = () => {
  const [itemsTotalPrice, setItemsTotalPrice] = useState(null);
  const { ordersID } = useParams();
  const { singleOrder = {}, loadingOrder, isError } = useGetSingleOrder();

  const {
    Order_status: status,
    payment_status: payStatus,
    order_number,
    soldBy,
    declined,
    order_type,
    items,
    tax,
    images,
    createdAt,
    delivery_address,
  } = singleOrder;
  const employeeName = soldBy?.employeeName;
  const seconds = createdAt?.seconds;
  const nanoseconds = createdAt?.nanoseconds;

  const formattedDate = dateConverter?.(seconds, nanoseconds);

  if (loadingOrder) return <Spinner />;
  if (isError) return null;

  return (
    <div className="text-gray-600">
      <MoveBackBtn />
      <div className="mt-6 flex flex-col md:flex-col xl:flex-row">
        <div className="flex-[3]">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:gap-5">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-300 md:text-sm">
                  Order ID:{" "}
                  <span className="pl-3 text-gray-600 dark:text-gray-50">
                    INV-{order_number}
                  </span>
                </p>
              </div>
            </div>
            <p className="font-bold capitalize text-gray-800 dark:text-gray-300">
              Payment:{" "}
              <span className="rounded-lg bg-yellow-100 px-2 py-1 text-yellow-400">
                {payStatus}
              </span>
            </p>
            <p className="font-bold capitalize text-gray-800 dark:text-gray-300">
              Order #:{" "}
              <span className="pl-3 font-normal text-gray-600 dark:text-gray-50">
                {order_number}
              </span>
            </p>
            {employeeName && (
              <p className="font-bold text-gray-800 dark:text-gray-300">
                Employee:{" "}
                <span className="pl-3 font-normal capitalize text-gray-600 dark:text-gray-50">
                  {employeeName}
                </span>
              </p>
            )}
            <p className="font-bold capitalize text-gray-800 dark:text-gray-300">
              order type:{" "}
              <span className="pl-3 font-normal capitalize text-gray-600 dark:text-gray-50">
                {order_type}
              </span>
            </p>
            <p className="font-bold capitalize text-gray-800 dark:text-gray-300">
              order status:{" "}
              <span className="pl-3 font-normal capitalize text-gray-600 dark:text-gray-50">
                {status}
              </span>
            </p>

            <div className="font-bold text-gray-600 dark:text-gray-300">
              <p>
                Date:{" "}
                <span className="pl-3 font-normal capitalize text-gray-600 dark:text-gray-50">
                  {formattedDate?.formattedDate || "No date"}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 lg:mt-10">
            <h3 className="mb-4 bg-red-100 p-2 font-bold uppercase text-gray-800 shadow-sm dark:text-gray-400">
              Order Items
            </h3>

            <div>
              <div>
                {items.map((order, index) => (
                  <OrderItems
                    order={order}
                    key={index}
                    setItemsTotalPrice={setItemsTotalPrice}
                  />
                ))}
              </div>
            </div>
            {status === "Declined" && (
              <div className="mt-4 rounded-md p-4 shadow-sm">
                <h5 className="text-gray-800 dark:text-gray-100">Reason: </h5>
                <p className="font-bold capitalize text-red-500">{declined}</p>
              </div>
            )}
          </div>
          {status !== "Declined" && (
            <OrderActions status={status} itemID={ordersID} />
          )}{" "}
        </div>

        <div className="flex-[2]">
          <SingleOrderDetailsFooter
            itemsTotalPrice={itemsTotalPrice}
            tax={tax}
          />
        </div>
      </div>
      <CustomerLocation details={delivery_address} userProfile={images} />
    </div>
  );
};

export default SingleOderDetail;
