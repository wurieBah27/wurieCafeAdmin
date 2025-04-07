import { DeleteOutline } from "@mui/icons-material";

const ShowAllOptions = ({ array, name, deleteItem, itemID, deleteOption }) => {
  return (
    <div className="relative col-span-2 mt-5 bg-gray-200 p-4">
      <span
        className="absolute right-[-1%] top-[-20%] cursor-pointer text-2xl font-bold text-red-600"
        onClick={() => deleteOption(itemID)}
      >
        <DeleteOutline fontSize="large" />
      </span>{" "}
      <div>
        <h3>{name}</h3>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        {array.map((item) => (
          <div key={item.id}>
            <div className="relative mx-2 mt-6 inline-block max-w-max items-center gap-1 rounded-lg bg-gray-200 p-2 text-gray-600">
              <span
                className="absolute right-[-5%] top-[-40%] cursor-pointer text-xl font-bold text-red-600"
                onClick={() => deleteItem(itemID, item?.id)}
              >
                x
              </span>
              <span>{item?.name}</span> {item.price && "="}{" "}
              <span>{item?.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllOptions;
