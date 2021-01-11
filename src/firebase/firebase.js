import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";

var firebaseConfig = {
  apiKey : process.env.REACT_APP_API_KEY,
  authDomain : process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL : process.env.REACT_APP_DB_URL,
  projectId : process.env.REACT_APP_PROJECT_ID,
  storageBucket : process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId : process.env.REACT_APP_SENDER_ID,
  appId : process.env.REACT_APP_APP_ID,
  measurementId : process.env.REACT_APP_MEAS_ID
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;