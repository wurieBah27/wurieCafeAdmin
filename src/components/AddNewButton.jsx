import { AddOutlined } from "@mui/icons-material";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AddNewButton = ({ name, url }) => {
  const navigate = useNavigate();
  return (
    <span>
      <Button gradientDuoTone="purpleToBlue" onClick={() => navigate(url)}>
        <AddOutlined fontSize="small" /> <span>Add new {name}</span>
      </Button>
    </span>
  );
};

export default AddNewButton;
