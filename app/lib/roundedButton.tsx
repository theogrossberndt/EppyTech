import { forwardRef } from 'react';
import styles from "./roundedButton.module.css";

interface RoundedButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	tooltip?: string;
}
/*
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	style?: React.CSSProperties;
	className?: string;
*/

const RoundedButton = forwardRef(({tooltip, ...buttonProps}: RoundedButtonProps, ref) => {
	return (
		<button ref={ref} className={[styles.roundedButton, buttonProps.className ?? ""].join(" ")} {...buttonProps}>
				{buttonProps.children}
				{tooltip && (
					tooltip
				)}
		</button>
	);
});

export default RoundedButton;
