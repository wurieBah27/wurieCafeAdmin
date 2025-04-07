import {
  Cabin,
  LocalDining,
  LocalShippingOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { Button } from "flowbite-react";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";

const OrderActions = ({
  status,
  itemID,
  showDeclineBtn = true,
  total,
  paymentStatus,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [isUpdate, setIsUpdate] = useState("");

  const handleUpdateStatus = (currStatus) => {
    setOpenModal(true);
    setCurrentStatus(currStatus);
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleStatus = (status) => setOpenModal(status);

  const handleModalConfirm = (state) => setIsUpdate(state);

  return (
    <div>
      <div className="my-4 flex flex-wrap items-center gap-3">
        <div className="w-full">
          <span>
            {status === "Delivering" && (
              <Button
                color="success"
                disabled={isUpdate}
                className="w-full"
                onClick={() => handleUpdateStatus("Delivered")}
              >
                <span className="flex items-center gap-2 text-xs">
                  <LocalShippingOutlined fontSize="small" />{" "}
                  <span className="text-nowrap">Delivering</span>
                </span>
              </Button>
            )}
            {/* {status === "Pending" && <Button color="failure">Pending</Button>} */}
            {status === "Pending" && (
              <Button
                color="failure"
                disabled={isUpdate}
                className="w-full"
                onClick={() => handleUpdateStatus("Approved")}
              >
                <span className="flex items-center gap-1">Pending</span>
              </Button>
            )}
            {status === "Processing" && (
              <Button
                color="warning"
                disabled={isUpdate}
                className="w-full"
                onClick={() => handleUpdateStatus("Delivering")}
              >
                <span className="flex items-center gap-2 text-xs">
                  <LocalDining fontSize="small" />{" "}
                  <span className="text-nowrap">Processing</span>
                </span>
              </Button>
            )}
            {status === "Approved" && (
              <Button
                className="w-full"
                disabled={isUpdate}
                onClick={() => handleUpdateStatus("Processing")}
              >
                <span className="flex items-center gap-2 text-xs">
                  <ThumbUpOutlined fontSize="small" />{" "}
                  <span className="text-nowrap">Approve</span>
                </span>
              </Button>
            )}
            {status === "Delivered" && (
              <Button
                color="success"
                className="w-full"
                disabled={isUpdate || status === "Delivered"}
              >
                <span className="flex items-center gap-2 text-xs">
                  <Cabin fontSize="small" />{" "}
                  <span className="text-nowrap">Delivered</span>
                </span>
              </Button>
            )}
          </span>
        </div>
        {showDeclineBtn && status !== "Delivered" && (
          <Button
            gradientDuoTone="pinkToOrange"
            className="w-full"
            disabled={isUpdate}
          >
            Decline Order <ThumbDownOutlined fontSize="small" />
          </Button>
        )}
      </div>
      <ConfirmModal
        openModal={openModal}
        setOpenModal={handleOpenModal}
        setCurrentStatus={handleStatus}
        total={total}
        currentStatus={currentStatus}
        itemID={itemID}
        paymentStatus={paymentStatus}
        setIsUpdate={handleModalConfirm}
      />
    </div>
  );
};

export default OrderActions;
