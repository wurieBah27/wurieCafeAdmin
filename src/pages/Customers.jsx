import SearchsInputs from "../components/SearchsInputs";
import CustomersTable from "../features/customers/CustomersTable";
import Spinner from "../ui/Spinner";
import MoveBackBtn from "../components/MoveBackBtn";
import useGetAllCustomers from "../features/customers/customersHooks/useGetAllCustomers";

const Customers = () => {
  const { customersData, isFetchingCustomers, errorFetchingCustomers } =
    useGetAllCustomers();

  if (isFetchingCustomers) return <Spinner />;
  if (errorFetchingCustomers)
    return (
      <div className="text-center text-2xl font-bold">
        It's like you are not an Admin. Only admins have the previllege to see
        customers details
      </div>
    );

  return (
    <div className="">
      <div>
        <div>
          <div>
            <p className="flex justify-between text-lg text-gray-500 sm:text-lg">
              <MoveBackBtn />
            </p>
          </div>
          <div className="py-4 shadow-sm">
            <SearchsInputs placeholder="Search customers by user name..." />
          </div>
          <div className="relative flex h-[25rem] w-full shadow-md">
            <div className="absolute bottom-0 left-0 top-0 w-full flex-1 overflow-x-auto py-2">
              <CustomersTable customersData={customersData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
