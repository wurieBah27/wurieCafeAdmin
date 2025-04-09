import { useParams, useSearchParams } from "react-router-dom";
import SingleUserProfile from "../../components/SingleUserProfile";
import Chart from "../Dashboard/Charts/Chart";
import OrdersContainer from "../Orders/OrdersContainer";
import useGetSingleEmployee from "./employees_hooks/useGetSingleEmployee";
import useGetOrdersAfterDate from "../Dashboard/useGetOrdersAfterDate";
import Filter from "../../components/Filter";
import { FilterList } from "@mui/icons-material";
import MoveBackBtn from "../../components/MoveBackBtn";

const filterOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "14", label: "Last 14 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

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

const SingleEmployeeDetails = () => {
  const { ordersAfterDate, numDays } = useGetOrdersAfterDate(); // This hook is not used in this component, but it can be useful for fetching orders after a specific date if needed
  const [searchParams] = useSearchParams(); // Using window.location.search to get search params
  const { userID } = useParams();
  const { singleEmployee = {} } = useGetSingleEmployee(userID);

  const { fullname: name } = singleEmployee; // Destructure to get the employee's name, or use an empty object if not found

  const data = ordersAfterDate?.filter(
    (order) => order?.soldBy?.employee_id === userID,
  );
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const PAGE_SIZE = 7; // Assuming 7 items per page for pagination

  const paginatedData =
    data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []; // Assuming 20 items per page
  const totalItems = data?.length;
  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div>
        <div className="flex items-center justify-between py-4">
          <MoveBackBtn />
          <Filter
            filterField="last"
            title={"Filter By"}
            Icon={FilterList}
            options={filterOptions}
          />{" "}
        </div>

        <div className="top flex flex-col flex-wrap gap-5 lg:flex-row">
          <SingleUserProfile title={"Employee"} />
          <div className="right sm:flex-[2]">
            <Chart
              aspect={3 / 2}
              title={`${name || "No name"} transactions`}
              orders={data}
              numDays={numDays}
            />
          </div>
        </div>
        <div className="bottom mt-8">
          <div>
            <div className="boxshadow rounded-md p-2 sm:p-5">
              <div className="w-full overflow-auto bg-white dark:bg-gray-100">
                <OrdersContainer
                  data={paginatedData}
                  count={totalItems}
                  headerContent={headerContent}
                  title={`${name} Latest transactions`}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployeeDetails;
