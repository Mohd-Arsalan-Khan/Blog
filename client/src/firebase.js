// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e14fe.firebaseapp.com",
  projectId: "mern-blog-e14fe",
  storageBucket: "mern-blog-e14fe.appspot.com",
  messagingSenderId: "293552308201",
  appId: "1:293552308201:web:fcfa214cc602cc42c09578"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);