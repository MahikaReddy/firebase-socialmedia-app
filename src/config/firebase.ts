// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1RIthVijozTeRcPE-jLYm8B2R1AdOnyQ",
  authDomain: "react-social-media-b87e8.firebaseapp.com",
  projectId: "react-social-media-b87e8",
  storageBucket: "react-social-media-b87e8.appspot.com",
  messagingSenderId: "322597316707",
  appId: "1:322597316707:web:f3570af84a1031895ef056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider= new GoogleAuthProvider();
export const db = getFirestore(app);