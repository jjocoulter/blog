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
export const firestore = firebase.firestore();
export const storage = firebase.storage();
