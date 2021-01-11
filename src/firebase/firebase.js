import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYtW0exSgik_v3ESrawfV6A8QfG6e94JQ",
  authDomain: "new-project-1143a.firebaseapp.com",
  projectId: "new-project-1143a",
  storageBucket: "new-project-1143a.appspot.com",
  messagingSenderId: "1059947234987",
  appId: "1:1059947234987:web:1c0a86106c460a10b559ee",
  measurementId: "G-C4RD75MEZQ"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
