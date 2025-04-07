import { SearchOutlined } from "@mui/icons-material";

const SearchInput = ({ showSearch }) => {
  return (
    <div
      className={`${showSearch ? "flex" : "hidden"} absolute right-2 z-50 w-[50%] items-center bg-transparent md:static md:flex`}
    >
      <div className="relative w-full">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full rounded-md border border-gray-200 bg-transparent py-2.5 pe-10 pl-3 shadow-sm outline-offset-1 outline-[#7451f8] sm:text-sm dark:placeholder:text-gray-400"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <SearchOutlined fontSize="small" />
          </button>
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
