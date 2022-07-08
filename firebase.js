import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAeWVtF8niJHtQJ9adB1jofZrOm0YD6qnQ",
    authDomain: "twitter-clone-85f76.firebaseapp.com",
    projectId: "twitter-clone-85f76",
    storageBucket: "twitter-clone-85f76.appspot.com",
    messagingSenderId: "383822305525",
    appId: "1:383822305525:web:c1aaffcdc4910cb2f44dbc"
  };
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };