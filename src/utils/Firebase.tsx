// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app'; 
import { getAuth } from "firebase/auth";
import 'firebase/auth';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsjfFUSOPGR33eyDLsohyO4F4rpnxr1CA",
  authDomain: "myproject-d319d.firebaseapp.com",
  projectId: "myproject-d319d",
  storageBucket: "myproject-d319d.appspot.com",
  messagingSenderId: "1041571832121",
  appId: "1:1041571832121:web:56efc5f8d08db3ee8f48e8",
  measurementId: "G-B2ZHS3554L"
};
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// const auth = firebase.auth();


export { firestore,auth };



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const db = getFirestore(app);
// export const storage = getStorage(app);
