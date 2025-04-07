import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const getSingleEmployee = async ({ id }) => {
  try {
    const docRef = doc(db, "Employees", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return {};
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default getSingleEmployee;
