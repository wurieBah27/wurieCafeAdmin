import { collection, getDocs, limit, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getAllEmployees = async () => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "Employees"), limit(1));

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (docData.createdAt instanceof Timestamp) {
        docData.createdAt = docData.createdAt.toDate();
      }
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
// Compare this snippet from src/APIS/Api/productsAPI.js:
