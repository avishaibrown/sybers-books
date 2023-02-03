import { db } from "../firebase-config";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");

export const findByCategory = async (term) => {
  const q = query(
    booksCollectionRef,
    where("category", "==", term),
    limit(200)
  );
  return await getDocs(q);
};

export const findByAuthor = async (term) => {
  const q = query(
    booksCollectionRef,
    where("authorSn", "==", term),
    limit(200)
  );
  return await getDocs(q);
};

export const findByTitle = async (term) => {
  const q = query(booksCollectionRef, where("title1", "==", term), limit(200));
  return await getDocs(q);
};

export const findByIsbn = async (term) => {
  const q = query(booksCollectionRef, where("isbn", "==", term), limit(200));
  return await getDocs(q);
};
