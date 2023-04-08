import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "mock_key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "mock_domain",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "mock_id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "mock_sender_id",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "mock_app_id",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "mock_measurement_id",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

// Get all unique categories in the Books collection
// async function getUniqueCategories(db) {
//   let uniqueCategoryArr = new Set();
//   const booksRef = collection(db, "Books");
//   console.log("booksRef", booksRef);
//   const categoriesSnapshot = await getDocs(booksRef);
//   categoriesSnapshot.forEach((doc) => {
//     uniqueCategoryArr.add(doc.data().category);
//     uniqueCategoryArr.add(doc.data().category5);
//   });
//   return [...uniqueCategoryArr];
// }

// console.log(getUniqueCategories(db));

//Deploy "firebase deploy --only hosting:sybersbooks"
//To run app locally via firebase CLI: "firebase emulators:start --only hosting"
