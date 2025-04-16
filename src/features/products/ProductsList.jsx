import { useState } from "react";
import AddNewButton from "../../components/AddNewButton";
import MoveBackBtn from "../../components/MoveBackBtn";
import SearchsInputs from "../../components/SearchsInputs";
import useProducts from "./products_hooks/useProducts";
import ProductsTable from "./ProductsTable";

const ProductsList = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const { products } = useProducts();
  const { data: productsData, isLoading } = products;

  const handleOnchange = (state) => setSearchedValue(state);

  const searchedArray = productsData?.filter((el) =>
    el?.name?.toLowerCase()?.includes(searchedValue?.toLowerCase()),
  );

  return (
    <div>
      <div>
        <div>
          <div className="detailsProducts">
            <div className="flex items-center justify-between">
              <MoveBackBtn />
            </div>

            <div className="header mb-4 flex flex-wrap items-center justify-between gap-2 px-2 py-4 shadow-lg">
              <div className="flex-1">
                <SearchsInputs
                  placeholder={"Search by names..."}
                  handleOnchage={handleOnchange}
                />
              </div>
              <div>
                <AddNewButton url={"new"} name={"product"} />
              </div>
            </div>
            <div className="w-full overflow-x-auto py-8 sm:px-4">
              <ProductsTable
                productsData={searchedArray}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
