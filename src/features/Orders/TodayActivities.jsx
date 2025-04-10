import { format } from "date-fns";
import OrderActions from "./OrderActions";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@mui/icons-material";

const TodayActivities = ({ data = {} }) => {
  const navigate = useNavigate();
  const {
    images,
    order_type,
    customer,
    Order_status,
    id,
    createdAt,
    total,
    payment_status,
  } = data;
  const dates = new Date(createdAt);

  const formattedDate = format(dates, "hh:mm a");

  const { name } = customer;
  return (
    <li className="flex min-w-max items-center justify-between gap-5 rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-600">
      <div className="flex items-center gap-3 rounded-md">
        <img
          src={images}
          alt={name || ""}
          className="size-7 rounded-full object-cover"
        />
        <span className="text-nowrap font-bold">{name}</span>
      </div>
      <span className="text-nowrap font-bold">Type: {order_type}</span>
      <span className="text-nowrap">Today: {formattedDate}</span>
      <div>
        <OrderActions
          status={Order_status}
          itemID={id}
          showDeclineBtn={false}
          total={total}
          paymentStatus={payment_status}
        />
      </div>
      <div>
        <Button
          size="xs"
          color="blue"
          onClick={() => navigate(`/orders/${id}`)}
        >
          <span className="flex items-center gap-2">
            <VisibilityOutlined /> View
          </span>
        </Button>{" "}
      </div>
    </li>
  );
};

export default TodayActivities;
