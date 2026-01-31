import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";

const DB_DISABLED_ERROR = "Database is not configured";

export async function createDocument(
  collectionName: string,
  docId: string,
  data: any
) {
  if (!db) {
    return { error: DB_DISABLED_ERROR };
  }
  
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDocument(collectionName: string, docId: string) {
  if (!db) {
    return { data: null, error: DB_DISABLED_ERROR };
  }
  
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    } else {
      return { data: null, error: "Document not found" };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: any
) {
  if (!db) {
    return { error: DB_DISABLED_ERROR };
  }
  
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteDocument(collectionName: string, docId: string) {
  if (!db) {
    return { error: DB_DISABLED_ERROR };
  }
  
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDocuments(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  if (!db) {
    return { data: null, error: DB_DISABLED_ERROR };
  }
  
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { data: documents, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

