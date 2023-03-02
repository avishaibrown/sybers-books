import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  limit,
  doc,
  writeBatch,
} from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");

export const findByCategory = async (term) => {
  const q = query(
    booksCollectionRef,
    where("CATEGORY", ">=", term),
    where("CATEGORY", "<=", term + "\uf8ff")
  );
  return await getDocs(q);
};

export const findByAuthor = async (term) => {
  const q = query(
    booksCollectionRef,
    where("AUTHOR", ">=", term),
    where("AUTHOR", "<=", term + "\uf8ff"),
    limit(200)
  );
  return await getDocs(q);
};

export const findByTitle = async (term) => {
  const q = query(
    booksCollectionRef,
    where("TITLE", ">=", term),
    where("TITLE", "<=", term + "\uf8ff"),
    limit(200)
  );
  return await getDocs(q);
};

export const findByIsbn = async (term) => {
  const q = query(booksCollectionRef, where("isbn", "==", term), limit(200));
  return await getDocs(q);
};

export const updateBookStatus = async (bookIds, status) => {
  const batch = writeBatch(db);
  bookIds.forEach(async (id) => {
    const bookSnapshot = await query(
      booksCollectionRef,
      where("SERIAL", "==", id)
    );
    const retrievedDoc = await getDoc(bookSnapshot);
    console.log("retrievedDoc.docs[0].ref", retrievedDoc.docs[0].ref);
    console.log("doc(booksCollectionRef, id)", doc(booksCollectionRef, id));
    if (!retrievedDoc.empty) {
      const bookRef = retrievedDoc.docs[0].ref;
      batch.update(bookRef, { status: status });
    } else {
      console.log(`No book with id ${id} was found.`);
    }
  });
  try {
    await batch.commit();
  } catch (error) {
    console.log("UPDATE BOOK STATUS error", error);
  }
};
