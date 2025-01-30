import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider , GithubAuthProvider} from 'firebase/auth';
const githubProvider = new GithubAuthProvider();

const firebaseConfig = {
    apiKey: "AIzaSyBZAb7-CWE8IlOCsXcUgMUx5R-BmgR2VCM",
    authDomain: "taskopolis-ee46b.firebaseapp.com",
    projectId: "taskopolis-ee46b",
    storageBucket: "taskopolis-ee46b.firebasestorage.app",
    messagingSenderId: "233873220735",
    appId: "1:233873220735:web:632fe465ab23c8f8b40b4a",
    measurementId: "G-MC1LNPRPX9",
    databaseURL: "https://taskopolis-ee46b-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
//init app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export {app, auth, googleProvider, githubProvider };
//init services

// const projectFirestore = firebase.firestore()

// export {projectFirestore}