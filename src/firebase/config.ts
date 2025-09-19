import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

import { CONFIG } from "@src/constants/config";

// Initialize Firebase
const FirebaseApp = initializeApp(CONFIG.firebase);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
