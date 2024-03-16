import styles from "./iconButton.module.css";

type IconButtonProps = {
	tooltip: string;
	children: React.ReactNode;
	onClick: Function;
}

const IconButton = ({tooltip, children, onClick}: IconButtonProps) => {
	return (
		<button className={styles.navIconButton} onClick={onClick}>
				{children}
				{tooltip && (
					<span style={{position: 'absolute', top: '100%', left: '50%', marginTop: '0.5rem'}}>
						<span className={styles.tooltiptext}>{tooltip}</span>
					</span>
				)}
		</button>
	);
}

export default IconButton;

//					<span style={{position: 'fixed', marginTop: '0.5rem'}}>

