import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANB48wD_XvpkzqyFrINKvL9PEYpEefr10",
  authDomain: "note-app-52512.firebaseapp.com",
  projectId: "note-app-52512",
  storageBucket: "note-app-52512.firebasestorage.app",
  messagingSenderId: "170522748675",
  appId: "1:170522748675:web:cbe6fb73a1f92f9ac1eb36",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
