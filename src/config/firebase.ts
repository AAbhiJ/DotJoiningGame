import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//     apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   };
const firebaseConfig = {
  apiKey: "AIzaSyAJE0GCetwUmS4l8P2ZcCbJPxJBFQRjElI",
  appId: "1:389852313612:web:ec619032a10a506dbf1629",
  authDomain: "officialdb-4d2d4.firebaseapp.com",
  measurementId: "G-V24PMDBDSF",
  messagingSenderId: "389852313612",
  projectId: "officialdb-4d2d4",
  storageBucket: "officialdb-4d2d4.appspot.com",
};

if(!getApps()?.length){
    initializeApp(firebaseConfig);   
}
const auth = getAuth();
const db = getFirestore();
export {auth};
export {db};
  