import { db } from "../firebase-config";
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

export const updateBookStatus = async (bookIds, status) => {
  const batch = writeBatch(db);
  bookIds.forEach(async (id) => {
    const bookSnapshot = await query(
      booksCollectionRef,
      where("Serial", "==", id)
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
