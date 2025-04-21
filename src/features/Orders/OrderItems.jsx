import { useEffect } from "react";

const OrderItems = ({ order, setItemsTotalPrice }) => {
  const {
    category,
    name,
    unitPrice,
    image,
    options,
    totalPrice,
    specialNote,
    quantity,
  } = order;

  useEffect(() => {
    setItemsTotalPrice(totalPrice);
  }, [totalPrice, setItemsTotalPrice]);

  return (
    <div
      className="relative rounded-md px-4 py-8 shadow-lg sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          <li className="flex flex-col justify-between gap-2 md:flex-row">
            <div className="flex flex-col gap-3 sm:flex-row md:flex-row md:items-center">
              <div className="relative overflow-hidden">
                <img
                  src={image || image?.[0] || "/no-imgae.jpeg"}
                  alt=""
                  className="h-48 w-48 object-cover"
                />
                <h3 className="font- absolute right-0 top-0 flex items-center justify-center rounded-full bg-red-600 p-2 text-sm uppercase text-gray-900 dark:bg-red-300 dark:text-gray-800">
                  <span className="text-xs text-gray-50 dark:bg-gray-800 dark:text-gray-200">
                    {category || "75% OFF"}
                  </span>
                </h3>{" "}
              </div>

              <div className="flex-[3]">
                <h3 className="text-sm text-gray-900 dark:text-gray-400">
                  {name}
                </h3>{" "}
                <dl className="mt-0.5 flex flex-col space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <dd className="inline">
                      {options &&
                        Object.keys(options).map((key) => (
                          <div key={key} className="mr-1">
                            {options[key] !== null && (
                              <>
                                <dt className="mr-1 inline">{key}:</dt>
                                <dd className="inline">{options[key]}</dd>{" "}
                                {" ,"}
                              </>
                            )}{" "}
                          </div>
                        ))}
                    </dd>
                  </div>

                  <div className="flex gap-2">
                    <dt className="inline text-nowrap text-gray-900 dark:text-gray-400">
                      Quantity:
                    </dt>
                    <dd className="inline">{quantity}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="inline text-gray-900 dark:text-gray-400">
                      Notes:
                    </dt>
                    <dd className="inline italic text-gray-500">
                      {specialNote}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="inline text-nowrap text-gray-900 dark:text-gray-400">
                      Unit Price:
                    </dt>
                    <dd className="inline font-bold text-lime-700 dark:text-lime-400">
                      AED {unitPrice}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="inline text-nowrap text-gray-900 dark:text-gray-400">
                      Total Price:
                    </dt>
                    <dd className="inline font-bold text-lime-700 dark:text-lime-400">
                      AED {totalPrice}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderItems;
