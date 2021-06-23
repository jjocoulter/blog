import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM4z54SkTNwkVHKLT_GFwGx-XmxeanoFI",
  authDomain: "blog-a9f1c.firebaseapp.com",
  projectId: "blog-a9f1c",
  storageBucket: "blog-a9f1c.appspot.com",
  messagingSenderId: "61900767091",
  appId: "1:61900767091:web:27a44b26154dbefad58f06",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];

  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJson(doc) {
  const data = doc.data();
  return {
    ...data,
    // Firestore Timestamp not serializable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
