// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwS3duz2TpS3Tcn_AlrkWdtHAhZhFsvLk",
  authDomain: "nicjam69-cff9b.firebaseapp.com",
  projectId: "nicjam69-cff9b",
  storageBucket: "nicjam69-cff9b.appspot.com",
  messagingSenderId: "468743265102",
  appId: "1:468743265102:web:7eb4a4e747cf5deb6d9c1f"
};

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   });

// // const db = getFirestore(app);
// // const auth = getAuth(app);

export {auth};