// src/services/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAim4PGkNJD6YkOs7Vqwi9vQKjK51r1-_A",
  authDomain: "indie-circuit.firebaseapp.com",
  projectId: "indie-circuit",
  storageBucket: "indie-circuit.firebasestorage.app",
  messagingSenderId: "454564080880",
  appId: "1:454564080880:web:e89933d343e94b647a6635"
};

// Initialize Firebase app (only once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth
export const auth = getAuth(app); // <-- export auth
