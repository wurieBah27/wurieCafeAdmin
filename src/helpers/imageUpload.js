import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../APIS/firebase/firebase";
import toast from "react-hot-toast";

const imageUpload = (pathUrl, file) => {
  const fileName = new Date().getTime() + Math.random() + file?.name;

  const storageRef = ref(storage, `${pathUrl}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject("Something went wrong" + error.message);
        toast.error(`Error While uploading image`);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
};

export default imageUpload;
