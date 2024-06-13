import styles from "./roundedButton.module.css";

interface RoundedButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	tooltip?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	style?: React.CSSProperties;
	className?: string;
}

const RoundedButton = ({tooltip, children, onClick, style, className, ...buttonProps}: IconButtonProps) => {
	return (
		<button className={[styles.roundedButton, className ?? ""].join(" ")} onClick={onClick} style={style} {...buttonProps}>
				{children}
				{tooltip && (
					tooltip
				)}
		</button>
	);
}

export default RoundedButton;
