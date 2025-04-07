import { useForm } from "react-hook-form";
import useUser from "../features/Employees/employees_hooks/useUser";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import DatePicker from "./DatePicker";

const AddNewUserhtmlForm = ({ inputs, btnText, imageFile }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //wecivih383@fanicle.com

  const { signUpUser } = useUser();

  const onSubmit = async (data) => {
    try {
      const {
        userEmail,
        confirmUserPassword,
        userBirthday,
        userAddress,
        fullname,
        userPhoneNumber,
        userName,
        nationality,
      } = data;

      const userInfo = {
        userEmail,
        userBirthday,
        userAddress,
        fullname,
        userPhoneNumber,
        userName,
        nationality,
      };

      const res = await signUpUser({
        email: userEmail,
        password: confirmUserPassword,
        data: { ...userInfo, img: imageFile, createdAt: serverTimestamp() },
      });

      navigate("/users");
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-6 bg-white dark:bg-gray-700">
      <div className="lg:py mx-auto max-w-2xl px-0 pb-8 sm:px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-500 dark:text-white">
          Employee Informations
        </h2>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {inputs.map((input) => (
              <div className={input.colSpan} key={input.id}>
                <label
                  htmlFor={input.id}
                  className="mb-2 block text-sm font-medium text-gray-600"
                >
                  {input.label}{" "}
                  {errors?.input?.id && (
                    <p className="ml-4 inline-block text-xs text-red-400">
                      ({errors?.input?.id?.message})
                    </p>
                  )}{" "}
                </label>
                <input
                  type={input.type}
                  name={input.id}
                  {...register(`${input.id}`, {
                    required: ` ${input.label}  is required`,
                  })}
                  id={input.id}
                  className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm outline-gray-300 ${errors?.input?.id ? "border border-red-300 focus:border-red-600" : "border border-gray-300 focus:border-gray-600"} text-gray-900 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500`}
                  placeholder={input.placeholder}
                  required=""
                />
              </div>
            ))}

            <div className="w-full">
              <label
                htmlFor="userPassword"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Password{" "}
                {errors?.userPassword && (
                  <p className="ml-4 inline-block text-xs text-red-400">
                    ({errors?.userPassword?.message})
                  </p>
                )}{" "}
              </label>
              <input
                type="password"
                name="userPassword"
                {...register(`userPassword`, {
                  required: "Product name is required",
                })}
                id="userPassword"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-600 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                placeholder="fh14k"
              />
            </div>
            <DatePicker />
            <div className="w-full">
              <label
                htmlFor="confirmUserPassword"
                className="mb-2 block overflow-hidden text-ellipsis text-sm font-medium text-gray-900 sm:text-nowrap sm:text-[10px]"
              >
                <span>Confirm Password</span>{" "}
                {errors?.confirmUserPassword && (
                  <p className="inline-block text-xs text-red-400">
                    ({errors?.confirmUserPassword?.message})
                  </p>
                )}{" "}
              </label>
              <input
                type="password"
                name="confirmUserPassword"
                {...register(`confirmUserPassword`, {
                  required: "You have to confirm password",
                  validate: (value) =>
                    value === getValues()?.userPassword ||
                    "Passwords do not match.",
                })}
                id="confirmUserPassword"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-gray-600 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                placeholder="fh14k"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 sm:mt-6"
          >
            {btnText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewUserhtmlForm;
