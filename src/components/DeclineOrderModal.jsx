import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Textarea,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import getCurrentUser from "../features/Employees/employees_hooks/useGetCurrentUser";
import { useState } from "react";
import useUpdateOrderStatus from "../features/Orders/ordersHooks/useUpdateOrderStatus";

const DeclineOrderModal = ({
  openModal,
  setOpenModal,
  itemID,
  paymentStatus,
}) => {
  const { singleEmployee, userUid } = getCurrentUser();
  const { updateOrder, isSuccess } = useUpdateOrderStatus();

  const [declineReason, setDeclineReason] = useState("");

  const declineOrder = () => {
    updateOrder({
      id: itemID,
      orderStatus: "Declined",
      payment_status: paymentStatus || "pending",
      declineReason: declineReason || "No reason provided",
      employeeInfo: {
        employeeID: userUid || "",
        employeeName: singleEmployee?.fullname || "",
        email: singleEmployee?.userEmail || "",
        employeePhone: singleEmployee?.userPhoneNumber || "",
      },
    });

    setOpenModal(false);
    setDeclineReason("");
  };
  return (
    <div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to decline this order?
            </h3>
            <div>
              <div className="max-w-md text-left">
                <div className="mb-2 block">
                  <Label htmlFor="comment" color="failure">
                    Your reason
                  </Label>
                </div>
                <Textarea
                  id="comment"
                  placeholder="Leave a reason..."
                  required
                  color="failure"
                  rows={4}
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => declineOrder()}
                disabled={!declineReason.trim() || isSuccess}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenModal(false)}
                disabled={isSuccess}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeclineOrderModal;

("use client");
