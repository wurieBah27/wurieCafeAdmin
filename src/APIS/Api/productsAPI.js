import imageUpload from "../../helpers/imageUpload";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

/* get all documents products from the database */
export const getAllProducts = async () => {
  try {
    let data = [];
    const q = query(collection(db, "Products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

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

/* create new products in database */

export const addNewProduct = async (data) => {
  let { data: product, file } = data;

  try {
    if (!file) {
      await addDoc(collection(db, "Products"), product);
    }

    if (file) {
      const pathUrl = "Products_images";
      // Upload each file and get the URL
      const uploadPromises = file.map((files) => imageUpload(pathUrl, files));
      // Wait for all the upload promises to resolve
      const urls = await Promise.all(uploadPromises);
      product = { ...product, imgUrls: urls };

      await addDoc(collection(db, "Products"), product);
    }

    //   upload all urls in the database
  } catch (error) {
    console.error("Error uploading data: ", error);
    throw new Error(`An occured while trying to upload data`);
  }
};

/* =========== DELETE A PRODUCT =============*/

export const deleteProduct = async (id) => {
  try {
    if (!id) return;
    await deleteDoc(doc(db, "Products", id));
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
};

export const getSingleProduct = async ({ id }) => {
  try {
    const docRef = doc(db, "Products", id);
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

/* edit product */

export const editProduct = async (data) => {
  let { id, file, product } = data;
  console.log(product);
  try {
    if (!file) {
      console.log("No file");
      await setDoc(doc(db, "Products", id), product);
    }

    if (file) {
      const pathUrl = "Products_images";
      // Upload each file and get the URL
      const uploadPromises = file.map((files) => imageUpload(pathUrl, files));
      // Wait for all the upload promises to resolve
      const urls = await Promise.all(uploadPromises);
      product = { ...product, imgUrls: urls };

      await setDoc(doc(db, "Products", id), product);
    }
  } catch (error) {
    console.error("Error uploading data: ", error);
    throw new Error(`An occured while trying to upload data`);
  }
};

export const addDiscount = async ({ id, discount, disCountName = "" }) => {
  try {
    if (discount < 0 || discount > 100 || !id) return;
    const docRef = doc(db, "Products", id);
    await updateDoc(
      docRef,
      // updateDoc is used to update the document in the database
      {
        discountPercent: {
          discount: discount,
          disCountName: disCountName,
          createdAt: serverTimestamp(),
        },
      },
    );
    return "Discount added successfully!";
  } catch (error) {
    console.log(error.message);
    throw new Error(`An occured while trying to add discount`);
  }
};
