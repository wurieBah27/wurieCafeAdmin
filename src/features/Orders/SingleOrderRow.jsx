import { Avatar, Button, DropdownItem } from "flowbite-react";
import CheckBox from "../../components/CheckBox";
import { DeleteOutlined, VisibilityOutlined } from "@mui/icons-material";
import { TableActions } from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import OrderActions from "./OrderActions";

const SingleOrderRow = ({ orderData = {} }) => {
  const {
    id,
    customer = {},
    createdAt,
    images: customerImg,
    delivery_address,
    soldBy: { employeeName = "" },
    total,
    payment_method: paymentMethod,
    Order_status: status,
    payment_status,
  } = orderData;

  const { phone, name } = customer;

  const { state, street } = delivery_address;
  const firstName = name?.split(" ").at(0);
  if (!orderData) return <Spinner />;

  //   const { delivery_address } = orderData;
  /* format the date to change to date */
  const dates = new Date(createdAt);
  const formattedDate = format(dates, "MMM/dd/yyyy hh:mm a");

  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">
      <td className="w-4 p-2 sm:p-4">
        <CheckBox id={id} />
      </td>
      <td
        scope="row"
        className={`mr-4 whitespace-nowrap py-2 pr-6 text-gray-700 dark:text-gray-50`}
      >
        <div className="flex w-full items-center gap-2">
          {customerImg ? (
            <img
              className="size-7 rounded-full object-cover"
              src={customerImg}
              alt=""
            />
          ) : (
            <Avatar rounded />
          )}
          <span className="inline-block">{firstName}</span>
        </div>
      </td>
      <td className="text-nowrap px-3 py-2 text-sm sm:px-6 sm:py-4">
        {formattedDate}
      </td>
      <td className="px-3 py-2 text-sm sm:px-6 sm:py-4">{total?.toFixed(2)}</td>
      <td className="text-nowrap px-3 py-2 text-sm sm:px-6 sm:py-4">{phone}</td>
      <td className="h-full w-max text-xs sm:px-6 sm:py-4">
        <div className="w-48">{`${state}, ${street}`}</div>
      </td>
      <td className="w-max text-nowrap px-3 py-2 text-sm sm:px-6 sm:py-4">
        {employeeName}
      </td>

      <td className="text-nowrap px-3 py-2 text-xs sm:px-6 sm:py-4">
        {paymentMethod}
      </td>
      <td className="px-3 py-2 sm:px-6 sm:py-4">
        <span>
          <OrderActions
            status={status}
            itemID={id}
            showDeclineBtn={false}
            total={total}
            paymentStatus={payment_status}
          />
        </span>
      </td>

      <td className="px-3 py-2 sm:px-6 sm:py-4">
        <Button color="blue" onClick={() => navigate(`/orders/${id}`)}>
          <span className="flex items-center gap-2">
            <VisibilityOutlined /> View
          </span>
        </Button>{" "}
      </td>
      <td className="px-3 py-2 sm:px-6 sm:py-4">
        <TableActions id={id}>
          <DropdownItem onClick={() => navigate(`/orders/${id}`)}>
            {" "}
            <span className="flex items-center gap-2">
              <VisibilityOutlined fontSize="small" /> See Details
            </span>
          </DropdownItem>
          <DropdownItem>
            <span className="flex items-center gap-2 text-red-500">
              <DeleteOutlined fontSize="small" /> Delete
            </span>
          </DropdownItem>
        </TableActions>
      </td>
      <td className="px-3 py-2 sm:px-6 sm:py-4">{id}</td>
    </tr>
  );
};

export default SingleOrderRow;
