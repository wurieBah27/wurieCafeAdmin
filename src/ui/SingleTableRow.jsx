import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const SingleTableRow = ({ data, pathUrl }) => {
  const { customer } = data;
  const customerName = customer.split(" ").at(0);
  return (
    <tr>
      <td className="whitespace-nowrap bg-teal-50 px-4 py-2 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-200">
        {data.id}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {data.date}
      </td>
      <td className="whitespace-nowrap bg-gray-200 py-2 pr-6 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        <span className="flex items-center gap-2 px-6 py-2">
          <img
            src={data.img}
            alt="customer image"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="o text-xs">{customerName}</span>
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {data.productName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {data.phone}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {data.amount}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
        {data.method}
      </td>
      <td
        className={`whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200`}
      >
        <span className={`rounded-sm px-2 py-1 dark:text-white`}>
          {data.status === "Delivered" && (
            <Button color="success">Delivered</Button>
          )}
          {data.status === "Delivery" && (
            <Button color="warning">Delivery</Button>
          )}
          {data.status === "Pending" && (
            <Button color="failure">Pending</Button>
          )}
          {data.status === "Approved" && <Button color="blue">Approved</Button>}
        </span>
      </td>

      <td className="whitespace-nowrap px-4 py-2">
        <Link
          to={`/${pathUrl}/${data?.id}`}
          className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 dark:bg-blue-500 dark:text-gray-50"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default SingleTableRow;
