import { Link } from "react-router-dom";
import useGetSingleProduct from "./products_hooks/useGetSingleProduct";
import { dateConverter } from "../../helpers/dateConverter";
import MoveBackBtn from "../../components/MoveBackBtn";
import useGetReviewsById from "../Reviews/hooks/useGetReviewsById";
import SingleReview from "../../components/SingleReview";
import {
  Badge,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Rating,
  RatingStar,
  TextInput,
} from "flowbite-react";
import { useState } from "react";

const SingleProductDetails = () => {
  const { singleProduct, productID } = useGetSingleProduct();
  const { reviewsData } = useGetReviewsById(productID);

  const [discount, setDiscount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => setOpenModal(false);

  const { name, price, descriptions, imgUrls, createdAt } = singleProduct || {};

  const discountPrice = (40 / 100) * price;

  /* convert the firebase date to a human readadbe date format */
  const { seconds, nanoseconds } = createdAt || {};
  const created = dateConverter(seconds, nanoseconds);

  const totalReviews = reviewsData?.length || 0;

  const averageRatings =
    totalReviews === 0
      ? 0
      : reviewsData?.reduce((acc, curr) => acc + curr?.rating, 0) /
        totalReviews;
  const averageReviewRatings = averageRatings?.toFixed(1) || 0;
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
                  <div className="flex items-end gap-3 text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                    <div>
                      <p className="text-sm">
                        Price: AED <span>{discountPrice}</span>
                      </p>
                    </div>
                    <div>
                      <div className="flex gap-3 text-sm">
                        {" "}
                        <p className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400">
                          <span className="text-gray-500 line-through">
                            AED {price}
                          </span>{" "}
                          <span className="text-lime-700">40% OFF</span>
                        </p>
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

                <div className="my-6 flex items-center gap-2 sm:my-8 sm:flex sm:items-center sm:gap-4">
                  <Badge
                    color="gray"
                    className="max-w-max cursor-pointer text-center"
                    size="xs"
                  >
                    Add to featured
                  </Badge>
                  <Badge
                    color="gray"
                    className="max-w-max cursor-pointer text-center"
                    size="xs"
                  >
                    Delete Product
                  </Badge>
                  <Badge
                    color="success"
                    className="max-w-max cursor-pointer text-center"
                    onClick={() => setOpenModal(true)}
                  >
                    Apply Discount
                  </Badge>
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
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add a discount to this product
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="discount">Discount in %</Label>
                </div>
                <TextInput
                  id="discount"
                  type="number"
                  placeholder="25%"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  required
                />
              </div>

              <div className="flex w-full items-center justify-center gap-4">
                <Button>Add discount</Button>
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  Cancel discount
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default SingleProductDetails;
