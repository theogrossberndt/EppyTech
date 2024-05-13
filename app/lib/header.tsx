'use client';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logo.jpg";
import styles from "./header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion';
import RoundedButton from '@/app/lib/roundedButton.tsx';
import AnimatedRoundedButton from '@/app/lib/animatedRoundedButton.tsx';

import {ContextProvider} from "@/app/appProvider.tsx";

type RefFuncType = (element: HTMLDivElement) => void
type HeaderProps = {
	selectedPage: number;
	refFunc: RefFuncType;
};

const Header = ({selectedPage, refFunc}: HeaderProps): React.ReactElement => {
	const [expanded, setExpanded] = useState<>({open: false, inProgress: false});
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

	const inOut1 = {
		opacity: 0,
		rotate: '180deg',
		transition: transition
	}

	const inOut2 = {
		opacity: 0,
		rotate: '-180deg',
		transition: transition
	}

	const route = (path) => {
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
	}, [expanded, routeTo]);

	if (!context)
		return (<div/>)

/*
						<button className={styles.roundedButton} onClick={()=> setExpanded(oldExpanded => ({open: !oldExpanded.open, inProgress: true}))}>
							<div style={{width: '2em', height: '2em', position: 'relative'}}>
								<AnimatePresence initial={false}>
									{expanded.open ? (
										<motion.div animate={animate} initial={inOut1} exit={inOut1} key={0} style={{position: 'absolute'}}>
											<FontAwesomeIcon icon={faCaretDown} style={{width: '2em', height: '2em', color: '#4977bb'}}/>
										</motion.div>
									) : (
										<motion.div animate={animate} initial={inOut2} exit={inOut2} key={1} style={{position: 'absolute'}}>
											<FontAwesomeIcon icon={faBars} style={{width: '2em', height: '2em', color: '#4977bb'}}/>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</button>
*/

	return (
		<div className={styles.header} ref={refFunc}>
			<div className={styles.banner}>
				Call (203) 655-5177 for an appointment · Monday - Friday 8:30 am to 5:30 pm
			</div>
			{context.isMobile ? (
				<Fragment>
					<div className={styles.nav}>
						<div className={styles.logoWrapper}>
							<ExportedImage
								src={logoImageStatic}
								alt="Eppy Tech Logo"
								priority
								onClick={() => router.push("/")}
								fill
								style={{cursor: "pointer", objectFit: 'contain'}}
							/>
						</div>
						<AnimatedRoundedButton onClick={() => setExpanded(oldExpanded => ({open: !oldExpanded.open, inProgress: true}))} style={{width: '2rem', height: '2rem'}}>
							<FontAwesomeIcon icon={faBars} style={{width: '2em', height: '2em', color: '#4977bb'}}/>
							<FontAwesomeIcon icon={faCaretDown} style={{width: '2em', height: '2em', color: '#4977bb'}}/>
						</AnimatedRoundedButton>
					</div>
					<AnimatePresence>
						{expanded.open && (
							<motion.div animate={{height: 'auto', opacity: 1}} initial={{height: 0, opacity: 0}} exit={{height: 0, opacity: 0}} style={{overflow: 'hidden'}} transition={transition}
								onAnimationComplete={() => setExpanded(oldExpanded => ({open: oldExpanded.open, inProgress: false}))}
							>
								<div className={styles.hr}/>
								<div className={styles.pageLabel} onClick={() => route("/")} style={{color: houseColor}}>
									<FontAwesomeIcon icon={faHouse} style={{color: houseColor}}/>
									Home
								</div>
								<div className={styles.pageLabel} onClick={() => route("/contact")} style={{color: contactColor}}>
									<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor}}/>
									Contact Us
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</Fragment>
			) : (
				<div className={styles.nav}>
					<ExportedImage
						src={logoImageStatic}
						alt="Eppy Tech Logo"
						height={80}
						width={300}
						priority
						onClick={() => route("/")}
						style={{cursor: "pointer"}}
					/>
					<button className={styles.consultationButton} onClick={() => route("/contact")}>FREE CONSULTATION</button>
					<div style={{display: 'flex'}}>
						<RoundedButton onClick={() => route("/")} style={{color: houseColor, marginLeft: '1rem', height: '5rem'}} tooltip={'Home'}>
							<FontAwesomeIcon icon={faHouse} style={{color: houseColor, flexGrow: 1}}/>
						</RoundedButton>
						<RoundedButton onClick={() => route("/contact")} style={{color: contactColor, marginLeft: '1rem', height: '5rem'}} tooltip={'Contact Us'}>
							<FontAwesomeIcon icon={faPaperPlane} style={{color: contactColor, flexGrow: 1}}/>
						</RoundedButton>
					</div>
				</div>
			)}
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
