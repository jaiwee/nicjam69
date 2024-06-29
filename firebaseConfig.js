import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
getReactNativePersistence,
initializeAuth,
} from "firebase/auth/react-native";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseApp = initializeApp({
// enter your firebase project details
    apiKey: "AIzaSyCwS3duz2TpS3Tcn_AlrkWdtHAhZhFsvLk",
    authDomain: "nicjam69-cff9b.firebaseapp.com",
    projectId: "nicjam69-cff9b",
    storageBucket: "nicjam69-cff9b.appspot.com",
    messagingSenderId: "468743265102",
    appId: "1:468743265102:web:7eb4a4e747cf5deb6d9c1f"
});

export const auth = initializeAuth(firebaseApp, {
persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp)
export{ storage, db }
