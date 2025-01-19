import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZAb7-CWE8IlOCsXcUgMUx5R-BmgR2VCM",
    authDomain: "taskopolis-ee46b.firebaseapp.com",
    projectId: "taskopolis-ee46b",
    storageBucket: "taskopolis-ee46b.firebasestorage.app",
    messagingSenderId: "233873220735",
    appId: "1:233873220735:web:632fe465ab23c8f8b40b4a",
    measurementId: "G-MC1LNPRPX9"
  };
//init app
firebase.initializeApp(firebaseConfig)
//init services

const projectFirestore = firebase.firestore()

export {projectFirestore}