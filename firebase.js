import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuVTbPSxYfJjJTg--NSX_m4g82nE3wH5s",
  authDomain: "one-chat-c6664.firebaseapp.com",
  projectId: "one-chat-c6664",
  storageBucket: "one-chat-c6664.appspot.com",
  messagingSenderId: "1057966991056",
  appId: "1:1057966991056:web:8a9123d92785aff95e20d5",
  measurementId: "G-1H2H3C7N57"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
