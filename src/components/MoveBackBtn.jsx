import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import useMoveBack from "../helpers/useMoveBack";

const MoveBackBtn = () => {
  const moveBack = useMoveBack();
  return (
    <>
      <button
        onClick={() => moveBack()}
        className="flex items-center justify-between gap-2 rounded-full p-3 text-2xl font-extrabold hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        <KeyboardBackspaceOutlined fontSize="" />
      </button>
    </>
  );
};

export default MoveBackBtn;
