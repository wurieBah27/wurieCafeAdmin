import { AddOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AddNewButton = ({ name, url }) => {
  const navigate = useNavigate();
  return (
    <span>
      <span className="hidden sm:inline-block">
        <Button gradientDuoTone="purpleToBlue" onClick={() => navigate(url)}>
          <AddOutlined fontSize="small" /> <span>Add new {name}</span>
        </Button>
      </span>

      <span className="sm:hidden">
        <Tooltip content={`Add new ${name}`}>
          <Button color="blue" outline pill onClick={() => navigate(url)}>
            <AddOutlined fontSize="small" />
          </Button>
        </Tooltip>
      </span>
    </span>
  );
};

export default AddNewButton;
