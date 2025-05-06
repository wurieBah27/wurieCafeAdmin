import {
  EmailOutlined,
  FlagOutlined,
  MapOutlined,
  MoneyOutlined,
  PersonOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import { Accordion } from "flowbite-react";
import useGetSingleOrder from "./ordersHooks/useGetSingleOrder";
import Spinner from "../../ui/Spinner";

const SingleOrderDetailsFooter = function ({ itemsTotalPrice }) {
  const { singleOrder = {}, loadingOrder } = useGetSingleOrder();

  const {
    payment_status,
    payment_method,
    items,
    deliveyCharge,
    total,
    notes,
    tax,
    order_type,
    delivery_address = {},
    customer: { customerEmail, name, phone },
  } = singleOrder;

  const { country, state, street } = delivery_address;
  console.log(singleOrder);
  /* order calculations */
  const itemsLength = items?.length;

  /* customer information */

  if (loadingOrder) return <Spinner />;
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>Order Summary</Accordion.Title>
        <Accordion.Content>
          <div className="mb-2 text-gray-500 dark:text-gray-400">
            <div className="grid grid-cols-2 gap-2">
              <p className="col-span-2 w-max rounded-md bg-yellow-100 px-2 py-1 text-sm text-yellow-400 dark:text-yellow-700">
                Payment <span className="">{payment_status}</span>
              </p>
              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Payment Type <span></span>
                </span>
                <span className="capitalize">💵 {payment_method}</span>
              </div>

              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Order type <span></span>
                </span>
                <span className="text-red-400">{order_type}</span>
              </div>

              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Subtotal <span>({itemsLength} items)</span>
                </span>
                <span>AED {itemsTotalPrice}</span>
              </div>

              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Shipping Fee <span></span>
                </span>
                <span className="text-lime-400">AED {deliveyCharge}</span>
              </div>
              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Tax <span>(5%)</span>
                </span>
                <span className="">AED {tax.toFixed(2)}</span>
              </div>
              <div className="col-span-2 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <span className="">
                  Total <span></span>
                </span>
                <span className="">AED {`${total?.toFixed(2)}`}</span>
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Customer Information.</Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>
                <PersonOutlined fontSize="small" /> Name
              </span>
              <span>{name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>
                <EmailOutlined fontSize="small" /> Email
              </span>
              <span>{customerEmail}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>
                <PhoneAndroidOutlined fontSize="small" /> Phone
              </span>
              <span>{phone}</span>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Notes From Customer</Accordion.Title>
        <Accordion.Content>
          <p className="text-gray-500 dark:text-gray-400">{notes}</p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Shipping Address</Accordion.Title>
        <Accordion.Content>
          <div className="">
            <div className="flex flex-col gap-2 text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-between">
                <span>
                  <PersonOutlined fontSize="small" /> Recipient Name
                </span>
                <span>{name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  <FlagOutlined fontSize="small" /> Country
                </span>
                <span>{country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  <PhoneAndroidOutlined fontSize="small" /> Phone
                </span>
                <span>{phone}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <MapOutlined fontSize="small" /> Address
                </span>
                <span className="text-xs italic">{`${street}, ${state}`} </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  <EmailOutlined fontSize="small" /> Postal Code
                </span>
                <span>62704</span>
              </div>
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title>Terms & Conditions</Accordion.Title>
        <Accordion.Content>
          <div className="mb-2 text-gray-500 dark:text-gray-400">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              By using our services, you agree to the following terms and
              conditions:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                All orders are subject to availability and confirmation of the
                order price.
              </li>
              <li>
                Delivery times may vary according to availability and any
                guarantees or representations made as to delivery times are
                subject to any delays resulting from postal delays or force
                majeure for which we will not be responsible.
              </li>
              <li>
                In order to contract with our restaurant and coffee admin
                dashboard, you must be over 18 years of age and possess a valid
                credit or debit card issued by a bank acceptable to us.
              </li>
              <li>We retain the right to refuse any request made by you.</li>
              <li>
                When placing an order, you undertake that all details you
                provide to us are true and accurate, that you are an authorized
                user of the credit or debit card used to place your order and
                that there are sufficient funds to cover the cost of the goods.
              </li>
              <li>All prices advertised are subject to changes.</li>
            </ul>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default SingleOrderDetailsFooter;
