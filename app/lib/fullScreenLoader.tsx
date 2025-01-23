import styles from "./fullScreenLoader.module.css";
import ExportedImage from "next-image-export-optimizer";
import logoImageStatic from "/public/images/logoCropped.jpg";

const FullScreenLoader = () => {
	return (
		<div>
			<div className={styles.holder}>
				<div className={styles.loader}>
				</div>
			</div>
			<div className={styles.holder}>
				<ExportedImage
					src={logoImageStatic}
					alt="Eppy Tech Logo"
					style={{objectFit: 'contain', clipPath: 'circle()', height: '3rem', width: '3rem'}}
				/>
			</div>
		</div>
	);
}

export default FullScreenLoader;
