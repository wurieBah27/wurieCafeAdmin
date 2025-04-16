import { LockOutlined, SearchOutlined } from "@mui/icons-material";

const SearchsInputs = ({
  type = "text",
  placeholder,
  value,
  handleOnchage,
}) => {
  return (
    <div className="relative rounded-md border border-gray-200">
      <label htmlFor="Search" className="sr-only">
        Search
      </label>

      <input
        type={type}
        defaultValue={value}
        id="Search"
        onChange={(e) => handleOnchage(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border-gray-200 bg-transparent py-2.5 pe-10 pl-3 shadow-sm outline-gray-400 dark:border-gray-400 sm:text-sm"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>
          {type === "text" && <SearchOutlined />}
          {type === "password" && <LockOutlined />}
        </button>
      </span>
    </div>
  );
};

export default SearchsInputs;
