import AddNewButton from "../components/AddNewButton";
import MoveBackBtn from "../components/MoveBackBtn";
import SearchsInputs from "../components/SearchsInputs";
import useGetEmployees from "../features/Employees/employees_hooks/useGetEmployees";
import EmployeesTable from "../features/Employees/EmployeesTable";
import Spinner from "../ui/Spinner";

const EmployeesList = () => {
  const { isGettingEmployees } = useGetEmployees();

  if (isGettingEmployees) return <Spinner />;
  return (
    <div>
      <div>
        <div>
          <div className="flex justify-between text-lg text-gray-500 sm:text-lg">
            <MoveBackBtn />
          </div>{" "}
          <div className="header mb-4 flex flex-wrap items-center justify-between gap-2 px-2 py-4 shadow-lg">
            <div className="flex-1">
              <SearchsInputs type="text" placeholder={"Search"} />
            </div>
            <AddNewButton name={"Employee"} url={"new"} />
          </div>
          <div className="employeesList boxshadow w-full overflow-auto rounded-md px-4 py-8">
            <EmployeesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
