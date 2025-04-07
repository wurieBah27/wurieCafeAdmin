import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getSettings = async () => {
  try {
    const docRef = doc(db, "settings", "os3Aqv6rfzoqUSrE58qn");
    const settingsRef = await getDoc(docRef);

    if (settingsRef.exists()) {
      return settingsRef.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return {};
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw new Error(error);
  }
};

export const updateSettings = async (settings) => {
  try {
    const docRef = doc(db, "settings", "os3Aqv6rfzoqUSrE58qn");

    setDoc(docRef, settings);
    return "Settings updated successfully!";
  } catch (error) {
    console.error("Error updating settings:", error);
    throw new Error(error);
  }
};
