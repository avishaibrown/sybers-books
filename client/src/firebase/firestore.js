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
    where("CATEGORY", "<=", term + "\uf8ff"),
    limit(150)
  );
  return await getDocs(q);
};

export const findByAuthor = async (term) => {
  const q = query(
    booksCollectionRef,
    where("AUTHOR", ">=", term),
    where("AUTHOR", "<=", term + "\uf8ff"),
    limit(150)
  );
  return await getDocs(q);
};

export const findByTitle = async (term) => {
  const q = query(
    booksCollectionRef,
    where("TITLE", ">=", term),
    where("TITLE", "<=", term + "\uf8ff"),
    limit(150)
  );
  return await getDocs(q);
};

export const findByIsbn = async (term) => {
  // Check uppercase ISBN and lowercase isbn
  const qUpper = query(booksCollectionRef, where("ISBN", "==", term), limit(50));
  const resUpper = await getDocs(qUpper);
  if (!resUpper.empty) return resUpper;

  const qLower = query(booksCollectionRef, where("isbn", "==", term), limit(50));
  return await getDocs(qLower);
};

export const updateBookStatus = async (
  bookIds,
  buyerEmail,
  orderNumber,
  status
) => {
  if (!bookIds || bookIds.length === 0) return;
  const batch = writeBatch(db);

  try {
    for (const id of bookIds) {
      const bookSnapshot = query(booksCollectionRef, where("SERIAL", "==", id), limit(1));
      const retrievedDoc = await getDocs(bookSnapshot);
      if (!retrievedDoc.empty) {
        const bookRef = retrievedDoc.docs[0].ref;
        batch.update(bookRef, {
          STATUS: status,
          "BUYER EMAIL": buyerEmail,
          "ORDER NUMBER": orderNumber,
        });
      } else {
        console.warn(`No book with serial ${id} found in Firestore.`);
      }
    }
    await batch.commit();
  } catch (error) {
    console.error("Failed to commit batch update for sold books:", error.message);
  }
};
