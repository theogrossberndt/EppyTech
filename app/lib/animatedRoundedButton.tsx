import { useState } from 'react';
import RoundedButton from '@/app/lib/roundedButton.tsx';
import AnimatedIcon from '@/app/lib/animatedIcon.tsx';

type AnimatedRoundedButtonProps = {
	tooltip?: string;
	children?: React.ReactNode | Array<React.ReactNode>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	style?: React.CSSProperties;
	parentStyle?: React.CSSProperties;
}

const AnimatedRoundedButton = ({tooltip, children, onClick, style, parentStyle}: AnimatedRoundedButtonProps) => {
	const [ currentChild, setCurrentChild ] = useState<number>(0);

	const clickHandler = () => {
		setCurrentChild(oldCurrentChild => (oldCurrentChild+1)%children.length);
		onClick();
	}

	return (
		<RoundedButton onClick={clickHandler} tooltip={tooltip} style={parentStyle}>
			<AnimatedIcon selected={currentChild} style={style}>
				{children}
			</AnimatedIcon>
		</RoundedButton>
	);
}

export default AnimatedRoundedButton;
