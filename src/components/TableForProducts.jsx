import {
  ContentCopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Button, DropdownItem } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { TableActions } from "./Dropdown";
import useDeleteProduct from "../features/products/products_hooks/useDeleteProduct";
import useCreateProduct from "../features/products/products_hooks/useCreateProduct";
import useGetReviewsById from "../features/Reviews/hooks/useGetReviewsById";

const TableForProducts = ({ data = {} }) => {
  const { id, imgUrls, name, price, is_available } = data;
  const { deletingItem } = useDeleteProduct();
  const { createProduct } = useCreateProduct();
  const navigate = useNavigate();

  const { reviewsData } = useGetReviewsById(id);

  const totalReviews = reviewsData?.length;
  const averageRatings =
    totalReviews === 0
      ? 0
      : reviewsData?.reduce((acc, curr) => acc + curr?.rating, 0) /
        totalReviews;

  const averageReviewRatings = averageRatings?.toFixed(1) || 0;

  const handleDuplicate = async () => {
    const newProduct = { ...data, name: `copy of ${name}` };
    delete newProduct?.id; // Remove the id to ensure a new document is created

    await createProduct({
      data: newProduct,
    });
  };

  return (
    <tr
      className={
        !is_available
          ? "bg-gray-100 opacity-55 dark:bg-gray-600 dark:text-gray-50"
          : ""
      }
    >
      <td
        className={`whitespace-nowrap bg-gray-100 py-2 pr-6 text-gray-700 dark:bg-gray-600 dark:text-gray-50`}
      >
        <span className="flex items-center gap-2 px-6 py-2">
          <img
            src={imgUrls?.at(0) || "/empty_camera.png"}
            alt="customer image"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-xs">{name}</span>
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-50">
        {price}
      </td>
      <td className="text-gry-700 whitespace-nowrap px-4 py-2 text-yellow-300">
        <div className="flex items-center">
          <StarOutlined fontSize="small" />

          <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
            {averageReviewRatings === "NaN" ? 0 : averageReviewRatings}
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
          <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
            {totalReviews || 0} reviews
          </span>
        </div>
      </td>

      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-50">
        {is_available ? <span>Available</span> : <span>Out of Stock</span>}
      </td>

      <td className="whitespace-nowrap">
        <Button color="blue" onClick={() => navigate(id)}>
          <VisibilityOutlined /> View
        </Button>
      </td>
      <td className="overflow-hidden text-ellipsis whitespace-nowrap px-8 py-2 text-gray-700 dark:text-gray-50">
        <TableActions>
          <DropdownItem onClick={() => navigate(`edit/${id}`)}>
            <span className="text-blue-800 dark:text-blue-400">
              <EditOutlined fontSize="small" /> Edit
            </span>
          </DropdownItem>
          <DropdownItem onClick={handleDuplicate}>
            <ContentCopyOutlined fontSize="small" /> Duplicate
          </DropdownItem>
          <DropdownItem onClick={() => deletingItem(id)}>
            <span className="text-red-500">
              <DeleteOutlined fontSize="small" /> Delete
            </span>
          </DropdownItem>
        </TableActions>
      </td>
      <td className="whitespace-nowrap bg-red-50 px-4 py-2 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-50">
        {id}
      </td>
    </tr>
  );
};

export default TableForProducts;
