import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require("firebase/app-check");

const API_KEY = process.env.API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "sybers-books.firebaseapp.com",
  projectId: "sybers-books",
  storageBucket: "sybers-books.appspot.com",
  messagingSenderId: "706386815840",
  appId: "1:706386815840:web:dc1ae6a53b34cb88ef4c05",
  measurementId: "G-56S6BK0TZY",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("6LdMOJcjAAAAANU2m3jcWbDF_DNmZbLK8OgIwswB"),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });

//Deploy "firebase deploy --only hosting:sybersbooks"
//To run app locally via firebase CLI: "firebase emulators:start --only hosting"