import { DB } from "./firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const bookCollectionRef = collection(DB, "books");

class BookDataService {
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };
  updateBook = (id, newBookData) => {
    const bookDoc = doc(DB, "books", id);
    return updateDoc(bookDoc, newBookData);
  };
  deleteBook = (id) => {
    return deleteDoc(id);
  };
  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };
  getOneBook = (id) => {
    const bookDoc = doc(DB, "books", id);
    return getDocs(bookDoc);
  };
}

export default new BookDataService();
