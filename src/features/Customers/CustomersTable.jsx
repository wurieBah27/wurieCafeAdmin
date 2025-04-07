import { TableActions } from "../../components/Dropdown";
import { DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  EmailOutlined,
  PersonOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import CustomersTableContent from "./CustomersTableContent";

// const actions = [
//   {
//     field: "actions",
//     headerName: "Actions",
//     width: 150,
//     renderCell: (params) => {
//       return (
//         <div className=" ">
//           <TableActions>
//             <DropdownItem>
//               <Link to={`/customers/${params.row.id}`}>View</Link>
//             </DropdownItem>
//             <DropdownItem onClick={() => console.log(params.row.id)}>
//               Delete
//             </DropdownItem>
//           </TableActions>
//         </div>
//       );
//     },
//   },
// ];

// const paginationModel = { page: 0, pageSize: 5 };

// const CustomersTable = ({ customersData }) => {
//   return (
//     <Paper
//       sx={{
//         height: 400,
//         width: "100%",
//         backgroundColor: "transparent",
//       }}
//     >
//       <DataGrid
//         rows={customersData}
//         columns={customersColums.concat(actions)}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </Paper>
//   );
// };

const CustomersTable = ({ customersData }) => {
  console.log(customersData);
  return (
    <div>
      <div className="w-[400px]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-gray-900 dark:divide-gray-400 dark:bg-gray-700 dark:text-gray-50">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                <PersonOutlined /> Customer
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">
                <EmailOutlined /> Email
              </th>

              <th className="flex items-center gap-1 whitespace-nowrap px-4 py-2 font-medium">
                <PhoneAndroidOutlined /> Phone
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Address
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Country
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">View</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {customersData?.map((row) => (
              <CustomersTableContent key={row?.id} data={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
