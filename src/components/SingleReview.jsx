import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Rating, RatingStar } from "flowbite-react";

const SingleReview = ({ data = {} }) => {
  const { user = {}, comment, createdAt, rating, title } = data;
  const { name, profilePic } = user;
  const dateCreated = format(createdAt?.toDate(), "Pp");

  return (
    <article className="mb-3 rounded-lg bg-white p-2 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <div>
            <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src={profilePic}
                alt="Michael Gough"
              />
              {name}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={dateCreated} title="February 8th, 2022">
              {dateCreated}
            </time>
          </p>
        </div>

        <div
          id="dropdownComment1"
          className="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Report
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="my-2 flex items-center gap-2">
        <Rating>
          {Array.from({ length: 5 }, (_, index) => (
            <RatingStar key={index} filled={index < rating} />
          ))}
        </Rating>{" "}
        <span>{rating}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        <span className="block font-bold">{title}</span>
        <span>{comment}</span>
      </p>
      <div className="mt-4 flex items-center space-x-4">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            className="mr-1.5 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
    </article>
  );
};

export default SingleReview;
