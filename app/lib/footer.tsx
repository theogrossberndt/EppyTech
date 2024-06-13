'use client';

import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import styles from "./footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from '@/app/lib/roundedButton.tsx';
import AnimatedRoundedButton from '@/app/lib/animatedRoundedButton.tsx';
import ConditionallyClickableLink from '@/app/lib/conditionallyClickableLink.tsx';
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

import {ContextProvider} from "@/app/appProvider.tsx";

type RefFuncType = (element: HTMLDivElement) => void
type HeaderProps = {
	selectedPage: number;
	refFunc: RefFuncType;
};

const Header = ({selectedPage, refFunc}: HeaderProps): React.ReactElement => {
	const context = useContext(ContextProvider);

	if (!context)
		return (<div/>)

	return (
		<div className={styles.footer}>
			<div className={styles.topPane}>
				<div className={styles.logoWrapper}>
					<ExportedImage
						src={logoImageStatic}
						alt="Eppy Tech Logo"
						priority
						fill
						style={{objectFit: 'contain'}}
					/>
				</div>
				<div>
					<div className={styles.textLine}>
						<FontAwesomeIcon icon={faLocationDot} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb'}}/>
						100 Heights Road, Darien CT, 06820
					</div>
					<div className={styles.textLine}>
						<FontAwesomeIcon icon={faPhone} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb'}}/>
						(203) 655-5177
					</div>
					<div className={styles.textLine}>
						<FontAwesomeIcon icon={faEnvelope} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb'}}/>
						support@eppytech.com
					</div>
				</div>
				<div className={styles.linkList}>
					<Link href="/contactUs" className={styles.link}>CONTACT US</Link>
					<Link href="/ada" className={styles.link}>COMPLIANCE</Link>
					<Link href="/signIn" className={styles.link}>INTERNAL TOOLS</Link>
				</div>
			</div>
		</div>
	);
}

export default Header;

/*
						<button onClick={() => route("/")} className={[styles.roundedButton, styles.iconButton].join(' ')} style={{color: houseColor}}>
							<FontAwesomeIcon icon={faHouse} style={{color: houseColor}}/>
							Home
						</button>
						<button onClick={() => route("/contact")} className={[styles.roundedButton, styles.iconButton].join(' ')} style={{color: contactColor}}>
							<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor}}/>
							Contact Us
						</button>

*/
