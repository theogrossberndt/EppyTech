'use client';

import { Fragment, useState } from 'react';
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
	const toggleShowing = (e: React.MouseEvent<HTMLElement>) => setPopUpShowing((oldShowing: boolean) => !oldShowing)
	return (
		<Fragment>
			{popUpShowing && (<div>
				<div className={styles.popUpBg} onClick={toggleShowing}/>
				<div className={styles.popUpCard}>
					<div className={styles.popUpRowCentered}>
						WCAG Compliance
					</div>
					<div>
						We strive to adhere to current Web Content Accessibility Guidelines (WCAG) Level AA standards in an effort to provide an
						accessible website for all users. We have completed a manual audit of all content to assess and improve our compliance.
						This website does include third party widgets for which we cannot control compliance. If you have any
						feedback on our accessibility or cannot access certain content or features please call &nbsp;
						<Link className={styles.link} href="tel:203-655-5177">(203) 655-5177</Link>&nbsp; or email &nbsp;
						<Link className={styles.link} href="mailto:support@eppytech.com">support@eppytech.com</Link>&nbsp; and we will do our best
						to remediate any issues quickly and effectively, and provide any assistance or information directly.
					</div>
					<div className={styles.popUpRowCentered}>
						<RoundedButton onClick={toggleShowing}>Close</RoundedButton>
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
						<span className={styles.link} onClick={toggleShowing}>COMPLIANCE</span>
						<Link href="/signIn" className={styles.link}>INTERNAL TOOLS</Link>
					</div>
				</div>
			</footer>
		</Fragment>
	);
}

export default Footer;
