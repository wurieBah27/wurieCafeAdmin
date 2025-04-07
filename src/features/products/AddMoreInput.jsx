import { useState } from "react";

const AddMoreInput = ({
  categories,
  setCategories,
  showInput,
  title,
  options,
  id,
}) => {
  const [subCategory, setSubCategory] = useState(""); // Change to a scalar value
  const [subCategoryPrice, setSubCategoryPrice] = useState(""); // Change to a scalar value

  const addNewCat = () => {
    if (!subCategory) return;
    const newItem = {
      name: subCategory,
      price: +subCategoryPrice || "",
      id: Date.now(),
    };
    // Add newItem to categories
    setCategories((prevCategories) => [...prevCategories, newItem]);
    setSubCategory("");
    setSubCategoryPrice("");
  };

  /* delete coffee options */
  const deleteOptions = (name) => {
    const newItems = categories.filter((item) => item.id !== name);
    setCategories(newItems);
  };

  return (
    <div className="relative col-span-2 mt-5 w-full bg-gray-50 px-2 py-5 shadow-lg dark:bg-gray-600">
      {
        <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
          <div className="flex w-full flex-1 flex-col">
            <label
              htmlFor={id}
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              {title}
            </label>
            <select
              id={id}
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            >
              {options?.map((item, i) => (
                <option value={item} key={i} className="capitalize">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {showInput && (
            <div className="w-full flex-1">
              <label
                htmlFor="extrasprice"
                className="mb-2 block text-sm font-medium dark:text-white"
              >
                Price (Optional)
              </label>
              <input
                type="number"
                value={subCategoryPrice}
                onChange={(e) => setSubCategoryPrice(e.target.value)}
                name="extrasprice"
                id="extrasprice"
                className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="5"
                required=""
                min={1}
              />
            </div>
          )}
        </div>
      }
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span
          className="inline-block cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-xs font-bold text-white dark:bg-blue-500"
          onClick={addNewCat}
        >
          ADD NEW
        </span>
        {categories?.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center gap-1 rounded-lg bg-gray-200 p-2 text-gray-600"
          >
            <span
              className="absolute right-[-5%] top-[-40%] cursor-pointer text-xl font-bold text-red-600"
              onClick={() => deleteOptions(item?.id)}
            >
              x
            </span>
            <span>{item?.name}</span> {item.price && "="}{" "}
            <span>{item?.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMoreInput;
