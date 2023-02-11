import { db } from "../firebase-config";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");

export const findByCategory = async (term) => {
  const q = query(
    booksCollectionRef,
    where("category", ">=", term),
    where("category", "<=", term + "\uf8ff")
  );
  return await getDocs(q);
};

export const findByAuthor = async (term) => {
  const q = query(
    booksCollectionRef,
    where("authorSn", ">=", term),
    where("authorSn", "<=", term + "\uf8ff"),
    limit(200)
  );
  return await getDocs(q);
};

export const findByTitle = async (term) => {
  const q = query(
    booksCollectionRef,
    where("title1", ">=", term),
    where("title1", "<=", term + "\uf8ff"),
    limit(200)
  );
  return await getDocs(q);
};

export const findByIsbn = async (term) => {
  const q = query(booksCollectionRef, where("isbn", "==", term), limit(200));
  return await getDocs(q);
};
