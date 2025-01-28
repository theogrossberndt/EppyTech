'use client';

import { Fragment, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from "./footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";
import RoundedButton from '@/app/lib/roundedButton.tsx';

const Footer = (): React.ReactElement => {
	const [ popUpShowing, setPopUpShowing ] = useState<boolean>(false);
	const complianceRef = useRef<HTMLDivElement>();

	const closeModal = (e?: React.MouseEvent<HTMLElement>) => {
		if (complianceRef.current);
			complianceRef.current.focus();
		setPopUpShowing(false);
	}

	const keyListener = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key == 'Escape')
			closeModal();
		if (popUpShowing && e.key == 'Tab')
			e.preventDefault();
	}

	useEffect(() => {
		document.addEventListener('keydown', keyListener);
		return () => {
			document.removeEventListener('keydown', keyListener);
		}
	}, [popUpShowing, setPopUpShowing]);

	return (
		<Fragment>
			{popUpShowing && (<div>
				<div className={styles.popUpBg} onClick={closeModal}/>
				<div className={styles.popUpCard} role="dialog" aria-labelledby="cardTitle" aria-describedby="cardDesc">
					<div className={styles.popUpRowCentered} id="cardTitle">
						WCAG Compliance
					</div>
					<div id="cardDesc">
						We strive to adhere to current Web Content Accessibility Guidelines (WCAG) Level AA standards in an effort to provide an
						accessible website for all users. We have completed a manual audit of all content to assess and improve our compliance.
						This website does include third party widgets for which we cannot control compliance. If you have any
						feedback on our accessibility or cannot access certain content or features please call &nbsp;
						<Link className={styles.link} href="tel:203-655-5177">(203) 655-5177</Link>&nbsp; or email &nbsp;
						<Link className={styles.link} href="mailto:support@eppytech.com">support@eppytech.com</Link>&nbsp; and we will do our best
						to remediate any issues quickly and effectively, and provide any assistance or information directly.
					</div>
					<div className={styles.popUpRowCentered}>
						<RoundedButton onClick={closeModal} ref={(e: HTMLElement | null) => {
							if (e)
								e.focus();
						}}>Close</RoundedButton>
					</div>
				</div>
			</div>)}
			<footer className={styles.footer}>
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
							<FontAwesomeIcon icon={faLocationDot} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb', ariaLabel: "Location"}}/>
							<Link className={styles.link} href="http://maps.apple.com/?q=Eppy+Tech">100 Heights Road, Darien CT, 06820</Link>
						</div>
						<div className={styles.textLine}>
							<FontAwesomeIcon icon={faPhone} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb', ariaLabel: "Phone number"}}/>
							<Link className={styles.link} href="tel:203-655-5177">(203) 655-5177</Link>
						</div>
						<div className={styles.textLine}>
							<FontAwesomeIcon icon={faEnvelope} style={{width: '1.5rem', height: '1.5rem', color: '#4977bb', ariaLabel: "Email"}}/>
							<Link className={styles.link} href="mailto:support@eppytech.com">support@eppytech.com</Link>
						</div>
					</div>
					<div className={styles.linkList}>
						<Link href="/contact" className={styles.link}>CONTACT US</Link>
						<div className={styles.link} onClick={(e: React.MouseEvent<HTMLDivElement>) => setPopUpShowing(true)} tabIndex={0} ref={complianceRef}>COMPLIANCE</div>
						<Link href="/internalTools" className={styles.link}>INTERNAL TOOLS</Link>
					</div>
				</div>
			</footer>
		</Fragment>
	);
}

export default Footer;
