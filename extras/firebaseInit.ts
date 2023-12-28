// firebaseInit.ts
import firebase from "firebase/app";
import "firebase/storage";
import { firebaseConfig } from "../../assets/extras/firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storageBucket();
