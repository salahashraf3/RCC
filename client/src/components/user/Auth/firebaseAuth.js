import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7IKcl3aBBQRIok2d2D382Wrw7PXc4Cu4",
  authDomain: "rcc-project-aa2d3.firebaseapp.com",
  projectId: "rcc-project-aa2d3",
  storageBucket: "rcc-project-aa2d3.appspot.com",
  messagingSenderId: "458340281110",
  appId: "1:458340281110:web:5fda5ef482d164c7cfbe37",
  measurementId: "G-2CCXFY6BEE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase
