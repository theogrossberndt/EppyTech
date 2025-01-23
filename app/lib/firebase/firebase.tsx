// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged,
	setPersistence, browserLocalPersistence, browserSessionPersistence,
	signInWithEmailAndPassword, updatePassword
} from 'firebase/auth';

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

export { firebaseApp };

const auth = getAuth();
//console.log("auth initiated", auth, auth.currentUser);
//let user = auth.currentUser;

//onAuthStateChanged(auth, (newUser) => {
//	user = newUser;
//	console.log("auth state changed: ", user);
//})

const registerAuthStateChanged = (callback) => {
	onAuthStateChanged(auth, callback);
}

const signIn = async (email: string, password: string, rememberMe: boolean) => {
	await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
	const promise = signInWithEmailAndPassword(auth, email, password);
	promise.catch(error => {});
	return promise;
}

const changePassword = async (newPassword: string) => {
	const promise = updatePassword(auth, newPassword);
	promise.catch((error) => {});
	return promise;
}

export { signIn, changePassword, registerAuthStateChanged, auth };
