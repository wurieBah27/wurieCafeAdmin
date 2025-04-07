import {
  CakeOutlined,
  EmailOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import TableForEmployees from "../../components/TableForEmployees";
import useGetEmployees from "./employees_hooks/useGetEmployees";

const EmployeesTable = () => {
  const { employeesList } = useGetEmployees();

  return (
    <div>
      <div className="w-[400px]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-gray-900 dark:divide-gray-400 dark:bg-gray-700 dark:text-gray-50">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                <PersonOutlined /> Employee
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">
                <EmailOutlined /> Email
              </th>

              <th className="flex items-end gap-1 whitespace-nowrap px-4 py-2 font-medium">
                <CakeOutlined /> <span>Birthday</span>
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Phone #
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Address
              </th>
              <th className="max-w-2 overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 font-medium">
                Nationality
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">View</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">ID</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {employeesList?.map((row) => (
              <TableForEmployees key={row?.id} data={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
