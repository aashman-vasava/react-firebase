import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtah07lk434_bZBv-is-iM6-5ruccjkRs",
  authDomain: "fir-course-4619f.firebaseapp.com",
  projectId: "fir-course-4619f",
  storageBucket: "fir-course-4619f.appspot.com",
  messagingSenderId: "826551859943",
  appId: "1:826551859943:web:90afafc70c9ae822bd0042",
  measurementId: "G-4PWNR1MGNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
