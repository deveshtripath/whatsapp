import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB1EsFdaVAvqa237xVKn-mIUTYwv6rWOcE",
//     authDomain: "whatsapp-clone-a2d0b.firebaseapp.com",
//     projectId: "whatsapp-clone-a2d0b",
//     storageBucket: "whatsapp-clone-a2d0b.appspot.com",
//     messagingSenderId: "848731750304",
//     appId: "1:848731750304:web:e633570a12e66cbeb6eec5",
//     measurementId: "G-R4MPT5J4YL"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBkCbubRrPHNoByEzRF8MVFoEwlS2yNFkg",
    authDomain: "helpnow-fc475.firebaseapp.com",
    projectId: "helpnow-fc475",
    storageBucket: "helpnow-fc475.appspot.com",
    messagingSenderId: "411359761552",
    appId: "1:411359761552:web:02132f6aa55ad67244b415",
    measurementId: "G-8SLRYHEMJ9"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { auth, provider, storage };
export default db;