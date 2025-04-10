import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Button } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../helpers/constants";

const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page")); // Get the current page from URL or default to 1
  const totalPages = Math.ceil(count / PAGE_SIZE); // Assuming 07 items per page

  const nextPage = () => {
    const next = currentPage === totalPages ? currentPage : currentPage + 1; // Calculate the next page

    searchParams.set("page", next.toString()); // Update the page number in search params
    setSearchParams(searchParams); // Update the URL without reloading the page
  };

  const previousPage = () => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1; // Calculate the next page

    searchParams.set("page", previous.toString()); // Update the page number in search params
    setSearchParams(searchParams); // Update the URL without reloading the page
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-3 py-6 sm:flex-row">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-bold">
          {currentPage === 1 ? 1 : (currentPage - 1) * PAGE_SIZE}-
          {currentPage === totalPages ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-bold">{count}</span> results
      </p>
      <div className="flex items-center gap-4">
        <Button
          color="dark"
          size="xs"
          onClick={previousPage}
          disabled={currentPage === 1} // Disable if on the first page
        >
          <span className="flex items-center gap-1 px-2 font-bold">
            <ChevronLeft />
            <span>Previous</span>
          </span>
        </Button>

        <Button
          color="dark"
          size="xs"
          onClick={nextPage}
          disabled={currentPage === totalPages || count === 0}
        >
          <span className="flex items-center gap-1 px-2 font-bold">
            <span className="">Next</span>
            <ChevronRight />
          </span>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
