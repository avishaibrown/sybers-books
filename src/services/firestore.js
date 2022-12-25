import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");

export const findByCategory = async (term) => {
  const q = query(booksCollectionRef, where("category", "==", term));
  return await getDocs(q);
};
