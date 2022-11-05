// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsKrpd55ZXHLt0hwQ9XPQSZxE5DReVHqM",
  authDomain: "tcumobilelibrary.firebaseapp.com",
  projectId: "tcumobilelibrary",
  storageBucket: "tcumobilelibrary.appspot.com",
  messagingSenderId: "17886281452",
  appId: "1:17886281452:web:fa7f3f22dc4be7c6982fc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
