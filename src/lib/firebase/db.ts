/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { logError, logInfo } from "@/utils/log";

export const addDocument = async (collectionName: string, data: object) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    logInfo("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    logError("Error adding document: ", e);
    return false;
    // throw e;
  }
};

export const getDocumentById = async (
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      logInfo("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      logInfo("No such document!");
    }
    return docRef;
  } catch (e) {
    logError("Error fetching document: ", e);
    return false;
    // throw e;
  }
};

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (e) {
    logError("Error fetching documents: ", e);
    return false;
    // throw e;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  newData: object
) => {
  try {
    await updateDoc(doc(db, collectionName, docId), newData);
  } catch (e) {
    logError("Error updating document", e);
    return false;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (e) {
    logError("Error deleting document", e);
    return false;
  }
};

export const getDocumentsByQuery = async (
  collectionName: string,
  fieldName: string,
  operator: WhereFilterOp,
  value: any
) => {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, operator, value)
    );
    const querySnapshot = await getDocs(q);

    const results: any[] = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    return results;
  } catch (e) {
    logError("Error querying documents: ", e);
    // throw e;
    return false;
  }
};

/* getDocumentsByQuery eg
const users = await getDocumentsByQuery('users', 'email', '==', 'john@example.com');

const users = await getDocumentsByQuery("users","age",">=",18);
*/
