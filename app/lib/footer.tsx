'use client';

import Link from 'next/link';
import styles from "./footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

const Footer = (): React.ReactElement => {
	return (
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
					<Link href="/contactUs" className={styles.link}>CONTACT US</Link>
					<Link href="/ada" className={styles.link}>COMPLIANCE</Link>
					<Link href="/signIn" className={styles.link}>INTERNAL TOOLS</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
