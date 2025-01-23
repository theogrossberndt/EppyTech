"use client"

import { useContext, useEffect, useRef, useState, FormEvent, ReactElement } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from "@/app/lib/roundedButton.tsx";
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";
import AnimatedIcon from "@/app/lib/animatedIcon.tsx";
import SnackBar from "@/app/lib/snackBar.tsx";
import FullScreenLoader from "@/app/lib/fullScreenLoader.tsx";

import { ContextProvider, getPathFromParams } from "@/app/appProvider.tsx";

import { auth, signIn, registerAuthStateChanged } from "@/app/lib/firebase/firebase.tsx";
import { User as FirebaseUser } from "firebase/auth";

export default function SignInPage(){
	const router = useRouter();

	const context = useContext(ContextProvider);
	const [visible, setVisible] = useState<boolean>(false);
	const [snackBarContent, setSnackBarContent] = useState<>(null);

	const searchParams = useSearchParams();

	const advance = (newUser: FirebaseUser) => {
		console.log("sign in user", newUser);
		if (newUser != null)
			router.replace(searchParams.has("redirect") ? getPathFromParams(searchParams) : '/internalTools');
	}

	useEffect(() => {
		registerAuthStateChanged(advance);
	}, []);

	if (!context)
		return (<FullScreenLoader/>);

	const handleSignIn = (e: React.SyntheticEvent<HTMLFormElement>) => {
		if (e == null || e.nativeEvent == null)
			return false;
		e.nativeEvent.preventDefault();

		const email: string = e.currentTarget?.elements?.email?.value;
		const password: string = e.currentTarget?.elements?.password?.value;
		const rememberMe: boolean = e.currentTarget?.elements?.rememberMe?.value;

		signIn(email, password, rememberMe).then((userCredentials) => {
//			console.log("Got user: ", user);
		}).catch(error => {
			console.log("error:", error.code);
			const codeLookups = {
				'auth/invalid-email': 'The email provided does not have an associated account',
				'auth/missing-password': 'Please provide a password',
				'auth/invalid-credential': 'Incorrect password!'
			};
			const errorMsg = codeLookups[error.code] || "A sign in error occured";
			setSnackBarContent({child: (
				<h4>
					{errorMsg}
				</h4>
			), timeout: 3000});
		});
	}

	return (
		<main className={styles.bg}>
			<div style={{minWidth: context.isMobile ? 'min(100%, 320px)' : 'min(100%, 900px)'}}>
				<div className={styles.card}>
					<div className={styles.titleRow}>
						<ExportedImage
							src={logoImageStatic}
							alt="Eppy Tech Logo"
							style={{objectFit: 'contain', clipPath: 'circle()', height: '3rem', width: '3rem', marginRight: '1rem'}}
						/>
						<h1>Internal Tools</h1>
					</div>

					<form onSubmit={handleSignIn}>
						<fieldset style={{border: 'none', paddingTop: '2rem'}}>
							<div className={styles.inputLine}>
								<input type="text" id="email" name="email" placeholder="Enter your email"/>
								<label htmlFor="email">
									<FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
								</label>
							</div>
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
								<div className={styles.inputLine} style={{flexGrow: '1'}}>
									<input type={visible ? "text" : "password"} id="password" name="password" placeholder="Enter your password"/>
									<label htmlFor="password">
										<FontAwesomeIcon icon={faLock} className={styles.icon}/>
									</label>
								</div>
								<div style={{cursor: 'pointer', paddingLeft: '1rem'}}>
									<AnimatedIcon style={{width: '2rem', height: '2rem'}} onClick={(e) => setVisible(oldVisible => !oldVisible)} selected={visible ? 0 : 1} tabIndex={0}>
										<FontAwesomeIcon icon={faEye} style={{width: '2rem', height: '2rem'}}/>
										<FontAwesomeIcon icon={faEyeSlash} style={{width: '2rem', height: '2rem'}}/>
									</AnimatedIcon>
								</div>
							</div>
							<div style={{display: 'flex', paddingBottom: '2rem', paddingTop: '1rem', flexDirection: 'row', justifyContent: 'start'}}>
								<input type="checkbox" id="rememberMe" name="rememberMe" style={{flexGrow: 0, marginLeft: '3rem', marginRight: '1rem'}}/>
								<label htmlFor="rememberMe">
									Remember Me
								</label>
							</div>
							<div className={styles.inputLine}>
								<input type="submit" value="Sign In"/>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
			<SnackBar content={snackBarContent}/>
		</main>
	);
}
