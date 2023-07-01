// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//La app es una sola, le voy agregando funcionalidades como firestore, storage
const firebaseConfig = {
  apiKey: "AIzaSyCmtJXInSAIvcvWefnc6KDdl7WdzIDHOWw",
  authDomain: "bd-doctors-c6f5c.firebaseapp.com",
  projectId: "bd-doctors-c6f5c",
  storageBucket: "bd-doctors-c6f5c.appspot.com",
  messagingSenderId: "610396500531",
  appId: "1:610396500531:web:9fc4a2e64e2e68090fa946"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)  //funcionalidad storage
 export const bd = getFirestore(app)   //funcionalidad firestore
 export const auth = getAuth(app) //funcionalidad firestore