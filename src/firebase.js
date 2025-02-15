import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQ_-7GdOHgKUp5tnUensBN_aN9TAfPxcc",
  authDomain: "fishing-project-cc943.firebaseapp.com",
  projectId: "fishing-project-cc943",
  storageBucket: "fishing-project-cc943.firebasestorage.app",
  messagingSenderId: "581797717987",
  appId: "1:581797717987:web:73b63f320bcf0bff1622d6",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
