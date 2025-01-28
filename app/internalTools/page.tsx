"use client"

import { useContext, useState, } from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
//import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from "@/app/lib/roundedButton.tsx";
import AnimatedIcon from "@/app/lib/animatedIcon.tsx";
import SnackBar from "@/app/lib/snackBar.tsx";

import { ContextProvider } from "@/app/appProvider.tsx";
import ProtectedPage from "@/app/lib/firebase/protectedPage.tsx";

import { signOut } from '@/app/lib/firebase/user.tsx';

import InventoryTable from "./lib/table.tsx";

export default function InternalTools(){
	const context = useContext(ContextProvider);
	const [snackBarContent, setSnackBarContent] = useState<>(null);

	const search = (e) => {
		e.preventDefault();
		console.log("searched!");
	}

	return (
		<ProtectedPage>
			<main className={styles.bg}>
				<div className={styles.header}>
					<h2>Inventory</h2>
					<RoundedButton onClick={() => signOut(context)} themed>
						Sign Out
					</RoundedButton>
				</div>
				<div className={styles.inventoryContent}>
					<form className={styles.searchBar} onSubmit={search}>
						<RoundedButton style={{marginRight: '0.5rem'}}>
							<FontAwesomeIcon icon={faSliders} className={styles.icon}/>
						</RoundedButton>
						<input type="text" id="searchField" placeholder="Search inventory..." className={styles.searchField}/>
						<label>
							<RoundedButton type="submit">
								<FontAwesomeIcon icon={faSearch} className={styles.icon}/>
							</RoundedButton>
						</label>
					</form>
					<InventoryTable/>
				</div>
				<SnackBar content={snackBarContent}/>
			</main>
		</ProtectedPage>
	);
}
