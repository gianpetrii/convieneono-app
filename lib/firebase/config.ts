// Firebase configuration - lazy loaded to prevent initialization errors
// This file exports null values when Firebase is not configured

import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase config is complete
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value !== undefined && value !== ""
);

// Export null values - Firebase is not configured
// To enable Firebase, add valid credentials to .env.local
export const app: FirebaseApp | null = null;
export const auth: Auth | null = null;
export const db: Firestore | null = null;
export const storage: FirebaseStorage | null = null;

if (typeof window !== "undefined" && !isFirebaseConfigured) {
  console.warn(
    "Firebase is not configured. Authentication features are disabled."
  );
}

