export const customersColums = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "customer",
    headerName: "Customers",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src={params.row.img}
              alt="customer avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs font-bold text-gray-600 sm:text-sm">
            {params.row.userName}
          </span>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "age",
    headerName: "Age",
    width: 120,
  },
  {
    field: "totalPurchases",
    headerName: "Prrchases Amount",
    width: 100,
  },
  {
    field: "lastPurchaseAmount",
    headerName: "Last Amount",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

export const customersRows = [
  {
    id: 1,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "gshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
    lastPurchaseAmount: 78,
  },
  {
    id: 3,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "zshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
  },
  {
    id: 4,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "bshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
    lastPurchaseAmount: 78,
  },
  {
    id: 5,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "mshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
    lastPurchaseAmount: 78,
  },
  {
    id: 6,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "fshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
    lastPurchaseAmount: 78,
  },
  {
    id: 7,
    userName: "Snow_132",
    img: "https://media.istockphoto.com/id/2005016157/photo/phone-call-business-and-woman-with-a-computer-conversation-and-smile-with-project-and-talking.webp?a=1&b=1&s=612x612&w=0&k=20&c=5TswxAL28RWiEhW-Ir0EYY1gQBAJIb5dxv6FtpKYB6U=",
    status: "active",
    email: "wshsjydhhs@gmail.com",
    age: 45,
    totalPurchases: 1500,
    lastPurchaseAmount: 78,
  },
];
