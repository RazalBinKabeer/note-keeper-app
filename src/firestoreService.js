import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const notesCollectionRef = collection(db, "notes");

// Add a Note
export const addNote = async (note) => {
  try {
    const docRef = await addDoc(notesCollectionRef, note);
    return { id: docRef.id, ...note };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

// Fetch All Notes
export const fetchNotes = async () => {
  try {
    const querySnapshot = await getDocs(notesCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Update a Note
export const updateNote = async (id, updatedNote) => {
  try {
    const noteDocRef = doc(db, "notes", id);
    await updateDoc(noteDocRef, updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

// Delete a Note
export const deleteNote = async (id) => {
  try {
    const noteDocRef = doc(db, "notes", id);
    await deleteDoc(noteDocRef);
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
