import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import imageUpload from "../../helpers/ImageUpload";

export const createEmployees = async (data) => {
  try {
    let { data: employee, id } = data;
    const { img: file } = data?.data;

    if (!file) {
      await setDoc(doc(db, "Employees", id), { ...employee, img: "" });
    }
    if (file) {
      const pathUrl = "Employees_images";
      const uploadPromises = file.map((files) => {
        return imageUpload(pathUrl, files);
      });

      const urls = await Promise.all(uploadPromises);
      const updatedEmployee = { ...employee, img: urls };
      return await setDoc(doc(db, "Employees", id), { ...updatedEmployee });
    }
  } catch (error) {
    console.log(error);
  }
};
