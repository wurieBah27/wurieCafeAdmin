import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createEmployees } from "../employeesAPI/employeesAPI";

export const createUser = async ({ email, password, data }) => {
  if (!email || !password) return;
  const info = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;
      createEmployees({ data, id: user.uid });

      await sendEmailVerification(user);
      return user;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      throw new Error(errorCode, errorMessage);
    });

  return info;
};

export const userLogeedIn = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          user.admin = idTokenResult.claims.admin || null;
          user.isEmployee = idTokenResult.claims.isEmployee || false;
        });
        resolve(user);
      } else {
        reject("No user logged in");
      }
    });
  });
};

export const logout = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

export const logInWithEmailAndPassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

      if (error) throw new Error(errorMessage);
    });

  return email;
};
