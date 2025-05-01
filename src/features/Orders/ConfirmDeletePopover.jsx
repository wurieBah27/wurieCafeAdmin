import { WarningAmberOutlined } from "@mui/icons-material";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import useDeleteOrder from "./ordersHooks/useDeleteOrder";

const ConfirmDeletePopover = ({ setOpenModal, openModal, orderId }) => {
  const { deleteOrderById, isPending } = useDeleteOrder(orderId);

  const handleDelete = async () => {
    if (!orderId) return;
    await deleteOrderById(orderId);

    setOpenModal(false);
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <WarningAmberOutlined className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete()}
                disabled={isPending}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenModal(false)}
                disabled={isPending}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmDeletePopover;
