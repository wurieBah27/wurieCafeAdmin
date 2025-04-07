import { DriveFolderUpload } from "@mui/icons-material";

const ImageUpload = ({ ImageUpload }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800`}
      >
        <div className="flex flex-col items-center justify-center">
          <DriveFolderUpload fontSize="small" />
          <p className="mb-2 mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={ImageUpload}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
