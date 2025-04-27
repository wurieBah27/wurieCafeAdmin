import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddMoreText from "./AddMoreText";

import MoveBackBtn from "../../components/MoveBackBtn";

import { useNavigate, useParams } from "react-router-dom";
import useGetSingleProduct from "./products_hooks/useGetSingleProduct";
import Spinner from "../../ui/Spinner";
import useEditProduct from "./products_hooks/useEditProduct";
import ShowAllOptions from "./ShowAllOptions";
import AddOptions from "./AddOptions";

const EditProducts = () => {
  const { productID } = useParams();
  const { singleProduct = {}, isLoading } = useGetSingleProduct();

  const navigate = useNavigate();
  const { editSingleProduct } = useEditProduct();

  const isProductEmpty = Object.keys(singleProduct).length === 0;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      instock: singleProduct?.is_available ? "true" : "false",
    },
  });

  const [categories, setCategories] = useState([]);

  const [notes, setNotes] = useState([]);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [allOptions, setAllOptions] = useState([]);

  useEffect(() => {
    if (!isProductEmpty) {
      reset({
        instock: singleProduct?.is_available ? "true" : "false",
        category: singleProduct?.category,
        name: singleProduct?.name,
        price: singleProduct?.price,
        description: singleProduct?.descriptions,
      });

      const { options, notes: message, subCategories } = singleProduct;

      setCategories(subCategories || []);

      setNotes(message);
      setAllOptions(options || []);
    }
  }, [singleProduct, isProductEmpty, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files;
    const arrayFile = Array.from(file).map((filess) => filess);

    setFile(arrayFile);
  };

  useEffect(() => {
    const photos = [];
    const previewImages = () => {
      file?.map((file) => {
        const urls = URL.createObjectURL(file);
        photos.push({ urls: urls });
      });
    };
    setImagePreview(photos);

    if (file) previewImages();
  }, [file]);

  const onSubmit = async (data) => {
    const docData = {
      ...singleProduct,
      name: data?.name?.trim(),
      price: data?.price,
      is_available: data?.instock === "true",
      descriptions: data?.description || null,
      notes: notes,
      options: allOptions,
      subCategories: categories,
      category: data.category?.trim().toLowerCase(),
      imgUrls: singleProduct?.imgUrls || [],
    };

    try {
      await editSingleProduct({
        product: docData,
        file: file,
        id: productID,
      });
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/products");
    }
  };

  const deleteItem = (id1, id2) => {
    const optionItem = allOptions.find((item) => item.id === id1);
    const deleteItem = optionItem.items.filter((item) => item.id !== id2);
    console.log(deleteItem);
    setAllOptions((op) => op.filter((item) => item.id !== id1));

    setAllOptions((item) => [...item, { ...optionItem, items: deleteItem }]);
  };

  const deleteOption = (id) => {
    setAllOptions((option) => option.filter((item) => item.id !== id));
  };

  if (isLoading) return <Spinner />;
  return (
    <div>
      <section className="bg-white text-gray-500 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
          <div className="mb-4 flex items-center justify-between">
            <MoveBackBtn />
            <h2 className="mb-4 text-xl font-bold dark:text-white">
              Edit {singleProduct?.name} product
            </h2>
          </div>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium dark:text-white"
                >
                  Product Name
                  {errors?.name && (
                    <p className="ml-4 inline-block text-xs text-red-400">
                      ({errors?.name.message})
                    </p>
                  )}{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  defaultValue={singleProduct.name}
                  id="name"
                  className={`block w-full rounded-lg border ${errors?.name ? "border-red-500" : "border-gray-300"} bg-gray-50 p-2.5 text-sm text-gray-900 outline-gray-400 focus:border-gray-600 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500`}
                  placeholder="Type product name"
                />
              </div>
              <div className="col-span-2 w-full">
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price{" "}
                  {errors?.price && (
                    <p className="ml-4 inline-block text-xs text-red-400">
                      ({errors?.price.message})
                    </p>
                  )}{" "}
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  {...register("price", {
                    required: "Price field is required",
                  })}
                  defaultValue={singleProduct?.price}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-gray-600 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 ${errors?.price ? "border-red-500" : "border-gray-300"}`}
                  placeholder="$2999"
                  required=""
                />
              </div>
              <div className="col-span-2 w-full sm:col-span-1">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  {...register("category", { required: true })}
                  defaultValue={singleProduct.category}
                  className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                >
                  <option value="">Select a category</option>
                  <option value="coffee">Coffee</option>
                  <option value="Chocolates">Chocolates</option>
                  <option value="Flowers">Flowers</option>
                </select>
              </div>
              <div className="col-span-2 w-full sm:col-span-1">
                <label
                  htmlFor="instock"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Available in stock
                </label>
                <select
                  id="instock"
                  {...register("instock", {
                    required: "This field is required",
                  })}
                  className="dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-500"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Out of stock</option>
                </select>
              </div>

              <AddMoreText
                title="Enter sub categories"
                id="setCategories"
                categories={categories}
                setCategories={setCategories}
              />
              <AddOptions
                allOptions={allOptions}
                setAllOptions={setAllOptions}
              />
              {allOptions?.map((option) => (
                <ShowAllOptions
                  key={option.id}
                  name={option?.title}
                  array={option?.items}
                  deleteItem={deleteItem}
                  itemID={option.id}
                  deleteOption={deleteOption}
                />
              ))}

              <div className="col-span-2 w-full"></div>

              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description{" "}
                  {errors?.description && (
                    <p className="ml-4 inline-block text-xs text-red-400">
                      ({errors?.description?.message})
                    </p>
                  )}{" "}
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Please enter a description about this item.",
                  })}
                  defaultValue={singleProduct.descriptions}
                  rows="8"
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500 ${errors?.description ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Your description here"
                ></textarea>
              </div>
              <AddMoreText
                title="Notes about the item"
                id="itemnotes"
                categories={notes}
                setCategories={setNotes}
              />

              {/* PRODUCT IMAGES UPLOAD */}
              <div className="col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/png, image/gig,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="imagePreview mt-3 flex flex-wrap items-center gap-2">
                  {imagePreview?.map((image, i) => (
                    <div className="h-12 w-12" key={i}>
                      <img
                        src={image?.urls}
                        alt="Product image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {singleProduct.imgUrls?.map((image, i) => (
                    <div className="h-12 w-12" key={i}>
                      <img
                        src={image}
                        alt="Product image"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:mt-6"
            >
              Edit {singleProduct?.name}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProducts;
