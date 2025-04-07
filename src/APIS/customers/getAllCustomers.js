import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const getAllCustomers = async () => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "Customers"));

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

    throw new Error(error.message);
  }
};

export default getAllCustomers;
