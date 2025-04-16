import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import useApplyDiscount from "../features/products/products_hooks/useApplyDiscount";
import { useEffect, useState } from "react";

const DiscountModal = ({
  productID,
  openModal,
  setOpenModal,
  onCloseModal,
  disAbledBtn,
  discountValue = 0,
  defaultName,
}) => {
  const [discount, setDiscount] = useState(0);
  const [discountName, setDiscountName] = useState("");

  const { applyDiscount, isPending } = useApplyDiscount();

  const setDiscountPercentage = () => {
    if (discount > 100) return toast.error("Discount cannot be more than 100%");
    if (discount < 0) return toast.error("Discount cannot be less than 0%");

    applyDiscount({
      id: productID,
      discount: +discount,
      disCountName: discountName,
    });
    setDiscount("");
    setOpenModal(false);
  };

  useEffect(() => {
    disAbledBtn(isPending);
  }, [isPending]);

  useEffect(() => {
    setDiscount(discountValue);
    setDiscountName(defaultName);
  }, [discountValue, defaultName]);

  return (
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
              defaultValue={discount}
              onChange={(event) => setDiscount(event.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="discountName">Offer Name </Label>
            </div>
            <TextInput
              id="discountName"
              type="text"
              placeholder="Eid Special"
              defaultValue={defaultName}
              onChange={(event) => setDiscountName(event.target.value)}
              required
            />
          </div>

          <div className="flex w-full flex-wrap items-center gap-4">
            <Button onClick={setDiscountPercentage} className="w-full">
              Add Discount
            </Button>

            <Button
              color="failure"
              onClick={() => setOpenModal(false)}
              className="w-full"
            >
              Cancel discount
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DiscountModal;
