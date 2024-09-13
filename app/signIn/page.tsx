"use client"

import { useContext, useEffect, useRef, useState, FormEvent, ReactElement } from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from "@/app/lib/roundedButton.tsx";
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

import {ContextProvider} from "@/app/appProvider.tsx";

export default function SignInPage(){
	const context = useContext(ContextProvider);

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

				<form>
					<fieldset style={{border: 'none'}}>
						<div className={styles.inputLine}>
							<input type="text" id="email" name="email" placeholder="Enter your email"/>
							<label htmlFor="email">
								<FontAwesomeIcon icon={faEnvelope} className={styles.icon}/>
							</label>
						</div>
						<div className={styles.inputLine} style={{paddingBottom: '2.5rem'}}>
							<input type="text" id="password" name="password" placeholder="Enter your password"/>
							<label htmlFor="password">
								<FontAwesomeIcon icon={faLock} className={styles.icon}/>
							</label>
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
