
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXTfrgOnBH2Eo6KUxofmCIyjPQ8Exfip0",
  authDomain: "pookie-wookie-fcdd9.firebaseapp.com",
  projectId: "pookie-wookie-fcdd9",
  storageBucket: "pookie-wookie-fcdd9.appspot.com",
  messagingSenderId: "513964269155",
  appId: "1:513964269155:web:f0166f6f9b15361e0be256",
  measurementId: "G-NW7YFB93S4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);