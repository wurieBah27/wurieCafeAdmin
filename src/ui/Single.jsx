import { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import AddNewUserForm from "./AddNewUserForm";

const Single = ({ inputs, title, btnText }) => {
  const [image, setImage] = useState("");
  const [firebaseImage, setFirebaseImage] = useState([]);

  const imagePreview = (e) => {
    const files = e.target.files[0];
    const imageUrl = URL.createObjectURL(files);

    setFirebaseImage(() => [files]);
    setImage(imageUrl);
  };

  return (
    <div>
      <div>
        <div>
          <div className="newContainer">
            <div className="top mb-5 flex p-5 shadow-md">
              <h4 className="text-lg text-gray-500 sm:text-lg">{title}</h4>
            </div>
            <div className="bottom boxshadow flex flex-col rounded-md p-5 lg:flex-row">
              <div className="left mb-5 flex flex-1 items-center justify-center gap-4 pt-4 sm:mb-0 sm:items-start">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                  <img
                    className="h-full w-full object-cover"
                    src={image || "/empty_camera.png"}
                    alt="User Avatar"
                  />
                </div>
                <div className="flex h-14 w-28 items-center justify-center">
                  <ImageUpload ImageUpload={imagePreview} />
                </div>
              </div>
              <div className="right flex-[2]">
                <AddNewUserForm
                  inputs={inputs}
                  btnText={btnText}
                  imageFile={firebaseImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
