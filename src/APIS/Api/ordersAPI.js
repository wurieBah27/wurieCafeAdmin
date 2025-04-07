import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getToday } from "../../helpers/helpers";
import { parseISO } from "date-fns";

/* get all orders of the shop */
export const getAllOrders = async () => {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "orders"));

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.createdAt instanceof Timestamp ||
        docData.updated_at instanceof Timestamp
      ) {
        docData.createdAt = docData.createdAt.toDate();
        docData.updated_at = docData.updated_at.toDate();
      }
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSingleOrder = async ({ id }) => {
  try {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("no such document was found");
      return {};
    }
  } catch (error) {
    console.log(error.message);
  }
};

/* update order status */

// import { doc, updateDoc } from "firebase/firestore";

export const updateOrderStatus = async ({
  id,
  orderStatus,
  employeeInfo = {},
  payment_status,
}) => {
  try {
    const docRef = doc(db, "orders", id);

    await updateDoc(docRef, {
      Order_status: orderStatus,
      payment_status: payment_status,
      updated_at: serverTimestamp(),
      soldBy: {
        employeeName: employeeInfo.employeeName,
        employee_id: employeeInfo.employeeID,
        employeePhone: employeeInfo.employeePhone,
      },
    });

    return "Order status updated successfully!";
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === "permission-denied") {
      throw new Error("Not an Admin.");
    }
  }
};

// Returns all orders that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export const getOrdersAfterDate = async (date) => {
  try {
    let data = [];
    const itemsCollection = collection(db, "orders");
    // Parse the ISO date string into a JavaScript Date object
    const startDate = parseISO(date);

    // Convert the start date to a Firebase Timestamp for comparison
    const startTimestamp = Timestamp.fromDate(startDate);

    const q = query(
      itemsCollection,
      where("createdAt", ">=", startTimestamp),
      orderBy("createdAt", "desc"), // Order by created_date descending (newest first)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.createdAt instanceof Timestamp ||
        docData.updated_at instanceof Timestamp
      ) {
        docData.createdAt = docData.createdAt.toDate();
        docData.updated_at = docData.updated_at.toDate();
      }
      data.push({ id: doc.id, ...docData });
    });

    return data;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
export const getTodayActivity = async () => {
  try {
    let data = [];
    const itemsCollection = collection(db, "orders");
    // Parse the ISO date string into a JavaScript Date object
    const startDate = parseISO(getToday());
    console.log(startDate);
    // Convert the start date to a Firebase Timestamp for comparison
    const startTimestamp = Timestamp.fromDate(startDate);
    const q = query(
      itemsCollection,
      where("createdAt", ">=", startTimestamp),
      orderBy("createdAt", "desc"), // Order by created_date descending (newest first)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (
        docData.createdAt instanceof Timestamp ||
        docData.updated_at instanceof Timestamp
      ) {
        docData.createdAt = docData.createdAt.toDate();
        docData.updated_at = docData.updated_at.toDate();
      }
      data.push({ id: doc.id, ...docData });
    });
    return data;
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
