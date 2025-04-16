import { Link } from "react-router-dom";
import useGetSingleProduct from "./products_hooks/useGetSingleProduct";
import { dateConverter } from "../../helpers/dateConverter";
import MoveBackBtn from "../../components/MoveBackBtn";
import useGetReviewsById from "../Reviews/hooks/useGetReviewsById";
import SingleReview from "../../components/SingleReview";
import { Badge, Button, Rating, RatingStar } from "flowbite-react";
import { useState } from "react";

import Spinner from "../../ui/Spinner";
import DiscountModal from "../../components/DiscountModal";

const SingleProductDetails = () => {
  const { singleProduct, productID, isLoading } = useGetSingleProduct();
  const { reviewsData } = useGetReviewsById(productID);
  const [isPending, setIspending] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => setOpenModal(false);

  const {
    name,
    price,
    descriptions,
    imgUrls,
    createdAt,
    discountPercent = {},
  } = singleProduct || {};

  const { discount: discountValue = 0 } = discountPercent || {};

  const discountPrice = (discountValue / 100) * price;
  console.log(isPending);

  /* convert the firebase date to a human readadbe date format */
  const { seconds, nanoseconds } = createdAt || {};
  const created = dateConverter(seconds, nanoseconds);

  const handleDisableBtn = (state) => setIspending(state);

  const totalReviews = reviewsData?.length || 0;

  const averageRatings =
    totalReviews === 0
      ? 0
      : reviewsData?.reduce((acc, curr) => acc + curr?.rating, 0) /
        totalReviews;
  const averageReviewRatings = averageRatings?.toFixed(1) || 0;

  if (isLoading) return <Spinner />;
  return (
    <div>
      <MoveBackBtn />
      <div className="px-2 py-4 dark:bg-gray-600 sm:px-4 sm:py-8 md:py-16">
        <section className="">
          <div className="mx-auto max-w-screen-xl 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
                <img className="w-full" src={imgUrls?.at(0)} alt="" />
              </div>

              <div className="mt-6 sm:mt-8 lg:mt-0">
                <Badge color="gray" className="max-w-max">
                  Best seller
                </Badge>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  {name}
                </h1>
                <div className="mt-4 flex-wrap sm:flex sm:items-center sm:gap-4">
                  <div className="flex flex-wrap items-end gap-3 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                    <div>
                      <p className="text-sm">
                        Price: AED{" "}
                        <span>{(price - discountPrice)?.toFixed(2)}</span>
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-3 text-sm">
                        {" "}
                        {discountValue > 0 && (
                          <p className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400">
                            <span className="text-gray-500 line-through dark:text-gray-200">
                              AED {price}
                            </span>{" "}
                            <span className="text-lime-700 dark:text-lime-500">
                              {discountValue}% OFF
                            </span>
                          </p>
                        )}
                        <span>(Inc. VAT)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 sm:mt-0">
                    <Rating>
                      {Array.from({ length: 5 }, (_, index) => (
                        <RatingStar
                          key={index}
                          filled={index < averageRatings}
                        />
                      ))}
                      {/* <RatingStar /> */}
                    </Rating>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      ({averageReviewRatings})
                    </p>
                    <Link className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                      {totalReviews} Reviews
                    </Link>
                  </div>
                </div>

                <div className="my-6 flex items-center justify-center gap-2 sm:my-8 sm:flex sm:items-center sm:gap-4">
                  <Button
                    color="blue"
                    className="flex-1 cursor-pointer text-center uppercase"
                    size="xs"
                    disabled={isPending}
                  >
                    Edit
                  </Button>
                  <Button
                    color="failure"
                    className="flex-1 cursor-pointer text-center uppercase"
                    size="xs"
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                  <Button
                    color="success"
                    size="xs"
                    className="flex-1 cursor-pointer text-center uppercase"
                    onClick={() => setOpenModal(true)}
                    disabled={isPending}
                  >
                    {isPending ? "Adding..." : "Discount"}
                  </Button>
                </div>

                <p className="mt-3 text-sm font-extrabold text-gray-600 dark:text-white">
                  Created At: {created?.formattedDate}
                </p>
                <hr className="my-6 border-gray-200 dark:border-gray-800 md:my-8" />
                <p className="mb-6 text-gray-500 dark:text-gray-100">
                  {descriptions}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 antialiased lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
                Reviews ({totalReviews})
              </h2>
            </div>
            {totalReviews > 0 &&
              reviewsData?.map((data) => (
                <SingleReview data={data} key={data?.id} />
              ))}
          </div>
        </section>
      </div>
      <DiscountModal
        productID={productID}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onCloseModal={onCloseModal}
        disAbledBtn={handleDisableBtn}
        discountValue={discountValue}
      />
    </div>
  );
};

export default SingleProductDetails;
