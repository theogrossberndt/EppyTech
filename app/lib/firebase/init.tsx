import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAwoRIyDxp6oTHXrNochJ-NGrHkDc8tPSA",
	authDomain: "website-d2323.firebaseapp.com",
	databaseURL: "https://website-d2323-default-rtdb.firebaseio.com",
	projectId: "website-d2323",
	storageBucket: "website-d2323.firebasestorage.app",
	messagingSenderId: "115535900985",
	appId: "1:115535900985:web:ee1c8326ee5e08d057f8e8",
	measurementId: "G-ZBL6Y5KE3S"
};

// Initialize Firebase
let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth();

export { firebaseApp, auth };
