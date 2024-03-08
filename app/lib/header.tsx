'use client';

import Image from "next/image";
import styles from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

type HeaderProps = {
	selectedPage: number;
};

const Header = ({selectedPage}: HeaderProps): ReactElement => {
	const houseColor = selectedPage == 0 ? "#4977BB" : "#a4bbdd";
	const contactColor = selectedPage == 1 ? "#4977BB" : "#a4bbdd";
	return (
		<div className={styles.header}>
			<div className={styles.banner}>
				Call (203) 655-5177 for an appointment · Monday - Friday 8:30 am to 5:30 pm
			</div>
			<div className={styles.nav}>
				<Image
					src="/logo.jpg"
					alt="Eppy Tech Logo"
					height={80}
					width={300}
					priority
				/>
				<button className={styles.button} onClick={()=>{}}>FREE CONSULTATION</button>
				<div className={styles.navIcons}>
					<div className={styles.navIconButton} onClick={()=>{}}>
						<FontAwesomeIcon icon={faHouse} style={{color: houseColor, width: '2em', height: '2em'}}/>
						<span className={styles.tooltiptext}>Home</span>
					</div>
					<div className={styles.navIconButton} onClick={()=>{}}>
						<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor, width: '2em', height: '2em'}}/>
						<span className={styles.tooltiptext}>Contact Us</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;