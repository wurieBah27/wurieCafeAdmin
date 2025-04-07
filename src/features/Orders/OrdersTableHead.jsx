import CheckBox from "../../components/CheckBox";

const OrdersTableHead = ({ data }) => {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 shadow-lg dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <CheckBox id="all-search" />
        </th>
        {data?.map((content, i) => (
          <th scope="col" className="px-6 py-3" key={i}>
            {content}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default OrdersTableHead;
