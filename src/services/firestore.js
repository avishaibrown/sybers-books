import { db } from "../firebase-config";
import { collection, query, where } from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");

const findByTitle = async (term) => {
  return query(booksCollectionRef, where("title1", "==", term));
};

const FirestoreService = {
  findByTitle,
};

export default FirestoreService;
