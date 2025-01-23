import { ContexType } from "@/app/appProvider";
import { onAuthStateChanged,
	setPersistence, browserLocalPersistence, browserSessionPersistence,
	signInWithEmailAndPassword, updatePassword
} from 'firebase/auth';

const registerAuthStateChanged = (context: ContexType, callback) => {
	onAuthStateChanged(context.auth, callback);
}

const signIn = async (context: ContextType, email: string, password: string, rememberMe: boolean) => {
	await setPersistence(context.auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
	const promise = signInWithEmailAndPassword(context.auth, email, password);
	promise.catch(error => {});
	return promise;
}

const changePassword = async (context: ContextType, newPassword: string) => {
	const promise = updatePassword(context.auth, newPassword);
	promise.catch((error) => {});
	return promise;
}

const signOut = (context: ContextType) => {
	context.auth.signOut();
}

export { signIn, signOut, changePassword, registerAuthStateChanged };
