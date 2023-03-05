import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
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

export const updateBookStatus = async (
  bookIds,
  buyerEmail,
  orderNumber,
  status
) => {
  const batch = writeBatch(db);
  bookIds.forEach(async (id) => {
    const bookSnapshot = query(booksCollectionRef, where("SERIAL", "==", id));
    const retrievedDoc = await getDocs(bookSnapshot);
    if (!retrievedDoc.empty) {
      const bookRef = retrievedDoc.docs[0].ref;
      batch.update(bookRef, {
        STATUS: status,
        "BUYER EMAIL": buyerEmail,
        "ORDER NUMBER": orderNumber,
      });
      try {
        await batch.commit();
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.error(`No book with id ${id} was found.`);
    }
  });
};
