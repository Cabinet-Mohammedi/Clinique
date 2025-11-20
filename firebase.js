// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaituJimoLNpkMYvr1u4KJC8XEJgbrGZA",
  authDomain: "clinique-9f351.firebaseapp.com",
  databaseURL: "https://clinique-9f351-default-rtdb.firebaseio.com",
  projectId: "clinique-9f351",
  storageBucket: "clinique-9f351.appspot.com",
  messagingSenderId: "537502134144",
  appId: "1:537502134144:web:a7d0ba7fb48f97b2775b65"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
