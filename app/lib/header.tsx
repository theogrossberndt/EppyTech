'use client';

import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logo.jpg";

import styles from "./header.module.css";
import roundedStyles from "./roundedButton.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { AnimatePresence, motion } from 'framer-motion';

import AnimatedRoundedButton from '@/app/lib/animatedRoundedButton.tsx';
import ConditionallyClickableLink from '@/app/lib/conditionallyClickableLink.tsx';

import {ContextProvider} from "@/app/appProvider.tsx";

type HeaderProps = {
	selectedPage: number;
};

const Header = ({selectedPage}: HeaderProps): React.ReactElement => {
	const [expanded, setExpanded] = useState<{[key: string]: boolean}>({open: false, inProgress: false});
	const [routeTo, setRouteTo] = useState<string | null>(null);

	const router = useRouter();

	const houseColor = selectedPage == 0 ? "#4977BB" : "#a4bbdd";
	const contactColor = selectedPage == 1 ? "#4977BB" : "#a4bbdd";

	const context = useContext(ContextProvider);

	const transition={duration: 0.5, ease: [0.65, 0, 0.35, 1]};

	const animate = {
		opacity: 1,
		rotate: '0deg',
		transition: transition
	}

	const route = (path: string, e?: React.MouseEvent<HTMLElement>) => {
		e?.preventDefault();
		if (context && context.isMobile){
			setExpanded({open: false, inProgress: true});
			setRouteTo(path);
		} else
			router.push(path);
	}

	useEffect(() => {
		if (!expanded.inProgress && routeTo){
			setRouteTo(null);
			router.push(routeTo);
		}
	}, [expanded, routeTo, router]);

	if (!context)
		return (<div/>)

	return (
		<header className={styles.header} role="banner">
			<div className={styles.banner}>
				Call &nbsp;<Link href="tel:203-655-5177" style={{color: 'white'}}>(203) 655-5177</Link>&nbsp; for an appointment · Monday - Friday 8:30 am to 5:30 pm
			</div>
			{context.isMobile ? (
				<Fragment>
					<div className={styles.nav} aria-orientation="horizontal">
						<ConditionallyClickableLink className={styles.logoWrapper} href="/" aria-label="Eppy Tech Logo, Click to go home">
							<ExportedImage
								src={logoImageStatic}
								alt="Eppy Tech Logo"
								priority
								fill
								style={{cursor: "pointer", objectFit: 'contain'}}
								aria-hidden="true"
							/>
						</ConditionallyClickableLink>
						<AnimatedRoundedButton onClick={() => setExpanded(oldExpanded => ({open: !oldExpanded.open, inProgress: true}))} style={{width: '2rem', height: '2rem'}}
							aria-expanded={expanded.open} aria-controls="mobileMenu" aria-haspopup="true" id="menuButton" aria-label={expanded.open ? "Close navigation menu" : "Open navigation menu"}
						>
							<FontAwesomeIcon icon={faBars} style={{width: '2em', height: '2em', color: '#4977bb'}} aria-hidden="true"/>
							<FontAwesomeIcon icon={faCaretDown} style={{width: '2em', height: '2em', color: '#4977bb'}} aria-hidden="true"/>
						</AnimatedRoundedButton>
					</div>
					<AnimatePresence>
						{expanded.open && (
							<motion.nav animate={{height: 'auto', opacity: 1}} initial={{height: 0, opacity: 0}} exit={{height: 0, opacity: 0}} style={{overflow: 'hidden', width: '100%'}} transition={transition}
								onAnimationComplete={() => setExpanded(oldExpanded => ({open: oldExpanded.open, inProgress: false}))} aria-hidden="false" role="navigation" aria-label="Main menu"
							>
								<ul style={{listStyleType: 'none', padding: 0}} id="mobileMenu" aria-labelledby="menuButton">
									<div className={styles.hr} role="separator"/>
									<li className={styles.pageLabel}>
										<ConditionallyClickableLink href="/" onClick={(e: React.MouseEvent<HTMLElement>) => route("/", e)} style={{color: houseColor}} aria-current={selectedPage == 0}>
											<FontAwesomeIcon icon={faHouse} style={{color: houseColor}} aria-hidden="true"/>
											Home
										</ConditionallyClickableLink>
									</li>
									<li className={styles.pageLabel}>
										<ConditionallyClickableLink href="/contact" onClick={(e: React.MouseEvent<HTMLElement>) => route("/contact", e)} style={{color: contactColor}} aria-current={selectedPage == 1}>
											<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor}} aria-hidden="true"/>
											Contact Us
										</ConditionallyClickableLink>
									</li>
								</ul>
							</motion.nav>
						)}
					</AnimatePresence>
				</Fragment>
			) : (
				<div className={styles.nav} style={{paddingInline: '2vw'}} aria-orientation="horizontal">
					<ConditionallyClickableLink href="/" className={styles.logoWrapper} aria-label="Eppy Tech Logo, Click to go home">
						<ExportedImage
							src={logoImageStatic}
							alt="Eppy Tech Logo"
							priority
							fill
							style={{cursor: "pointer", objectFit: 'contain'}}
							aria-hidden="true"
						/>
					</ConditionallyClickableLink>
					<ConditionallyClickableLink href="/contact" className={[roundedStyles.roundedButton, styles.consultationButton].join(" ")}>
						FREE CONSULTATION
					</ConditionallyClickableLink>
					<nav role="navigation" aria-label="Main menu" style={{display: 'flex'}}>
						<ConditionallyClickableLink href="/" className={roundedStyles.roundedButton} style={{color: houseColor, height: '5rem'}} aria-current={selectedPage == 0}>
							<FontAwesomeIcon icon={faHouse} style={{color: houseColor, flexGrow: 1}} aria-hidden="true"/>
							Home
						</ConditionallyClickableLink>
						<ConditionallyClickableLink href="/contact" className={roundedStyles.roundedButton} style={{color: contactColor, height: '5rem', marginLeft: '1rem'}} aria-current={selectedPage == 1}>
							<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor, flexGrow: 1}} aria-hidden="true"/>
							Contact Us
						</ConditionallyClickableLink>
					</nav>
				</div>
			)}
		</header>
	);
}

export default Header;
