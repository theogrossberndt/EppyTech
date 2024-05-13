import styles from "./roundedButton.module.css";

type RoundedButtonProps = {
	tooltip?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	style?: React.CSSProperties;
}

const RoundedButton = ({tooltip, children, onClick, style}: IconButtonProps) => {
	return (
		<button className={styles.roundedButton} onClick={onClick} style={style}>
				{children}
				{tooltip && (
					tooltip
				)}
		</button>
	);
}

export default RoundedButton;
