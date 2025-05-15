import { Button, Checkbox, Label, Radio, TextInput } from "flowbite-react";
import { useState } from "react";

const AddOptions = ({ setAllOptions }) => {
  const [title, setTitle] = useState("");
  const [itemName, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [items, setItems] = useState([]);
  const showNewItems = () => {
    const newItems = {
      name: itemName,
      price: +price || 0,
      id: crypto.randomUUID(),
    };

    setItems((item) => [...item, newItems]);

    setName("");
    setPrice("");
  };

  const addNewItem = () => {
    const newItem = {
      title: title,
      isRequired: isChecked === "singleSelect" ? true : false,
      id: crypto.randomUUID(),
      items: items,
    };
    setAllOptions((option) => [...option, newItem]);
    setTitle("");
    setItems([]);
  };

  const deleteOptions = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <div className="col-span-2 rounded-lg bg-gray-200 p-5 shadow-xl dark:bg-gray-600 dark:text-gray-50">
      <div className="flex w-full flex-col gap-5">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" color="gray" value="Gray" />
          </div>
          <TextInput
            id="title"
            placeholder="Option/extra name"
            color="gray"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Radio
              id="singleSelect"
              name="accept"
              value="singleSelect"
              onChange={(e) => setIsChecked(e.target.value)}
            />
            <Label htmlFor="accept" className="flex">
              Required ?
            </Label>
          </div>
          <div>
            <Radio
              id="multiSelect"
              name="accept"
              value="multipleSelect"
              onChange={(e) => setIsChecked(e.target.value)}
            />
            <Label htmlFor="accept" className="flex">
              Multiple select?
            </Label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-600 p-4 dark:border-gray-400">
          <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row">
            <div className="w-full flex-[2]">
              <div className="mb-1 block">
                <Label htmlFor="name" color="gray" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Input Gray"
                color="gray"
                value={itemName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex-1">
              <div className="mb-1 block">
                <Label htmlFor="price" color="gray" value="Price" />
              </div>
              <TextInput
                id="price"
                type="number"
                value={price}
                placeholder="Input Gray"
                color="gray"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <Button color="success" onClick={showNewItems}>
            Add option
          </Button>
          {items.map((item, i) => (
            <ShowItems item={item} key={i} deleteOptions={deleteOptions} />
          ))}
        </div>
        <Button
          gradientDuoTone="purpleToBlue"
          onClick={addNewItem}
          disabled={!title ? true : false}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

function ShowItems({ item, deleteOptions }) {
  return (
    <div
      key={item.id}
      className="relative mx-2 mt-6 inline-block max-w-max items-center gap-1 rounded-lg bg-gray-200 p-2 text-gray-600"
    >
      <span
        className="absolute right-[-5%] top-[-40%] cursor-pointer text-xl font-bold text-red-600"
        onClick={() => deleteOptions(item?.id)}
      >
        x
      </span>
      <span>{item?.name}</span> {"="} <span>{item?.price}</span>
    </div>
  );
}

export default AddOptions;
