import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getReviewsById = async ({ productId }) => {
  try {
    const reviewRef = collection(db, "ProductReviews");

    const q = query(reviewRef, where("menuItemId", "==", productId));

    const querySnapshot = await getDocs(q);

    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.log("Error fetching reviews: ", error);
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
};
