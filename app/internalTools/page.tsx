"use client"

import { useContext, useState, } from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
//import { faLock } from '@fortawesome/free-solid-svg-icons'
//import { faEye } from '@fortawesome/free-solid-svg-icons'
//import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from "@/app/lib/roundedButton.tsx";
import AnimatedIcon from "@/app/lib/animatedIcon.tsx";
import SnackBar from "@/app/lib/snackBar.tsx";

import { ContextProvider } from "@/app/appProvider.tsx";
import ProtectedPage from "@/app/lib/firebase/protectedPage.tsx";

import { signOut } from '@/app/lib/firebase/user.tsx';

export default function InternalTools(){
	const context = useContext(ContextProvider);
	const [snackBarContent, setSnackBarContent] = useState<>(null);

	return (
		<ProtectedPage>
			<main className={styles.bg}>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
					Welcome
					<RoundedButton onClick={() => signOut(context)}>
						Sign Out
					</RoundedButton>
				</div>
				<SnackBar content={snackBarContent}/>
			</main>
		</ProtectedPage>
	);
}
