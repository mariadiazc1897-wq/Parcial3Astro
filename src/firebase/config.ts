
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// nuevo
import { getAuth } from 'firebase/auth';
// fin nuevo

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ4cswXmQPYRx7oroFMIyYHVWV1f1Aqmk",
  authDomain: "astro-framework-auth.firebaseapp.com",
  projectId: "astro-framework-auth",
  storageBucket: "astro-framework-auth.firebasestorage.app",
  messagingSenderId: "1083750805542",
  appId: "1:1083750805542:web:18dc46efa12c238b2976e7",
  measurementId: "G-5X61CV8TBZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);



// esto se coloca
const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};