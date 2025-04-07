import SingleTableRow from "../ui/SingleTableRow";

const rows = [
  {
    id: 114587,
    img: "https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=N9j4gJk9thsw2yE7Nby63i3X5xrLsoqd5eWMOw_hqdI=",
    customer: "John Smith hjsfvjhaj",
    date: "1 Mar 2024",
    productName: "Sapnish latte Sapnish latte",
    phone: "+971 55 123 4567",
    address: "Bld 35, Al ghawwas st, Al Mirfa, Western Region, Abu Dhabi",
    amount: 785,
    method: "Cash on delivery",
    status: "Pending",
  },
  {
    id: 1140587,
    img: "https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=N9j4gJk9thsw2yE7Nby63i3X5xrLsoqd5eWMOw_hqdI=",
    customer: "Memunatu",
    date: "1 Feb 2025",
    productName: "Dell",
    phone: "+971 55 123 4567",
    address: "Bld 35, Al ghawwas st, Al Mirfa, Western Region, Abu Dhabi",
    amount: 785,
    method: "Cash on delivery",
    status: "Approved",
  },
  {
    id: 140587,
    img: "https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=N9j4gJk9thsw2yE7Nby63i3X5xrLsoqd5eWMOw_hqdI=",
    customer: "Memunatu",
    date: "1 March",
    productName: "Dell",
    phone: "+971 55 123 4567",
    address: "Bld 35, Al ghawwas st, Al Mirfa, Western Region, Abu Dhabi",
    amount: 785,
    method: "Cash on delivery",
    status: "Approved",
    soldBy: "Employee",
  },
  {
    id: 11587,
    img: "https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=N9j4gJk9thsw2yE7Nby63i3X5xrLsoqd5eWMOw_hqdI=",
    customer: "Memunatu",
    date: "1 March",
    productName: "Dell",
    phone: "+971 55 123 4567",
    address: "Bld 35, Al ghawwas st, Al Mirfa, Western Region, Abu Dhabi",
    amount: 785,
    method: "Cash on delivery",
    status: "Delivery",
    soldBy: "Employee",
  },
  {
    id: 114057,
    img: "https://media.istockphoto.com/id/2025682392/photo/man-adult-caucasian-with-beard-and-eyeglasses-work-on-laptop-at-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=N9j4gJk9thsw2yE7Nby63i3X5xrLsoqd5eWMOw_hqdI=",
    customer: "Memunatu",
    productName: "V60",
    phone: "+971 55 123 4567",
    address: "Bld 35, Al ghawwas st, Al Mirfa, Western Region, Abu Dhabi",
    date: "1 March",
    amount: 785,
    method: "Bank transfer",
    status: "Delivered",
  },
];

const TailTable = ({ tableType }) => {
  return (
    <div>
      <div className="w-[400px]">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-gray-900 dark:bg-gray-700 dark:text-gray-400">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Tracking ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">Date</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Customer
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Product
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Phone No
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Amount
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Method
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium">
                Status
              </th>
              {tableType === "orders" && (
                <th className="whitespace-nowrap px-4 py-2 font-medium">
                  View details
                </th>
              )}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {rows.map((row) => (
              <SingleTableRow key={row.id} data={row} pathUrl={"orders"} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TailTable;
