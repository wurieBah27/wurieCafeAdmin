import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { useSearchParams } from "react-router-dom";

const Filter = ({ filterField, title, options, Icon }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilterValue =
    searchParams.get(filterField) || options.at(0).value;

  const handleClick = (value) => {
    searchParams.set(filterField, value);

    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => (
          <Button gradientDuoTone="greenToBlue" className="sm:px-5">
            <span className="mr-3">{title}</span> <Icon fontSize="small" />
          </Button>
        )}
      >
        {options.map((option) => (
          <DropdownItem
            onClick={() => handleClick(option.value)}
            key={option.value}
            disabled={option.value === currentFilterValue}
          >
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default Filter;
