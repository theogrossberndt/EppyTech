"use client"

import { useContext, useEffect, useRef, useState, FormEvent, ReactElement } from 'react';
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

import {ContextProvider} from "@/app/appProvider.tsx";

export default function SignInPage(){
	const context = useContext(ContextProvider);
	const [visible, setVisible] = useState<boolean>(false);

	const signIn = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email: string = e.currentTarget?.elements?.email?.value;
		const password: string = e.currentTarget?.elements?.password?.value;
	}

	return (
		<main className={styles.bg}>
			<div className={styles.card}>
				<div className={styles.titleRow}>
					<ExportedImage
						src={logoImageStatic}
						alt="Eppy Tech Logo"
						style={{objectFit: 'contain', clipPath: 'circle()', height: '3rem', width: '3rem'}}
					/>
					<h1>Internal Tools</h1>
				</div>

				<form onSubmit={signIn}>
					<fieldset style={{border: 'none', paddingTop: '2rem'}}>
						<div className={styles.inputLine}>
							<input type="text" id="email" name="email" placeholder="Enter your email"/>
							<label htmlFor="email">
								<FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
							</label>
						</div>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingBottom: '2rem'}}>
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
						<div className={styles.inputLine}>
							<input type="submit" value="Sign In"/>
						</div>
					</fieldset>
				</form>
			</div>
		</main>
	);
}
