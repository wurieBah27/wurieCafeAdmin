import { Button, Label, Modal, Radio, ToggleSwitch } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useUpdateOrderStatus from "../features/Orders/ordersHooks/useUpdateOrderStatus";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function Component() {}

const ConfirmModal = ({
  openModal,
  setOpenModal,
  paymentStatus,
  setCurrentStatus,
  total,
  currentStatus,
  setIsUpdate,
  itemID,
}) => {
  const [switch1, setSwitch1] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { updateOrder, isSuccess } = useUpdateOrderStatus();
  const { singleEmployee, userUid } = getCurrentUser();

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentStatus("");
    setSwitch1(false);
  };

  useEffect(() => {
    setIsUpdate(isSuccess);
  }, [isSuccess]);

  const updateOrderStatus = (currStatus) => {
    if (
      currentStatus === "Delivered" &&
      paymentMethod === "" &&
      paymentStatus !== "Paid"
    ) {
      toast.error("Please select payment method");
      setSwitch1(true);

      return;
    } else if (switch1 && paymentMethod === "") {
      toast.error("Please select payment method");
      setSwitch1(true);

      return;
    }
    updateOrder({
      id: itemID,
      orderStatus: currStatus,
      payment_status: paymentMethod || "Pending",
      employeeInfo: {
        employeeID: userUid || "",
        employeeName: singleEmployee?.fullname || "",
        email: singleEmployee?.userEmail || "",
        employeePhone: singleEmployee?.userPhoneNumber || "",
      },
    });

    setOpenModal(false);
    setCurrentStatus("");
    setSwitch1(false);
  };
  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <div className="mb-5">
              <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to update this product status?
              </h3>

              <ToggleSwitch
                checked={switch1}
                label={
                  switch1
                    ? `I ${singleEmployee?.fullname || ""} has received
                    the sum of AED ${total?.toFixed(2)} from Jonh, ${paymentMethod}`
                    : "Bill Paid ?"
                }
                onChange={setSwitch1}
              />

              {switch1 && (
                <fieldset className="my-4 flex max-w-md flex-col justify-start gap-4 p-5 shadow-xl">
                  <legend className="block w-full font-bold">
                    Payment Method!
                  </legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="card"
                      name="paymentMethod"
                      value="Card payment"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="card">Card</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="cash"
                      name="paymentMethod"
                      value="Cash"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="cash">Card</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="transfer"
                      name="paymentMethod"
                      value="Bank-Transfer"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="transfer">Transfer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="credit"
                      name="paymentMethod"
                      value="On Credit"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Label htmlFor="credit">credit</Label>
                  </div>
                </fieldset>
              )}
            </div>

            <div className="flex justify-center gap-4 max-[380px]:flex-col">
              <Button
                color="success"
                onClick={() => updateOrderStatus(currentStatus)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="failure" onClick={() => handleCloseModal()}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmModal;
