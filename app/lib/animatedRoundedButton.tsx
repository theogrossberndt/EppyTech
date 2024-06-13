import { useState } from 'react';
import RoundedButton from '@/app/lib/roundedButton.tsx';
import AnimatedIcon from '@/app/lib/animatedIcon.tsx';

interface AnimatedRoundedButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	tooltip?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	style?: React.CSSProperties;
	parentStyle?: React.CSSProperties;
}

const AnimatedRoundedButton = ({tooltip, children, onClick, style, parentStyle, ...buttonProps}: AnimatedRoundedButtonProps) => {
	const [ currentChild, setCurrentChild ] = useState<number>(0);

	const clickHandler = () => {
		setCurrentChild(oldCurrentChild => (oldCurrentChild+1)%children.length);
		onClick();
	}

	return (
		<RoundedButton onClick={clickHandler} tooltip={tooltip} style={parentStyle} {...buttonProps}>
			<AnimatedIcon selected={currentChild} style={style}>
				{children}
			</AnimatedIcon>
		</RoundedButton>
	);
}

export default AnimatedRoundedButton;
