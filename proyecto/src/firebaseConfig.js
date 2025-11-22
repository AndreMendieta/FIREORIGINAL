import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCw44cVbTreHyo4hJR8l_5BgRp6Zl_5RfQ",
  authDomain: "pokeapi-b0290.firebaseapp.com",
  projectId: "pokeapi-b0290",
  storageBucket: "pokeapi-b0290.firebasestorage.app",
  messagingSenderId: "296848054714",
  appId: "1:296848054714:web:f46736f5ecec500f21a583"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
