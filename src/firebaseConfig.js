import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCppJuOt-on1Y23uXpSNJg3HgPoDxTylsE",
  authDomain: "gestionnairetaches-dc64b.firebaseapp.com",
  projectId: "gestionnairetaches-dc64b",
  storageBucket: "gestionnairetaches-dc64b.firebasestorage.app",
  messagingSenderId: "523538599407",
  appId: "1:523538599407:web:34f11a34737dca3296ba1a",
  measurementId: "G-H5QY7K4N2L"
};
// const firebaseConfig = {
//   apiKey: "TON_API_KEY",
//   authDomain: "TON_PROJET.firebaseapp.com",
//   projectId: "TON_PROJECT_ID",
//   storageBucket: "TON_PROJECT.appspot.com",
//   messagingSenderId: "TON_SENDER_ID",
//   appId: "TON_APP_ID"
// };

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };