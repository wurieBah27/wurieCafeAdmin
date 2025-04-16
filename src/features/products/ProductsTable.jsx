import TableForProducts from "../../components/TableForProducts";
import Spinner from "../../ui/Spinner";
import useProducts from "./products_hooks/useProducts";

const ProductsTable = () => {
  const { products } = useProducts();
  const { data: productsData, isLoading } = products;

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center justify-between overflow-x-auto">
        <div className="w-full overflow-x-auto">
          {" "}
          {/* Added overflow-x-auto class */}
          <table className="w-full min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:bg-gray-700 dark:text-white">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-4">
                  Product
                </th>

                <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-4">
                  Price (AED)
                </th>

                <th className="whitespace-nowrap px-2 py-2 font-medium sm:px-4">
                  Average Rating
                </th>

                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Availability
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  View
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  Actions
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">ID</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {productsData.map((row) => (
                <TableForProducts key={row.id} data={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
