import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  Auth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCf9PGFmtvLMiZm9lThYGE98l1tLC3z9s0",
  authDomain: "smart-notes-app-7a3c4.firebaseapp.com",
  projectId: "smart-notes-app-7a3c4",
  storageBucket: "smart-notes-app-7a3c4.appspot.com",
  messagingSenderId: "76976571095",
  appId: "1:76976571095:web:81fbe3fd7c9fb8fadba692",
  measurementId: "G-4JLDD98FMB",
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth once with AsyncStorage persistence
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (err) {
  // If already initialized, fallback to getAuth
  auth = getAuth(app);
}

export { app, auth };
