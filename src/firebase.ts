// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFBqJzWJezbE2J97Nyh7pJOOFCXffiDqk",
  authDomain: "schoolmanagement-15c4c.firebaseapp.com",
  projectId: "schoolmanagement-15c4c",
  storageBucket: "schoolmanagement-15c4c.appspot.com",
  messagingSenderId: "1013284382103",
  appId: "1:1013284382103:web:fd1c33eaebfe07db3a50d2",
  measurementId: "G-MG09CR92D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);